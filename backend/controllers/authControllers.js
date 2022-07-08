'use strict'

import asyncHandler from 'express-async-handler'
import authServices from '../services/authServices.js'

const authController = (data) => {
	const services = authServices(data)

	const postLogin = asyncHandler(async (req, res) => {
		res.json({...req.user, expires: req.session.cookie.expires})
	})

	const postLogout = asyncHandler(async (req, res) => {
		req.logout()
		res.json({ message: 'User is logged out'})
	})

	const resetPasswordRequest = asyncHandler(async (req, res) => {
		const url = req.protocol + '://' + req.get('host')
		const requestPasswordResetService = await services.requestPasswordResetServices(url, req.body.email)
		console.log(requestPasswordResetService);
		res.status(201)
		res.json({ message: 'Password change request was successful', message_code: 'MESSAGE_CODE_45' })
	})

	const resetPassword = asyncHandler(async (req, res) => {
		const passwordResetService = await services.resetPasswordServices(req.body.id, req.body.token, req.body.password)
		res.status(201)
		res.json({ message: 'Password changed successfully', message_code: 'MESSAGE_CODE_46' })
	})

	const updateCredentials = asyncHandler(async (req, res) => {
		const updateCredentialsService = await services.updateCredentialsServices(req.body.id, req.body.token, req.body.email, req.body.username, req.body.password)
		res.status(201)
		res.json({ message: 'Credentials updated successfully', message_code: 'MESSAGE_CODE_47' })
	})

	return {
		postLogin,
		postLogout,
		resetPasswordRequest,
		resetPassword,
		updateCredentials
	}
}

export default authController