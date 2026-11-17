import { test } from 'node:test'
import assert from 'node:assert/strict'
import { contrastRatio, accentOnDark, textOn } from '../src/utils/color.js'
import { projects } from '../src/data/projects.js'

test('contrastRatio: blanco sobre negro = 21', () => {
	assert.equal(Math.round(contrastRatio('#FFFFFF', '#000000')), 21)
	assert.equal(contrastRatio('#123456', '#123456'), 1)
})

test('accentOnDark deja intacta una marca que ya contrasta', () => {
	assert.equal(accentOnDark('#A3FF6A', '#0F0F0F'), '#A3FF6A')
})

test('accentOnDark aclara las marcas de bajo contraste', () => {
	const hs = accentOnDark('#D50021', '#152036')
	assert.notEqual(hs, '#D50021')
	assert.ok(contrastRatio(hs, '#152036') >= 4.5)
	const mini = accentOnDark('#3333CC', '#001524')
	assert.ok(contrastRatio(mini, '#001524') >= 4.5)
})

test('todo proyecto tiene acento legible sobre su brandDark', () => {
	for (const p of projects) {
		assert.ok(contrastRatio(accentOnDark(p.brandColor, p.brandDark), p.brandDark) >= 4.5, p.slug)
	}
})

test('textOn elige el texto que más contrasta con el relleno', () => {
	assert.equal(textOn('#D50021', '#152036'), '#FFFFFF')
	assert.equal(textOn('#A3FF6A', '#0F0F0F'), '#0F0F0F')
})
