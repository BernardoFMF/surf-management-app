'use strict'

import asyncHandler from 'express-async-handler'
import AuthServices from '../services/authServices.js'


const authController = () => {

	const postLogin = asyncHandler(async (req, res) => {
		res.sendStatus(200)
	})

	const postLogout = asyncHandler(async (req, res) => {
		req.logout()
		res.sendStatus(200)
	})

	const resetPasswordRequestController = asyncHandler(async (req, res) => {
		const requestPasswordResetService = await AuthServices.requestPasswordReset(req.body.id_)
		res.json(requestPasswordResetService)
	})

	return {
		postLogin,
		postLogout,
		resetPasswordRequestController
	}
}

export default authController