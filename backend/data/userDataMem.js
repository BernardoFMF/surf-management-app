'use strict'

import error from '../utils/error.js'
let users = []
let autoId = 0

const getUsers = async () => {
	return users
}

const getUserById = async (id) => {
	const user = users.filter(user => user.id == id)[0]
	if (!user) throw error(404, 'Could not find any user.')
	return user
}

const postUser = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	autoId++
	const newUser = {id: autoId, cc, nif, type, birth_date, nationality, full_name, password, contact: {phone_number, email, postal_code, address, location}, quotas: [], sports: []}
	users.push(newUser)
	return newUser
}

const updateUser = async (id, cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	await deleteUser(id)
	const newUser = {id, cc, nif, type, birth_date, nationality, full_name, password, contact: {phone_number, email, postal_code, address, location}}
	users.push(newUser)
	return newUser
}

const deleteUser = async (id) => {
	await getUserById(id)
	users = users.filter(user => user.id != id)
	return users
}

const getUsersQuotas = async () => {
    
}

const getUsersQuotasById = async () => {

}

const postUsersQuota = async () => {

}

const updateUserQuota = async () => {
    
}

const getUsersSports = async () => {

}

const getUsersSport = async () => {

}

const getUserSportsById = async () => {

}

const postUserSport = async () => {

}

const updateUserSport = async () => {

}

const deleteUserSport = async () => {

}

export {getUsers, getUserById, postUser, updateUser, deleteUser, getUsersQuotas, getUsersQuotasById,
	postUsersQuota, updateUserQuota, getUsersSports, getUsersSport, getUserSportsById, postUserSport, updateUserSport, deleteUserSport }