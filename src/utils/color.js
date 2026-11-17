/*
 * Utilidades de contraste para la paleta de cada proyecto.
 *
 * Algunas marcas tienen un color principal que se pierde sobre su propio fondo
 * oscuro (el rojo de HS Paneles sobre azul marino, el azul de Minicatalogo sobre
 * casi negro). Como el texto de acento del hero, la galería y el CTA va sobre
 * `brandDark`, se aclara el color hacia blanco lo justo para que se lea, sin tocar
 * las marcas que ya contrastan bien (el lima de Merc@do queda tal cual).
 *
 * Funciones puras: corren igual en SSR y en el cliente, sin desajuste de hidratación.
 */

function hexARgb(hex) {
	let h = String(hex).replace('#', '').trim()
	if (h.length === 3) h = h.split('').map((c) => c + c).join('')
	const n = parseInt(h, 16)
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function rgbAHex([r, g, b]) {
	return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

/** Luminancia relativa WCAG 2.x de un color hex. */
export function luminance(hex) {
	const [r, g, b] = hexARgb(hex).map((v) => {
		const c = v / 255
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
	})
	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Razón de contraste WCAG entre dos colores hex (1–21). */
export function contrastRatio(a, b) {
	const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
	return (l1 + 0.05) / (l2 + 0.05)
}

/**
 * Color de acento para TEXTO sobre `dark`: el propio `color` si ya alcanza `min`,
 * o el primer paso de mezcla con blanco (de 5 en 5 %) que lo alcanza.
 * @param {string} color  Hex de la marca.
 * @param {string} dark   Hex del fondo oscuro.
 * @param {number} [min]  Contraste mínimo (4.5 = AA texto normal).
 */
export function accentOnDark(color, dark, min = 4.5) {
	if (contrastRatio(color, dark) >= min) return rgbAHex(hexARgb(color))
	const base = hexARgb(color)
	for (let t = 0.05; t <= 1.0001; t += 0.05) {
		const mezcla = base.map((v) => v + (255 - v) * t)
		const hex = rgbAHex(mezcla)
		if (contrastRatio(hex, dark) >= min) return hex
	}
	return '#FFFFFF'
}

/**
 * Texto para un relleno de color `fill`: `dark` (el brandDark) o blanco, el que
 * contraste más. El rojo de HS Paneles pide blanco; el lima de Merc@do, oscuro.
 */
export function textOn(fill, dark) {
	return contrastRatio(dark, fill) >= contrastRatio('#FFFFFF', fill) ? dark : '#FFFFFF'
}
