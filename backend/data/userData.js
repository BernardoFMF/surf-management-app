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
	let quotaValue = 0
	if (type == 'effective') quotaValue = 15
	const newUser = {id: autoId, cc, nif, type, birth_date, nationality, full_name, has_debt: true, paid_enrollment: false, quota_value: quotaValue, password, contact: {phone_number, email, postal_code, address, location}, quotas: [], sports: []}
	users.push(newUser)
	return newUser
}

const updateUser = async (id, cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	const user = await getUserById(id)
	await deleteUser(id)
	const newUser = {id, cc, nif, type, birth_date, nationality, full_name, has_debt: user.has_debt, paid_enrollment: user.paid_enrollment, quota_value: user.quota_value, password, contact: {phone_number, email, postal_code, address, location}, quotas: user.quotas, sports: user.sports}
	users.push(newUser)
	return newUser
}

const deleteUser = async (id) => {
	await getUserById(id)
	users = users.filter(user => user.id != id)
	return users
}

const getUsersSports = async () => {
	let userSports = []
	for (let user of users) {
		for (let sport of user.sports) {
			if (sport.length != 0) userSports.push(sport)
		}
	}
	return userSports
}

const getUsersSport = async (sid) => {
	let usersSport = []
	for (let user of users) {
		const sport = user.sports.filter(sport => sport.id == sid)
		if (sport.length != 0) usersSport.push(sport[0])
	}
	return usersSport
}

const getUserSportsById = async (id) => {
	const user = users.filter(user => user.id == id)[0]
	return user.sports
}

const postUserSport = async (id, sid, type, federationNumber, federationId, yearsFederated) => {
	let retSport = {
		id: sid,
		uid: id,
		type,
		federationNumber,
		federationId,
		yearsFederated
	}
	users = users.map(user => {
		if (user.id == id) {
			let sportIfExists = user.sports.filter(sport => sport.id == sid)[0]
			if (sportIfExists) throw error(409, 'sport already exists')
			user.sports.push(retSport)
		}
		return user
	})
	return retSport
}

const updateUserSport = async (id, sid, type, federationNumber, federationId, yearsFederated) => {
	let retSport = {
		id: sid,
		uid: id,
		type,
		federationNumber,
		federationId,
		yearsFederated
	}
	users = users.map(user => {
		if (user.id == id) {
			let sportIfExists = user.sports.filter(sport => sport.id == sid)[0]
			if (!sportIfExists) throw error(409, 'sport does not exists')
			user.sports = user.sports.filter(sport => sport.id != sid)
			user.sports.push(retSport)
		}
		return user
	})
	return retSport
}

const deleteUserSport = async (id, sid) => {
	users.forEach(user => {
		if (user.id == id) {
			user.sports = user.sports.filter(sport => sport.id != sid)
		}
	})
	const idx = users.findIndex((user => user.id == id))
	return users[idx]
}

export { getUsers, getUserById, postUser, updateUser, deleteUser, getUsersSports, getUsersSport, getUserSportsById, postUserSport, updateUserSport, deleteUserSport }