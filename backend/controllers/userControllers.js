'use strict'
//TODO Error Handling
import asyncHandler from 'express-async-handler'

import {getUsersServices, getUserByIdServices, postUserServices, updateUserServices, deleteUserServices, 
	getUsersQuotasServices, getUserQuotasByIdServices, postUsersQuotaServices, updateUsersQuotaServices, updateUserQuotaServices,
	getUsersSportsServices, getUsersSportServices, getUserSportsByIdServices, postUserSportServices, updateUserSportServices, deleteUserSportServices,
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
	if(users) res.json(users)
	else {
		res.status()
	}
})

const deleteUser = asyncHandler(async (req, res) => {
	const users = await deleteUserServices(req.params.id)
	if(users) res.json(users)
	else {
		res.status()
	}
})

const getUsersQuotas = asyncHandler(async (req, res) => {
	const usersWithQuotas = await getUsersQuotasServices()
	if(usersWithQuotas) res.json(usersWithQuotas)
	else {
		res.status()
	}
})

const getUserQuotasById = asyncHandler(async (req, res) => {
	const quotas = await getUserQuotasByIdServices(req.params.id)
	if(quotas) res.json(quotas)
	else {
		res.status()
	}
})

const postUsersQuota = asyncHandler(async (req,res) => {
	const quota = await postUsersQuotaServices() // ????
	if(quota) res.json(quota)
	else {
		res.status()
	}
})

const updateUsersQuota = asyncHandler(async (req, res) => {	//TODO year ?
	const quota = await updateUsersQuotaServices(req.body.amount,req.body.date,req.body.paymentDate)
	if(quota) res.json(quota)
	else {
		res.status()
	}
})

const updateUserQuota = asyncHandler(async (req,res) => {	//TODO year ??
	const quota = await updateUserQuotaServices(req.params.id,req.body.amount,req.body.date,req.body.paymentDate)
	if(quota) res.json(quota)
	else {
		res.status()
	}
})

const getUsersSports = asyncHandler(async (req,res) => {
	const usersWithsports = getUsersSportsServices()
	if(usersWithsports) res.json(usersWithsports)
	else {
		res.status()
	}
})

const getUsersSport = asyncHandler(async (req,res) => {
	const usersWithsport = await getUsersSportServices(req.params.sid)
	if(usersWithsport) res.json(usersWithsport)
	else {
		res.status()
	}
})

const getUserSportsById = asyncHandler(async (req,res) => {
	const user = await getUserSportsByIdServices(req.params.id)
	if(user) res.json(user)
	else {
		res.status()
	}
})

const postUserSport = asyncHandler(async (req,res) => {
	const user = await postUserSportServices(req.params.id,req.body.sid,req.body.type,req.body.federationNumber,req.body.federationId,req.body.yearsFederated)
	if(user) res.json(user)
	else {
		res.status()
	}
})

const updateUserSport = asyncHandler(async (req,res) => {
	const user = await updateUserSportServices(req.params.id,req.body.sid,req.body.type,req.body.federationNumber,req.body.federationId,req.body.yearsFederated)
	if(user) res.json(user)
	else {
		res.status()
	}
})

const deleteUserSport = asyncHandler(async (req,res) => {
	const user = await deleteUserSportServices(req.params.id,req.params.sid)
	if(user) res.json(user)
	else {
		res.status()
	}
})

const postUserEvent = asyncHandler(async (req,res) => {
	const event = await postUserEventServices(req.params.id,req.body.eid,req.body.state)
	if(event) res.json(event)
	else {
		res.status()
	}
})

const updateUserEventById = asyncHandler(async (req,res) => {
	const event = await updateUserEventByIdServices(req.params.id,req.params.eid,req.body.state)
	if(event) res.json(event)
	else {
		res.status()
	}
})


export {getUsers, getUserById, postUser, updateUser, deleteUser,getUsersQuotas,getUserQuotasById,getUserQuotasById, postUsersQuota, updateUsersQuota, updateUserQuota,
	getUsersSports, getUsersSport, getUserSportsById, postUserSport, updateUserSport, deleteUserSport,
	postUserEvent, updateUserEventById}
