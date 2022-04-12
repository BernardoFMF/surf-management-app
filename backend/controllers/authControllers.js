'use strict'

import asyncHandler from 'express-async-handler'


const authController = () => {

	const postLogin = asyncHandler(async (req, res) => {
		res.sendStatus(200)
	})

	const postLogout = asyncHandler(async (req, res) => {
		req.logout()
		res.sendStatus(200)
	})

	return {
		postLogin,
		postLogout
	}
}

export default authController