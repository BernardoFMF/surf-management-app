'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

import memberServices from '../services/memberServices.js'

const memberController = (data) => {
	const services = memberServices(data)

	const getMemberById = asyncHandler(async (req, res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const member = await services.getMemberByIdServices(req.params.id)
		
		if (member) {
			if(req.user.id_ != req.params.id) {
				delete member.pin_
			}
			res.json(member)
		}
	})

	const getAllMembers = asyncHandler(async (req, res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const member = await services.getAllMembersServices()
		if (member) res.json(member)
	})


	return {
		getMemberById,
		getAllMembers
	}
}

export default memberController