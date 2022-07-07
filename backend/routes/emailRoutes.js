'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import emailController from '../controllers/emailControllers.js'

const emailRoutes = (data) => {
	const app = express.Router()

	const controller = emailController(data)

	app.post('/contact', controller.sendContactEmail)

	app.post('/notify',  authentication.authAdmin, controller.sendNotifyEmail)


	return app
}

export default emailRoutes