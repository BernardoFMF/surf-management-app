'use strict'

import error from '../utils/error.js'
import userData from '../data/userData.js'
import crypto from '../utils/crypto.js'

const userServices = (db) => {
	const data = userData(db)

	const getUsersServices = async () => {
		return await data.getUsers()
	}
	
	const getUserByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id')
		return await data.getUserById(id)
	}
	
	const postUserServices = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password, username, paid_enrollment, gender, url) => {
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
		if(!username) throw error(400, 'Parameter not found: username')
		if(paid_enrollment == undefined) throw error(400, 'Parameter not found: paid_enrollment')
		if(!gender) throw error(400, 'Parameter not found: gender')

		let quota_value = 0
		if (type == 'effective') quota_value = 15
		else if (type == 'corporate') quota_value = 50

		const pwordhashed = await crypto.hashpassword(password)
		
		return await data.postUser(cc, nif, type, quota_value, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, pwordhashed, username, paid_enrollment, gender, url)
	}
	
	const updateUserServices = async (id, cc, nif, type, birth_date, nationality, full_name, phone_number, postal_code, address, location, img, paid_enrollment, is_admin, is_deleted, gender) => {
		if(!id) throw error(400, 'Parameter not found: id')
		if(!cc) throw error(400, 'Parameter not found: cc')
		if(!nif) throw error(400, 'Parameter not found: nif')
		if(!type) throw error(400, 'Parameter not found: type')
		if(!birth_date) throw error(400, 'Parameter not found: birth_date')
		if(!nationality) throw error(400, 'Parameter not found: nationality')
		if(!full_name) throw error(400, 'Parameter not found: full_name')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code')
		if(!address) throw error(400, 'Parameter not found: address')
		if(!location) throw error(400, 'Parameter not found: location')
		if(paid_enrollment == undefined) throw error(400, 'Parameter not found: paid_enrollment')
		if(is_admin == undefined) throw error(400, 'Parameter not found: is_admin')
		if(is_deleted == undefined) throw error(400, 'Parameter not found: is_deleted')
		if(!gender) throw error(400, 'Parameter not found: gender')

		let quota_value = 0
		if (type == 'effective') quota_value = 15
		else if (type == 'corporate') quota_value = 50

		return await data.updateUser(id, cc, nif, type, quota_value, birth_date, nationality, full_name, phone_number, postal_code, address, location, img, paid_enrollment, is_admin, is_deleted, gender)
	}
	
	const deleteUserServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id')
		return await data.deleteUser(id)
	}
	
	const getUsersSportsServices = async () => {
		return await data.getUsersSports()
	}
	
	const getUsersSportServices = async (sid) => {
		if(!sid) throw error(400, 'Parameter not found: sid')
		return await data.getUsersSport(sid)
	}
	
	const getUserSportsByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id')
		return await data.getUserSportsById(id)
	}
	
	const postUserSportServices = async (id, sid, fed_id, fed_number, fed_name, type, years_federated) => {
		if(!id) throw error(400, 'Parameter not found: id')
		if(!sid) throw error(400, 'Parameter not found: sid')
		if(!type) throw error(400, 'Parameter not found: type')
		if(!fed_number) throw error(400, 'Parameter not found: fed_number')
		if(!fed_id) throw error(400, 'Parameter not found: fed_id')
		if(!fed_name) throw error(400, 'Parameter not found: fed_name')
		if(!type) throw error(400, 'Parameter not found: type')
		if(!years_federated) throw error(400, 'Parameter not found: years_federated')
		return await data.postUserSport(id, sid, fed_id, fed_number, fed_name, type, years_federated)
	}
	
	const updateUserSportServices = async (id, sid, fed_id, fed_number, fed_name, type, years_federated, is_absent_) => {
		if(!id) throw error(400, 'Parameter not found: id')
		if(!sid) throw error(400, 'Parameter not found: sid')
		if(!type) throw error(400, 'Parameter not found: type')
		if(!fed_number) throw error(400, 'Parameter not found: fed_number')
		if(!fed_id) throw error(400, 'Parameter not found: fed_id')
		if(!fed_name) throw error(400, 'Parameter not found: fed_name')
		if(!type) throw error(400, 'Parameter not found: type')
		if(!years_federated) throw error(400, 'Parameter not found: years_federated')
		if(!is_absent_) throw error(400, 'Parameter not found: is_absent_')
		return await data.updateUserSport(id, sid, fed_id, fed_number, fed_name, type, years_federated, is_absent_)
	}
	
	const deleteUserSportServices = async (id, sid) => {
		if(!id) throw error(400, 'Parameter not found: id')
		if(!sid) throw error(400, 'Parameter not found: sid')
		return await data.deleteUserSport(id, sid)
	}
	
	return {
		getUsersServices, 
		getUserByIdServices, 
		postUserServices, 
		updateUserServices, 
		deleteUserServices, 
		getUsersSportsServices, 
		getUsersSportServices, 
		getUserSportsByIdServices, 
		postUserSportServices, 
		updateUserSportServices, 
		deleteUserSportServices
	}
}

export default userServices