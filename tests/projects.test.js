import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
	projects,
	PROJECT_TYPES,
	getProject,
	projectPath,
	canonicalPath,
	mvpProjects,
	heroDevices,
	scrollDuration,
} from '../src/data/projects.js'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const onDisk = (src) => existsSync(join(publicDir, src))

test('slugs únicos', () => {
	assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length)
})

test('inventario', () => {
	assert.deepEqual(
		projects.map((p) => p.slug).sort(),
		['bogy', 'api-restart', 'learningpath', 'petsit', 'minicatalogo', 'mercado', 'grupo-zenit', 'hs-paneles'].sort(),
	)
})

test('type válido', () => {
	for (const p of projects) {
		assert.ok(PROJECT_TYPES.includes(p.type), `${p.slug}: type ${p.type}`)
		const expected = ['grupo-zenit', 'hs-paneles'].includes(p.slug) ? 'customer' : 'labs'
		assert.equal(p.type, expected, p.slug)
	}
})

test('todo proyecto tiene imágenes', () => {
	for (const p of projects) {
		assert.ok(p.showcase?.web, `${p.slug}: sin showcase.web`)
		assert.ok(onDisk(p.showcase.web), `${p.slug}: no existe ${p.showcase.web}`)
		assert.ok(p.screenshots.length >= 1, `${p.slug}: sin screenshots`)
		for (const s of p.screenshots) {
			assert.ok(onDisk(s.src), `${p.slug}: no existe ${s.src}`)
		}
	}
})

test('contenido de detalle', () => {
	for (const p of projects) {
		for (const key of ['problem', 'solution', 'tagline', 'brandColor', 'brandDark']) {
			assert.equal(typeof p[key], 'string', `${p.slug}.${key}`)
			assert.ok(p[key].trim().length > 0, `${p.slug}.${key} vacío`)
		}
	}
})

test('sin testimonios inventados', () => {
	for (const p of projects) {
		assert.ok(!(p.testimonials?.length > 0), `${p.slug} tiene testimonios`)
	}
})

test('créditos', () => {
	assert.deepEqual(getProject('grupo-zenit').credits, [
		{ role: 'Diseño', name: 'Tres Marías Estudio' },
		{ role: 'Desarrollo WordPress', name: 'Re/START' },
	])
	for (const p of projects) {
		for (const c of p.credits ?? []) {
			assert.equal(typeof c.role, 'string', p.slug)
			assert.equal(typeof c.name, 'string', p.slug)
		}
	}
})

test('mvpProjects', () => {
	assert.deepEqual(
		mvpProjects.map((p) => p.slug).sort(),
		['bogy', 'learningpath', 'petsit', 'minicatalogo', 'mercado'].sort(),
	)
})

test('projectPath', () => {
	assert.equal(projectPath(getProject('bogy')), '/labs/bogy')
	assert.equal(projectPath(getProject('hs-paneles')), '/portafolio/hs-paneles')
})

test('heroDevices', () => {
	assert.deepEqual(heroDevices({ showcase: { web: 'a', mobile: 'b' } }), ['web', 'mobile'])
	assert.deepEqual(heroDevices({ showcase: { mobile: 'b' } }), ['mobile'])
	assert.deepEqual(heroDevices({}), [])
})

test('scrollDuration', () => {
	assert.equal(scrollDuration(900, 900), 0)
	assert.equal(scrollDuration(1500, 900), 6)
	assert.equal(scrollDuration(6000, 900), 42.5)
})

test('mercado', () => {
	const m = getProject('mercado')
	assert.equal(m.brandColor, '#A3FF6A')
	assert.equal(m.brandDark, '#0F0F0F')
	assert.equal(m.url, 'https://mercado.restart.cl')
})

test('canonicalPath redirige al path canónico según type', () => {
	assert.equal(canonicalPath('/portafolio/bogy'), '/labs/bogy')
	assert.equal(canonicalPath('/labs/grupo-zenit'), '/portafolio/grupo-zenit')
	assert.equal(canonicalPath('/portafolio/bogy/'), '/labs/bogy')
})

test('canonicalPath devuelve null si no hay nada que corregir', () => {
	assert.equal(canonicalPath('/labs/bogy'), null)
	assert.equal(canonicalPath('/portafolio/hs-paneles'), null)
	assert.equal(canonicalPath('/labs/no-existe'), null)
	assert.equal(canonicalPath('/nosotros'), null)
})
