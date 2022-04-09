'use strict'

import error from '../utils/error.js'

const userData = (db) => {
	const getUsers = async () => {
		return db.getUsersData()
	}
	
	const getUserById = async (id_) => {
		const user = db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist')
		return user
	}
	
	const postUser = async (cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_) => {
		//encrypt password

		//generate qrcode
		const qrcode_ = null

		return db.postUserData(cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, qrcode_, paid_enrollment_)
	}
	
	const updateUser = async (id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, img_, img_name_, paid_enrollment_, is_admin_) => {
		await getUserById(id_)
		return db.updateUserData(id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, img_, img_name_, paid_enrollment_, is_admin_)
	}
	
	const deleteUser = async (id_) => {
		await getUserById(id_)
		return db.deleteUserData(id_)
	}
	
	const getUsersSports = async () => {
		return db.getUsersSportsData()
	}
	
	const getUsersSport = async (id_) => {
		const sport = db.getSportByIdData(id_)
		if (!sport) throw error(404, 'Sport does not exist')
		return db.getUsersSportData(id_)
	}
	
	const getUserSportsById = async (id_) => {
		await getUserById(id_)
		return db.getUserSportsByIdData(id_)
	}
	
	const postUserSport = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
		await getUserById(id_)
		const sport = db.getSportByIdData(sid_)
		if (!sport) throw error(404, 'Sport does not exist')
		const user_sport = db.getUserSportsByIdData(id_).filter(tuple => tuple.id_ == sid_)[0]
		if (user_sport)
			throw error(409, 'User is already related to this Sport')
		return db.postUserSportData(id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_)
	}
	
	const updateUserSport = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
		await getUserById(id_)
		const sports = db.getUserSportsByIdData(id_)
		const sport = sports.filter(s => s.id_ == sid_)[0]
		if (!sport) throw error(404, 'User is not related to this Sport')
		return db.updateUserSportData(id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_)
	}
	
	const deleteUserSport = async (id_, sid_) => {
		await getUserById(id_)
		const sport = db.getSportByIdData(sid_)
		if (!sport) throw error(404, 'Sport does not exist')
		return db.deleteUserSportData(id_, sid_)
	}

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

export default userData