'use strict'

import express from 'express'
import authController from '../controllers/authControllers.js'
import passport from 'passport'

const authRoutes = (data) => {
	const app = express.Router()

	const controller = authController(data)

	app.post('/login', passport.authenticate('local'), controller.postLogin)

	app.post('/logout', controller.postLogout)

	app.post('/resetPassword', controller.resetPasswordController)

	return app
}

export default authRoutes