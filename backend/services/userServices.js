'use strict'

import error from '../utils/error.js'
import userData from '../data/userData.js'
import crypto from '../utils/crypto.js'

const userServices = (db) => {
	const data = userData(db)

	const getUsersServices = async (username_filter,name_filter,email_filter,offset,limit) => {
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		return await data.getUsers(username_filter,name_filter,email_filter,offset,limit)
	}
	
	const getUserByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		return await data.getUserById(id)
	}
	
	const postUserServices = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password, username, paid_enrollment, gender, url, iban, img, enrollment_date) => {
		if(!cc) throw error(400, 'Parameter not found: cc', 'MESSAGE_CODE_14')
		if(!nif) throw error(400, 'Parameter not found: nif', 'MESSAGE_CODE_14')
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!birth_date) throw error(400, 'Parameter not found: birth_date', 'MESSAGE_CODE_14')
		if(!nationality) throw error(400, 'Parameter not found: nationality', 'MESSAGE_CODE_14')
		if(!full_name) throw error(400, 'Parameter not found: full_name', 'MESSAGE_CODE_14')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number', 'MESSAGE_CODE_14')
		if(!email) throw error(400, 'Parameter not found: email', 'MESSAGE_CODE_14')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code', 'MESSAGE_CODE_14')
		if(!address) throw error(400, 'Parameter not found: address', 'MESSAGE_CODE_14')
		if(!location) throw error(400, 'Parameter not found: location', 'MESSAGE_CODE_14')
		if(!password) throw error(400, 'Parameter not found: password', 'MESSAGE_CODE_14')
		if(!username) throw error(400, 'Parameter not found: username', 'MESSAGE_CODE_14')
		if(paid_enrollment == undefined) throw error(400, 'Parameter not found: paid_enrollment', 'MESSAGE_CODE_14')
		if(!gender) throw error(400, 'Parameter not found: gender', 'MESSAGE_CODE_14')
		if(!iban) throw error(400, 'Parameter not found: iban', 'MESSAGE_CODE_14')
		if(!enrollment_date) throw error(400, 'Parameter not found: enrollment_date', 'MESSAGE_CODE_14')


		const pwordhashed = await crypto.hashpassword(password)
		
		return await data.postUser(cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, pwordhashed, username, paid_enrollment, gender, url, iban, img, enrollment_date)
	}
	
	const updateUserServices = async (id, cc, nif, type, birth_date, nationality, full_name, phone_number, postal_code, address, location, img, paid_enrollment, is_admin, is_deleted, gender, iban) => {

		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!cc) throw error(400, 'Parameter not found: cc', 'MESSAGE_CODE_14')
		if(!nif) throw error(400, 'Parameter not found: nif', 'MESSAGE_CODE_14')
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!birth_date) throw error(400, 'Parameter not found: birth_date', 'MESSAGE_CODE_14')
		if(!nationality) throw error(400, 'Parameter not found: nationality', 'MESSAGE_CODE_14')
		if(!full_name) throw error(400, 'Parameter not found: full_name', 'MESSAGE_CODE_14')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number', 'MESSAGE_CODE_14')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code', 'MESSAGE_CODE_14')
		if(!address) throw error(400, 'Parameter not found: address', 'MESSAGE_CODE_14')
		if(!location) throw error(400, 'Parameter not found: location', 'MESSAGE_CODE_14')
		if(paid_enrollment == undefined) throw error(400, 'Parameter not found: paid_enrollment', 'MESSAGE_CODE_14')
		if(is_admin == undefined) throw error(400, 'Parameter not found: is_admin', 'MESSAGE_CODE_14')
		if(is_deleted == undefined) throw error(400, 'Parameter not found: is_deleted', 'MESSAGE_CODE_14')
		if(!gender) throw error(400, 'Parameter not found: gender', 'MESSAGE_CODE_14')
		if(!iban) throw error(400, 'Parameter not found: iban', 'MESSAGE_CODE_14')


		return await data.updateUser(id, cc, nif, type, birth_date, nationality, full_name, phone_number, postal_code, address, location, img, paid_enrollment, is_admin, is_deleted, gender, iban)
	}
	
	const deleteUserServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		return await data.deleteUser(id)
	}
	
	const getUsersSportsServices = async () => {
		return await data.getUsersSports()
	}
	
	const getUsersSportServices = async (sid, offset, limit) => {
		if(!sid) throw error(400, 'Parameter not found: sid', 'MESSAGE_CODE_14')
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		return await data.getUsersSport(sid, offset, limit)
	}
	
	const getUserSportsByIdServices = async (id, offset, limit) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		return await data.getUserSportsById(id, offset, limit)
	}
	
	const postUserSportServices = async (id, sid, fed_id, fed_number, fed_name, type, years_federated) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!sid) throw error(400, 'Parameter not found: sid', 'MESSAGE_CODE_14')
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!fed_number) throw error(400, 'Parameter not found: fed_number', 'MESSAGE_CODE_14')
		if(!fed_id) throw error(400, 'Parameter not found: fed_id', 'MESSAGE_CODE_14')
		if(!fed_name) throw error(400, 'Parameter not found: fed_name', 'MESSAGE_CODE_14')
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!years_federated) throw error(400, 'Parameter not found: years_federated', 'MESSAGE_CODE_14')
		return await data.postUserSport(id, sid, fed_id, fed_number, fed_name, type, years_federated)
	}
	
	const updateUserSportServices = async (id, sid, fed_id, fed_number, fed_name, type, years_federated, is_absent_) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!sid) throw error(400, 'Parameter not found: sid', 'MESSAGE_CODE_14')
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!fed_number) throw error(400, 'Parameter not found: fed_number', 'MESSAGE_CODE_14')
		if(!fed_id) throw error(400, 'Parameter not found: fed_id', 'MESSAGE_CODE_14')
		if(!fed_name) throw error(400, 'Parameter not found: fed_name', 'MESSAGE_CODE_14')
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!years_federated) throw error(400, 'Parameter not found: years_federated', 'MESSAGE_CODE_14')
		if(is_absent_ == undefined) throw error(400, 'Parameter not found: is_absent_', 'MESSAGE_CODE_14')
		return await data.updateUserSport(id, sid, fed_id, fed_number, fed_name, type, years_federated, is_absent_)
	}
	
	const deleteUserSportServices = async (id, sid) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!sid) throw error(400, 'Parameter not found: sid', 'MESSAGE_CODE_14')
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