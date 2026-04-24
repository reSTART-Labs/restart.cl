import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

async function start() {
	const app = express()

	let vite
	if (!isProduction) {
		const { createServer: createViteServer } = await import('vite')
		vite = await createViteServer({
			server: { middlewareMode: true },
			appType: 'custom',
		})
		app.use(vite.middlewares)
	} else {
		app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))
	}

	app.get(/^\/\.well-known\//, (_req, res) => res.status(204).end())

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

	app.listen(PORT, () => {
		console.log(`SSR server corriendo en http://localhost:${PORT} en modo ${process.env.NODE_ENV}`)
	})
}

start()
