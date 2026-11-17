import { Router } from 'express'
import { rateLimit } from './rateLimit.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX = {
	name: 100,
	company: 120,
	email: 160,
	phone: 30,
	service: 60,
	message: 2000,
	source: 60,
}
const FAKE_OK = { ok: true }

function sanitize(body = {}) {
	const pick = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
	return {
		name: pick(body.name, MAX.name),
		company: pick(body.company, MAX.company),
		email: pick(body.email, MAX.email),
		phone: pick(body.phone, MAX.phone),
		service: pick(body.service, MAX.service),
		message: pick(body.message, MAX.message),
		source: pick(body.source, MAX.source),
		website: typeof body.website === 'string' ? body.website : '',
	}
}

function validate(data) {
	if (!data.name || data.name.length < 2) return 'invalid_name'
	if (!EMAIL_RE.test(data.email)) return 'invalid_email'
	if (!data.message || data.message.length < 5) return 'invalid_message'
	return null
}

function originAllowed(req) {
	const allowed = process.env.ALLOWED_ORIGIN
	if (!allowed) return true
	const origin = req.headers.origin || req.headers.referer || ''
	// No browser context (curl, scripts, server-to-server) → let it through;
	// rate limit + validation + honeypot still apply.
	if (!origin) return true
	// ALLOWED_ORIGIN acepta una lista separada por comas (p. ej. apex + www).
	return allowed
		.split(',')
		.map((o) => o.trim())
		.filter(Boolean)
		.some((o) => origin.startsWith(o))
}

async function forwardToN8n(payload) {
	const url = process.env.N8N_CONTACT_WEBHOOK
	if (!url) {
		const err = new Error('webhook_not_configured')
		err.upstreamStatus = 0
		throw err
	}

	const headers = { 'Content-Type': 'application/json' }
	if (process.env.N8N_SHARED_SECRET) {
		headers['X-Shared-Secret'] = process.env.N8N_SHARED_SECRET
	}

	const res = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(payload),
		signal: AbortSignal.timeout(8000),
	})
	if (!res.ok) {
		const body = await res.text().catch(() => '')
		const err = new Error(`n8n_${res.status}`)
		err.upstreamStatus = res.status
		err.upstreamBody = body.slice(0, 500)
		throw err
	}
}

export function contactRouter() {
	const router = Router()
	const limit = rateLimit({
		windowMs: 60_000,
		max: Number(process.env.CONTACT_RATE_LIMIT_PER_MIN || 5),
	})

	router.post('/', limit, async (req, res) => {
		if (!originAllowed(req)) {
			return res.status(403).json({ ok: false, error: 'forbidden' })
		}

		const data = sanitize(req.body)

		// Honeypot: bots fill the hidden "website" field; pretend success and drop.
		if (data.website) return res.json(FAKE_OK)

		const error = validate(data)
		if (error) return res.status(400).json({ ok: false, error })

		const payload = {
			name: data.name,
			company: data.company,
			email: data.email,
			phone: data.phone,
			service: data.service,
			message: data.message,
			source: data.source || 'unknown',
			meta: {
				ip:
					(req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
					req.socket?.remoteAddress ||
					null,
				ua: req.headers['user-agent'] || null,
				origin: req.headers.origin || req.headers.referer || null,
				ts: new Date().toISOString(),
			},
		}

		try {
			await forwardToN8n(payload)
			return res.json(FAKE_OK)
		} catch (err) {
			const detail = `${err.message} ${err.upstreamBody || ''}`.trim()
			console.error('[contact] forward failed:', detail)
			const body = { ok: false, error: 'upstream_failed' }
			if (process.env.NODE_ENV !== 'production') {
				body.upstream_status = err.upstreamStatus ?? null
				body.upstream_body = err.upstreamBody ?? null
			}
			return res.status(502).json(body)
		}
	})

	return router
}
