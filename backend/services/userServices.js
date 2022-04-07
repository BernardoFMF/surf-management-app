'use strict'

import error from '../utils/error.js'
import {getUsers, getUserById, postUser, updateUser, deleteUser, getUsersQuotas, getUserQuotasById,
	postUsersQuota, updateUserQuota, updateUsersQuota, getUsersSports, getUsersSport, getUserSportsById, postUserSport, updateUserSport, deleteUserSport } from '../data/userDataMem.js'

const getUsersServices = async () => {
	return await getUsers()
}

const getUserByIdServices = async (id) => {
	if(!id) throw error(400, 'Parameter not found: id')
	return await getUserById(id)
}

const postUserServices = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	if(!cc) throw error(400, 'Parameter not found: cc')
	if(!nif) throw error(400, 'Parameter not found: nif')
	if(!type) throw error(400, 'Parameter not found: type')
	if(!birth_date) throw error(400, 'Parameter not found: birth_date')
	if(!nationality) throw error(400, 'Parameter not found: nationality')
	if(!full_name) throw error(400, 'Parameter not found: full_name')
	if(!phone_number) throw error(400, 'Parameter not found: phone_number')
	if(!email) throw error(400, 'Parameter not found: email')
	if(!postal_code) throw error(400, 'Parameter not found: postal_code')
	if(!address) throw error(400, 'Parameter not found: address')
	if(!location) throw error(400, 'Parameter not found: location')
	if(!password) throw error(400, 'Parameter not found: password')
	return await postUser(cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password)
}

const updateUserServices = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	if(!cc) throw error(400, 'Parameter not found: cc')
	if(!nif) throw error(400, 'Parameter not found: nif')
	if(!type) throw error(400, 'Parameter not found: type')
	if(!birth_date) throw error(400, 'Parameter not found: birth_date')
	if(!nationality) throw error(400, 'Parameter not found: nationality')
	if(!full_name) throw error(400, 'Parameter not found: full_name')
	if(!phone_number) throw error(400, 'Parameter not found: phone_number')
	if(!email) throw error(400, 'Parameter not found: email')
	if(!postal_code) throw error(400, 'Parameter not found: postal_code')
	if(!address) throw error(400, 'Parameter not found: address')
	if(!location) throw error(400, 'Parameter not found: location')
	if(!password) throw error(400, 'Parameter not found: password')
	return await updateUser(cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password)
}

const deleteUserServices = async (id) => {
	if(!id) throw error(400, 'Parameter not found: id')
	return await deleteUser(id)
}

const getUsersQuotasServices = async () => {
	return await getUsersQuotas()
}

const getUserQuotasByIdServices = async (id) => {
	if(!id) throw error(400, 'Parameter not found: id')
	return await getUserQuotasById(id)
}

const postUsersQuotaServices = async (date) => {
	if(!date) throw error(400, 'Parameter not found: date')
	return await postUsersQuota(date)
}

const updateUserQuotaServices = async (qid, paymentDate) => {
	if(!qid) throw error(400, 'Parameter not found: qid')
	if(!paymentDate) throw error(400, 'Parameter not found: paymentDate')
	return await updateUserQuota(qid, paymentDate)
}

const updateUsersQuotaServices = async (oldDate, newDate) => {
	if(!oldDate) throw error(400, 'Parameter not found: oldDate')
	if(!newDate) throw error(400, 'Parameter not found: newDate')
	return await updateUsersQuota(oldDate, newDate)
}

const getUsersSportsServices = async () => {
	return await getUsersSports()
}

const getUsersSportServices = async (sid) => {
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await getUsersSport(sid)
}

const getUserSportsByIdServices = async (id) => {
	if(!id) throw error(400, 'Parameter not found: id')
	return await getUserSportsById(id)
}

const postUserSportServices = async (id, sid, type, federationNumber, federationId, yearsFederated) => {
	if(!id) throw error(400, 'Parameter not found: id')
	if(!sid) throw error(400, 'Parameter not found: sid')
	if(!type) throw error(400, 'Parameter not found: type')
	if(!federationNumber) throw error(400, 'Parameter not found: federationNumber')
	if(!federationId) throw error(400, 'Parameter not found: federationId')
	if(!yearsFederated) throw error(400, 'Parameter not found: yearsFederated')
	return await postUserSport(id, sid, type, federationNumber, federationId, yearsFederated)
}

const updateUserSportServices = async (id, sid, type, federationNumber, federationId, yearsFederated) => {
	if(!id) throw error(400, 'Parameter not found: id')
	if(!sid) throw error(400, 'Parameter not found: sid')
	if(!type) throw error(400, 'Parameter not found: type')
	if(!federationNumber) throw error(400, 'Parameter not found: federationNumber')
	if(!federationId) throw error(400, 'Parameter not found: federationId')
	if(!yearsFederated) throw error(400, 'Parameter not found: yearsFederated')
	return await updateUserSport(id, sid, type, federationNumber, federationId, yearsFederated)
}

const deleteUserSportServices = async (id, sid) => {
	if(!id) throw error(400, 'Parameter not found: id')
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await deleteUserSport(id, sid)
}

export { getUsersServices, getUserByIdServices, postUserServices, updateUserServices, deleteUserServices, getUsersQuotasServices, getUserQuotasByIdServices, postUsersQuotaServices, updateUsersQuotaServices, updateUserQuotaServices, getUsersSportsServices, getUsersSportServices, getUserSportsByIdServices, postUserSportServices, updateUserSportServices, deleteUserSportServices }