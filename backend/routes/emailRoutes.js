'use strict'

import express from 'express'
import emailController from '../controllers/emailControllers.js'

const emailRoutes = () => {
	const app = express.Router()

	const controller = emailController()

	app.post('/contact', controller.sendContactEmail)

	return app
}

export default emailRoutes