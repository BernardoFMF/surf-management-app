'use strict'

import authData from '../data/authData.js'
import error from '../utils/error.js'

const authServices = (db) => { 
	const data = authData(db)

	const requestPasswordResetServices = async (url, email) => {
		if (!url) throw error(400, 'Parameter not found: url', 'MESSAGE_CODE_14')
		if (!email) throw error(400, 'Parameter not found: email', 'MESSAGE_CODE_14')

		return await data.requestPasswordReset(url, email)
	}
	
	const resetPasswordServices = async (userId, token, password) => {
		if (!userId) throw error(400, 'Parameter not found: userId', 'MESSAGE_CODE_14')
		if (!token) throw error(400, 'Parameter not found: token', 'MESSAGE_CODE_14')
		if (!password) throw error(400, 'Parameter not found: password', 'MESSAGE_CODE_14')

		return await data.resetPassword(userId, token, password)
	}
	return {
		requestPasswordResetServices,
		resetPasswordServices
	}
}

export default authServices