/**
 * Probe the n8n contact webhook with a payload identical to what the form sends.
 *
 *   node scripts/test-contact-webhook.mjs            # hits N8N_CONTACT_WEBHOOK from .env
 *   TARGET=local node scripts/test-contact-webhook.mjs   # hits the local /api/contact proxy
 */
import 'dotenv/config'

const samplePayload = {
	name: 'Ricardo Gatica',
	company: 'Re/START Labs',
	email: 'ricardogatica@mine-class.cl',
	service: 'desarrollo-web',
	message:
		'Hola, esto es una prueba del webhook desde el formulario de contacto de restart.cl. Necesitamos cotizar un proyecto.',
	website: '',
}

const isLocal = process.env.TARGET === 'local'
const target = isLocal
	? 'http://localhost:3000/api/contact'
	: process.env.N8N_CONTACT_WEBHOOK

if (!target) {
	console.error('Falta N8N_CONTACT_WEBHOOK en .env (o usa TARGET=local).')
	process.exit(1)
}

const headers = { 'Content-Type': 'application/json' }
if (isLocal) {
	// Simulate a same-origin browser request so the proxy's origin check passes.
	headers.Origin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
}

console.log(`→ POST ${target}`)
console.log('payload:', samplePayload)

try {
	const res = await fetch(target, {
		method: 'POST',
		headers,
		body: JSON.stringify(samplePayload),
		signal: AbortSignal.timeout(10_000),
	})
	const text = await res.text()
	console.log(`\nstatus: ${res.status}`)
	console.log('body:', text)
	process.exit(res.ok ? 0 : 1)
} catch (err) {
	console.error('error:', err.message)
	process.exit(1)
}
