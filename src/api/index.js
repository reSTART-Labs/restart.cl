import express from 'express'
import { contactRouter } from './contact.js'

export function registerApi(app) {
	app.use('/api', express.json({ limit: '10kb' }))
	app.use('/api/contact', contactRouter())
}
