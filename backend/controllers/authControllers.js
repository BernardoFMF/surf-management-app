'use strict'

import asyncHandler from 'express-async-handler'
import AuthServices from '../services/authServices.js'


const authController = (data) => {

	const postLogin = asyncHandler(async (req, res) => {
		console.log('cheguei')
		res.json(req.user)
	})

	const postLogout = asyncHandler(async (req, res) => {
		req.logout()
		res.json({ message: 'User is logged out' })
	})

	const resetPasswordRequest = asyncHandler(async (req, res) => {
		const requestPasswordResetService = await AuthServices(data).requestPasswordReset(req.body.id_)
		res.sendStatus(200)
		res.json(requestPasswordResetService)
	})

	return {
		postLogin,
		postLogout,
		resetPasswordRequest
	}
}

export default authController