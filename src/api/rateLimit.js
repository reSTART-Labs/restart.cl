/* In-memory sliding-window rate limiter, keyed by IP. */

const buckets = new Map()

export function rateLimit({ windowMs = 60_000, max = 5 } = {}) {
	return function rateLimitMiddleware(req, res, next) {
		const ip =
			(req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
			req.socket?.remoteAddress ||
			'unknown'
		const now = Date.now()
		const stamps = (buckets.get(ip) || []).filter((t) => now - t < windowMs)
		if (stamps.length >= max) {
			res.setHeader('Retry-After', Math.ceil(windowMs / 1000))
			return res.status(429).json({ ok: false, error: 'rate_limited' })
		}
		stamps.push(now)
		buckets.set(ip, stamps)
		next()
	}
}
