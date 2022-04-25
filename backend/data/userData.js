'use strict'

import error from '../utils/error.js'
import { toDataURL } from 'qrcode'

const userData = (db) => {
	const getUsers = async () => {
		return await db.getUsersData()
	}
	
	const getUserById = async (id_) => {
		const user = await db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist')
		return user
	}
	
	const postUser = async (cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender, url) => {
		const member = await db.getMemberByUsernameData(username_)
		if (member) throw error(409, 'Member with that username already exists')

		const userId = await db.postUserData(cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender)

		const qrcode_ = await toDataURL(`${url}/members/validate/${userId}`)

		await db.updateUserQrCodeData(userId, qrcode_)

		return userId
	}
	
	const updateUser = async (id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_) => {
		await getUserById(id_)
		return await db.updateUserData(id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_)
	}
	
	const deleteUser = async (id_) => {
		await getUserById(id_)
		return await db.deleteUserData(id_)
	}
	
	const getUsersSports = async () => {
		return await db.getUsersSportsData()
	}
	
	const getUsersSport = async (id_) => {
		const sport = await db.getSportByIdData(id_)
		if (!sport) throw error(404, 'Sport does not exist')
		return await db.getUsersSportData(id_)
	}
	
	const getUserSportsById = async (id_) => {
		await getUserById(id_)
		return await db.getUserSportsByIdData(id_)
	}
	
	const postUserSport = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
		const user = await getUserById(id_)
		const sport = await db.getSportByIdData(sid_)
		if (!sport) throw error(404, 'Sport does not exist')
		let user_sport = await db.getUserSportsByIdData(id_)
		user_sport = user_sport.filter(tuple => tuple.sport_id_ == sid_)[0]
		if (user_sport)
			throw error(409, 'User is already related to this Sport')
		return await db.postUserSportData(user.member_id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_)
	}
	
	const updateUserSport = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_) => {
		await getUserById(id_)
		const sports = await db.getUserSportsByIdData(id_)
		const sport = sports.filter(s => s.sport_id_ == sid_)[0]
		if (!sport) throw error(404, 'User is not related to this Sport')
		return await db.updateUserSportData(id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_)
	}
	
	const deleteUserSport = async (id_, sid_) => {
		await getUserById(id_)
		const sport = await db.getSportByIdData(sid_)
		if (!sport) throw error(404, 'Sport does not exist')
		return await db.deleteUserSportData(id_, sid_)
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