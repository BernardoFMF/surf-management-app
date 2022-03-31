'use strict'

import asyncHandler from 'express-async-handler'

import {getUsersServices, getUserByIdServices, postUserServices, updateUserServices, deleteUserServices, 
	getUsersQuotasServices, getUserQuotasByIdServices, postUsersQuotaServices, updateUsersQuotaServices, updateUserQuotaServices,
	getUsersSportsServices, getUsersSportServices, getUserSportsByIdServices, postUserSportServices, deleteUserSportServices,
	postUserEventServices, updateUserEventByIdServices} from '../services/userServices.js'

const getUsers = asyncHandler(async (req, res) => {
	const users = await getUsersServices()
	res.json(users)
})

const getUserById = asyncHandler(async (req, res) => {
	const user = await getUserByIdServices(req.params.id)
	if (user) res.json(user)
	else {
		res.status(404)
		throw new Error('User not found.')
	}
})

const postUser = asyncHandler(async (req, res) => {
	const user = await postUserServices(req.body.cc, req.body.nif, req.body.type, req.body.birth_date, 
		req.body.enrollment_date, req.body.nationality, req.body.first_name, req.body.last_name)
	if (user) res.json(user)
	else {
		res.status()
	}
})

const updateUser = asyncHandler(async (req, res) => {
	const users = await updateUserServices(req.body.cc, req.body.nif, req.body.type, req.body.birth_date, 
		req.body.enrollment_date, req.body.nationality, req.body.first_name, req.body.last_name)
	res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
	const users = await deleteUserServices(req.params.id)
	res.json(users)
})


export {getUsers, getUserById, postUser, updateUser, deleteUser}
