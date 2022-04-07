'use strict'

import asyncHandler from 'express-async-handler'

import {getUsersServices, getUserByIdServices, postUserServices, updateUserServices, deleteUserServices, 
	getUsersQuotasServices, getUserQuotasByIdServices, postUsersQuotaServices, updateUserQuotaServices, updateUsersQuotaServices,
	getUsersSportsServices, getUsersSportServices, getUserSportsByIdServices, postUserSportServices, updateUserSportServices, deleteUserSportServices} from '../services/userServices.js'

const getUsers = asyncHandler(async (req, res) => {
	const users = await getUsersServices()
	res.json(users)
})

const getUserById = asyncHandler(async (req, res) => {
	const user = await getUserByIdServices(req.params.id)
	if (user) res.json(user)
})

const postUser = asyncHandler(async (req, res) => {
	const user = await postUserServices(req.body.cc, req.body.nif, req.body.type, req.body.birth_date, req.body.nationality, req.body.full_name, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location, req.body.password)
	if (user) {
		res.status(201)
		res.json(user)
	}
})

const updateUser = asyncHandler(async (req, res) => {
	const users = await updateUserServices(req.params.id, req.body.cc, req.body.nif, req.body.type, req.body.birth_date, req.body.nationality, req.body.full_name, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location, req.body.password)
	if (users) res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
	const user = await deleteUserServices(req.params.id)
	if (user) res.json({ message: 'User deleted sucessfully' })
})

const getUsersQuotas = asyncHandler(async (req, res) => {
	const usersWithQuotas = await getUsersQuotasServices()
	if (usersWithQuotas) res.json(usersWithQuotas)
})

const getUserQuotasById = asyncHandler(async (req, res) => {
	const quotas = await getUserQuotasByIdServices(req.params.id)
	if (quotas) res.json(quotas)
})

const postUsersQuota = asyncHandler(async (req,res) => {
	const quota = await postUsersQuotaServices(req.body.date)
	if (quota) {
		res.status(201)
		res.json({ message: 'Quotas created sucessfully' })
	}
})

const updateUserQuota = asyncHandler(async (req,res) => {
	const quota = await updateUserQuotaServices(req.params.qid, req.body.payment_date)
	if (quota) res.json(quota)
})

const updateUsersQuota = asyncHandler(async (req,res) => {
	const quota = await updateUsersQuotaServices(req.body.old_date, req.body.new_date)
	if (quota) res.json(quota)
})

const getUsersSports = asyncHandler(async (req,res) => {
	const usersWithsports = await getUsersSportsServices()
	if (usersWithsports) res.json(usersWithsports)
})

const getUsersSport = asyncHandler(async (req,res) => {
	const usersWithsport = await getUsersSportServices(req.params.sid)
	if (usersWithsport) res.json(usersWithsport)
})

const getUserSportsById = asyncHandler(async (req,res) => {
	const userSports = await getUserSportsByIdServices(req.params.id)
	if (userSports) res.json(userSports)
})

const postUserSport = asyncHandler(async (req,res) => {
	const userSport = await postUserSportServices(req.params.id, req.body.sid, req.body.type, req.body.federation_number, req.body.federation_id, req.body.years_federated)
	if (userSport) {
		res.status(201)
		res.json(userSport)
	}
})

const updateUserSport = asyncHandler(async (req,res) => {
	const userSport = await updateUserSportServices(req.params.id, req.body.sid, req.body.type, req.body.federation_number, req.body.federation_id, req.body.years_federated)
	if (userSport) res.json(userSport)
})

const deleteUserSport = asyncHandler(async (req,res) => {
	const userSport = await deleteUserSportServices(req.params.id,req.params.sid)
	if(userSport) res.json({ message: 'Sport deleted sucessfully from user' })
})

export {getUsers, getUserById, postUser, updateUser, deleteUser,getUsersQuotas,getUserQuotasById, postUsersQuota, updateUserQuota, updateUsersQuota, getUsersSports, getUsersSport, getUserSportsById, postUserSport, updateUserSport, deleteUserSport}