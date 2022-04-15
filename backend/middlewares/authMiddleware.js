'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

const authAdmin = asyncHandler(async (req, res, next) => {
	if(req.user && !req.user.is_admin_) {
		throw error(403, 'Access forbidden')
	} else if (!req.user){
		throw error(401, 'Unauthorized')
	}
	next()
})

const authMember = asyncHandler(async (req, res, next) => {
	console.log(req.user)
	if(!req.user) {
		throw error(401, 'Unauthorized')
	}
	next()
})

const authCompany = asyncHandler(async (req, res, next) => {
	if(!req.user.member_type_ == 'corporate') {
		throw error(403, 'Access forbidden')
	}
	next()
})

const auths = {
	authMember,
	authAdmin,
	authCompany
}

export default auths