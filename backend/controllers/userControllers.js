'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

import userServices from '../services/userServices.js'

const userController = (data) => {
	const services = userServices(data)

	const getUsers = asyncHandler(async (req, res) => {
		const users = await services.getUsersServices(req.query.username, req.query.name, req.query.email, req.query.offset, req.query.limit)
		res.json(users)
	})
	
	const getUserById = asyncHandler(async (req, res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const user = await services.getUserByIdServices(req.params.id)
		if (user) res.json(user)
	})
	
	const postUser = asyncHandler(async (req, res) => {
		const url = req.protocol + '://' + req.get('host')
		const user = await services.postUserServices(req.body.cc, req.body.nif, req.body.type, req.body.birth_date, req.body.nationality, req.body.full_name, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location, req.body.password, req.body.username, req.body.paid_enrollment, req.body.gender, url, req.body.iban)
		if (user) {
			res.status(201)
			res.json(user)
		}
	})
	
	const updateUser = asyncHandler(async (req, res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const user = await services.updateUserServices(req.params.id, req.body.cc, req.body.nif, req.body.type, req.body.birth_date, req.body.nationality, req.body.full_name, req.body.phone_number, req.body.postal_code, req.body.address, req.body.location, req.body.img, req.body.paid_enrollment, req.body.is_admin, req.body.is_deleted, req.body.gender, req.body.iban)
		if (user) res.json(user)
	})
	
	const deleteUser = asyncHandler(async (req, res) => {
		const user = await services.deleteUserServices(req.params.id)
		if (user) res.json({ message: 'User deleted sucessfully', message_code: 'MESSAGE_CODE_10' })
	})
	
	const getUsersSports = asyncHandler(async (req,res) => {
		const usersWithsports = await services.getUsersSportsServices()
		if (usersWithsports) res.json(usersWithsports)
	})
	
	const getUsersSport = asyncHandler(async (req,res) => {
		const usersWithsport = await services.getUsersSportServices(req.params.sid)
		if (usersWithsport) res.json(usersWithsport)
	})
	
	const getUserSportsById = asyncHandler(async (req,res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const userSports = await services.getUserSportsByIdServices(req.params.id, req.query.offset, req.query.limit)
		if (userSports) res.json(userSports)
	})
	
	const postUserSport = asyncHandler(async (req,res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const userSport = await services.postUserSportServices(req.params.id, req.body.sid, req.body.fed_id, req.body.fed_number, req.body.fed_name, req.body.type, req.body.years_federated)
		if (userSport) {
			res.status(201)
			res.json(userSport)
		}
	})
	
	const updateUserSport = asyncHandler(async (req,res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const userSport = await services.updateUserSportServices(req.params.id, req.params.sid, req.body.fed_id, req.body.fed_number, req.body.fed_name, req.body.type, req.body.years_federated, req.body.is_absent)
		if (userSport) res.json(userSport)
	})
	
	const deleteUserSport = asyncHandler(async (req,res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const userSport = await services.deleteUserSportServices(req.params.id,req.params.sid)
		if(userSport) {
			res.json({ message: 'Sport deleted sucessfully from user', message_code: 'MESSAGE_CODE_11' })
		}
	})

	return {
		getUsers,
		getUserById,
		postUser,
		updateUser,
		deleteUser,
		getUsersSports,
		getUsersSport,
		getUserSportsById,
		postUserSport,
		updateUserSport,
		deleteUserSport
	}
}

export default userController