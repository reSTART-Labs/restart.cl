import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { registerApi } from './src/api/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3100

async function start() {
	const app = express()
	app.set('trust proxy', 1)
	// El HMR de Vite viaja por este mismo servidor HTTP (su propio puerto), así no
	// abre un WebSocket en un puerto aparte que choque con otros proyectos locales.
	const server = http.createServer(app)

	let vite
	if (!isProduction) {
		const { createServer: createViteServer } = await import('vite')
		vite = await createViteServer({
			server: { middlewareMode: true, hmr: { server } },
			appType: 'custom',
		})
		app.use(vite.middlewares)
	} else {
		app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))
	}

	app.get(/^\/\.well-known\//, (_req, res) => res.status(204).end())

	/*
	 * Rutas retiradas que ya estuvieron publicadas. Van con 301 y no con 404 para no
	 * perder los enlaces entrantes ni el posicionamiento de la URL vieja.
	 * Ojo: esto vive en el servidor Express, así que NO aplica bajo `yarn dev`
	 * (cliente puro) — solo en `yarn dev:server` y en producción.
	 */
	const REDIRECCIONES = {
		'/labs/indicadores-del-dia': '/labs/api-restart',
	}

	app.get(Object.keys(REDIRECCIONES), (req, res) => {
		res.redirect(301, REDIRECCIONES[req.path])
	})

	registerApi(app)

	app.use('*all', async (req, res) => {
		const url = req.originalUrl

		try {
			let template, render

			if (!isProduction) {
				template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
				template = await vite.transformIndexHtml(url, template)
				render = (await vite.ssrLoadModule('/src/main.server.js')).render
			} else {
				template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
				render = (await import('./dist/server/main.server.js')).render
			}

			const appHtml = await render(url)
			const html = template.replace('<!--app-html-->', appHtml)

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
		} catch (e) {
			if (!isProduction) vite.ssrFixStacktrace(e)
			console.error(e)
			res.status(500).end(e.message)
		}
	})

	server.listen(PORT, () => {
		console.log(`SSR server corriendo en http://localhost:${PORT} en modo ${process.env.NODE_ENV}`)
	})
}

start()
