'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

const authAdmin = asyncHandler(async (req, res, next) => {
	if(req.user && !req.user.is_admin_) {
		throw error(403, 'Access forbidden', 'MESSAGE_CODE_33')
	} else if (!req.user){
		throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
	}
	next()
})

const authMember = asyncHandler(async (req, res, next) => {
	if(!req.user) {
		throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
	}
	next()
})

const authCompany = asyncHandler(async (req, res, next) => {
	if(!req.user.member_type_ == 'corporate') {
		throw error(403, 'Access forbidden', 'MESSAGE_CODE_33')
	}
	next()
})

const auths = {
	authMember,
	authAdmin,
	authCompany
}

export default auths