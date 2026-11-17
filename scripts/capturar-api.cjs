/**
 * Capturas de api.restart.cl para la página /labs/api-restart.
 *
 * Queda versionado para poder regenerar las imágenes cuando el sitio cambie, en vez
 * de ser un script de un solo uso. Formato 1440x2000, que es el que ya usan las
 * capturas de los otros proyectos de Labs.
 *
 * restart.cl no depende de Puppeteer, así que se toma prestado el del scraper de
 * api.restart.cl (que ya lo trae con su Chrome descargado). Si ese proyecto no está
 * en la ruta por defecto, se indica con PUPPETEER_FROM.
 *
 *   node scripts/capturar-api.cjs
 *   PUPPETEER_FROM=/otra/ruta/node_modules/puppeteer node scripts/capturar-api.cjs
 *   BASE=http://localhost:51745 node scripts/capturar-api.cjs
 */

const fs = require('fs')
const path = require('path')

const PUPPETEER_FROM = process.env.PUPPETEER_FROM
	|| '/Users/ricardogatica/Projects/reSTART_Labs/reSTART/api.restart.cl/scraper/node_modules/puppeteer'

const BASE = process.env.BASE || 'https://api.restart.cl'
const DESTINO = path.join(__dirname, '..', 'public', 'img', 'labs', 'api-restart')

const ANCHO = 1440
const ALTO = 2000

/* El recorte se ajusta al contenido, pero acotado: muy corto se ve como un banner y
   muy largo queda ilegible dentro del frame de la galería. */
const MINIMO = 1400
const MAXIMO = 2400

/* Las secciones que cuentan la historia del proyecto. El dashboard queda fuera a
   propósito: exige sesión y no se puede capturar sin credenciales. */
const SECCIONES = [
	{ archivo: 'home.png', ruta: '/' },
	{ archivo: 'docs.png', ruta: '/docs' },
	{ archivo: 'indicadores.png', ruta: '/indicadores' },
	{ archivo: 'calendario.png', ruta: '/calendario' },
	{ archivo: 'educacion.png', ruta: '/educacion' },
	{ archivo: 'mercado-publico.png', ruta: '/mercado-publico' },
]

function puppeteer() {
	try {
		return require(PUPPETEER_FROM)
	} catch (e) {
		console.error(`\nNo se pudo cargar Puppeteer desde:\n  ${PUPPETEER_FROM}\n`)
		console.error('Indica la ruta con PUPPETEER_FROM=/ruta/a/node_modules/puppeteer\n')
		throw e
	}
}

async function main() {
	fs.mkdirSync(DESTINO, { recursive: true })

	const navegador = await puppeteer().launch({ headless: true })
	const resultados = []

	try {
		for (const { archivo, ruta } of SECCIONES) {
			const pagina = await navegador.newPage()
			await pagina.setViewport({ width: ANCHO, height: ALTO, deviceScaleFactor: 1 })

			const url = BASE + ruta
			let estado = null

			try {
				const resp = await pagina.goto(url, { waitUntil: 'networkidle2', timeout: 45000 })
				estado = resp ? resp.status() : null

				/* Un paseo hasta el fondo y de vuelta arriba: dispara lo que carga por
				   scroll (imágenes lazy, animaciones de entrada) antes de capturar. */
				await pagina.evaluate(async () => {
					await new Promise((resolve) => {
						let y = 0
						const paso = () => {
							y += 600
							window.scrollTo(0, y)
							if (y < document.body.scrollHeight) setTimeout(paso, 60)
							else { window.scrollTo(0, 0); setTimeout(resolve, 500) }
						}
						paso()
					})
				})

				/* Se recorta al alto real del contenido en vez de forzar el del viewport:
				   las páginas cortas quedaban con una franja vacía de varios cientos de
				   píxeles, y en el frame de la galería se nota. */
				const alto = await pagina.evaluate(() => Math.ceil(document.body.scrollHeight))
				const recorte = Math.min(Math.max(alto, MINIMO), MAXIMO)

				const destino = path.join(DESTINO, archivo)
				await pagina.screenshot({
					path: destino,
					clip: { x: 0, y: 0, width: ANCHO, height: recorte },
				})

				const kb = Math.round(fs.statSync(destino).size / 1024)
				resultados.push({ archivo, ruta, estado, kb })
				console.log(`  ok  ${archivo.padEnd(22)} ${ruta.padEnd(18)} ${estado}  ${kb} KB`)
			} catch (e) {
				resultados.push({ archivo, ruta, estado, error: e.message })
				console.log(`  ERROR ${archivo.padEnd(20)} ${ruta.padEnd(18)} ${e.message}`)
			} finally {
				await pagina.close()
			}
		}
	} finally {
		await navegador.close()
	}

	const fallidas = resultados.filter((r) => r.error)
	console.log(`\n${resultados.length - fallidas.length}/${resultados.length} capturas en ${DESTINO}`)
	if (fallidas.length) process.exitCode = 1
}

main().catch((e) => {
	console.error(e)
	process.exitCode = 1
})
