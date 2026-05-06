/* GTM dataLayer click tracking via event delegation. */

const INTERACTIVE_SELECTOR = [
	'a[href]',
	'button',
	'[role="button"]',
	'input[type="submit"]',
	'input[type="button"]',
	'[data-track]',
].join(',')

export function pushEvent(name, payload = {}) {
	if (typeof window === 'undefined') return
	window.dataLayer = window.dataLayer || []
	window.dataLayer.push({ event: name, ...payload })
}

function findInteractive(start) {
	let el = start
	while (el && el.nodeType === 1 && el !== document.body) {
		if (el.matches?.(INTERACTIVE_SELECTOR)) return el
		el = el.parentElement
	}
	return null
}

function findSection(start) {
	let el = start
	while (el && el.nodeType === 1 && el !== document.body) {
		if (el.dataset?.section) return el.dataset.section
		if (el.tagName === 'SECTION' && el.id) return el.id
		if (el.tagName === 'FOOTER') return 'footer'
		if (el.tagName === 'HEADER') return 'header'
		el = el.parentElement
	}
	return 'unknown'
}

function getLabel(el) {
	const explicit =
		el.dataset?.trackLabel ||
		el.getAttribute('aria-label') ||
		el.getAttribute('title')
	if (explicit) return explicit.trim().slice(0, 120)
	const text = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()
	return text.slice(0, 120) || null
}

function getKind(el) {
	if (el.dataset?.trackKind) return el.dataset.trackKind
	if (el.tagName === 'A') {
		const href = el.getAttribute('href') || ''
		if (/^https?:\/\//i.test(href)) return 'external_link'
		if (href.startsWith('mailto:')) return 'mailto'
		if (href.startsWith('tel:')) return 'tel'
		if (href.startsWith('#') || href.includes('#')) return 'anchor'
		return 'internal_link'
	}
	if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') return 'button'
	return 'click'
}

export function installClickTracking() {
	if (typeof window === 'undefined' || typeof document === 'undefined') return
	if (window.__restartClickTrackingInstalled) return
	window.__restartClickTrackingInstalled = true

	document.addEventListener(
		'click',
		(ev) => {
			const target = findInteractive(ev.target)
			if (!target) return

			const section = findSection(target)
			const label = getLabel(target)
			const kind = getKind(target)
			const href = target.tagName === 'A' ? target.getAttribute('href') : null

			pushEvent('section_click', {
				section,
				kind,
				label,
				href,
				target_id: target.id || null,
				page: window.location.pathname + window.location.hash,
			})
		},
		true,
	)
}
