'use strict'

import express from 'express'
import authController from '../controllers/authControllers.js'
import passport from 'passport'

const authRoutes = (data) => {
	const app = express.Router()

	const controller = authController(data)

	app.post('/login', passport.authenticate('local'), controller.postLogin)

	app.post('/logout', controller.postLogout)

	app.post('/requestResetPassword', controller.resetPasswordRequest)

	app.post('/resetPassword', controller.resetPassword)

	app.post('/updateCredentials', controller.updateCredentials)

	return app
}

export default authRoutes