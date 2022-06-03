'use strict'

import error from '../utils/error.js'
import { toDataURL } from 'qrcode'

const userData = (db) => {
	const getUsers = async (username_filter,name_filter,email_filter,offset,limit) => {
		return await db.getUsersData(username_filter,name_filter,email_filter,offset,limit)
	}
	
	const getUserById = async (id_) => {
		const user = await db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist', 'MESSAGE_CODE_12')

		return user
	}
	
	const postUser = async (cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender, url, iban_) => {
		let candidate = await db.getCandidateByUsernameData(username_)
		if (candidate) throw error(409, 'Candidate with that username already exists', 'MESSAGE_CODE_16')
		candidate = await db.getCandidateByCCData(cc_)
		if (candidate) throw error(409, 'Candidate with that cc already exists', 'MESSAGE_CODE_17')
		candidate = await db.getCandidateByNifData(nif_)
		if (candidate) throw error(409, 'Candidate with that nif already exists', 'MESSAGE_CODE_18')
		candidate = await db.getCandidateByEmailData(email_)
		if (candidate) throw error(409, 'Candidate with that email already exists', 'MESSAGE_CODE_19')
		candidate = await db.getCandidateByIbanData(iban_)
		if (candidate) throw error(409, 'Candidate with that iban already exists', 'MESSAGE_CODE_37')


		let member = await db.getMemberByUsernameData(username_)
		if (member) throw error(409, 'Member with that username already exists', 'MESSAGE_CODE_20')
		member = await db.getMemberByCCData(cc_)
		if (member) throw error(409, 'Member with that cc already exists', 'MESSAGE_CODE_21')
		member = await db.getMemberByNifData(nif_)
		if (member) throw error(409, 'Member with that nif already exists', 'MESSAGE_CODE_22')
		member = await db.getMemberByEmailData(email_)
		if (member) throw error(409, 'Member with that email already exists', 'MESSAGE_CODE_23')
		member = await db.getMemberByIbanData(iban_)
		if (member) throw error(409, 'Member with that iban already exists', 'MESSAGE_CODE_38')

		const userId = await db.postUserData(cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender, iban_)

		const qrcode_ = await toDataURL(`${url}/members/validate/${userId}`)

		await db.updateUserQrCodeData(userId, qrcode_)

		return userId
	}
	
	const updateUser = async (id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_, iban_) => {

		let candidate = await db.getCandidateByCCData(cc_)
		if (candidate) throw error(409, 'Candidate with that cc already exists', 'MESSAGE_CODE_17')
		candidate = await db.getCandidateByNifData(nif_)
		if (candidate) throw error(409, 'Candidate with that nif already exists', 'MESSAGE_CODE_18')
		candidate = await db.getCandidateByIbanData(iban_)
		if (candidate) throw error(409, 'Candidate with that iban already exists', 'MESSAGE_CODE_37')


		let member = await db.getMemberByCCData(cc_)
		if (member && member.id_ != id_) throw error(409, 'Member with that cc already exists', 'MESSAGE_CODE_21')
		member = await db.getMemberByNifData(nif_)
		if (member && member.id_ != id_) throw error(409, 'Member with that nif already exists', 'MESSAGE_CODE_22')
		member = await db.getMemberByIbanData(iban_)
		if (member && member.id_ != id_) throw error(409, 'Member with that iban already exists', 'MESSAGE_CODE_38')

		await getUserById(id_)
		await db.updateUserData(id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_, iban_)
		return await getUserById(id_)
	}
	
	const deleteUser = async (id_) => {
		await getUserById(id_)
		return await db.deleteUserData(id_)
	}
	
	const getUsersSports = async () => {
		return await db.getUsersSportsData()
	}
	
	const getUsersSport = async (id_, offset, limit) => {
		const sport = await db.getSportByIdData(id_)
		if (!sport) throw error(404, 'Sport does not exist', 'MESSAGE_CODE_30')
		return await db.getUsersSportData(id_, offset, limit)
	}
	
	const getUserSportsById = async (id_, offset_, limit_) => {
		await getUserById(id_)
		return await db.getUserSportsByIdData(id_, offset_, limit_)
	}
	
	const postUserSport = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
		const user = await getUserById(id_)
		const sport = await db.getSportByIdData(sid_)
		if (!sport) throw error(404, 'Sport does not exist', 'MESSAGE_CODE_30')
		//We should make the get user sports request to verify if  already exists 
		/*let user_sport = await db.getUserSportsByIdData(id_, 0, limit_)
		user_sport = user_sport.filter(tuple => tuple.sport_id_ == sid_)[0]
		if (user_sport)
			throw error(409, 'User is already related to this Sport', 'MESSAGE_CODE_31')
		*/
		return await db.postUserSportData(user.member_id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_)
	}
	
	const updateUserSport = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_) => {
		await getUserById(id_)
		/*const sports = await db.getAllUserSportsByIdData(id_)
		console.log(sports);
		const sport = sports.filter(s => s.sport_id_ == sid_)[0]
		if (!sport) throw error(404, 'User is not related to this Sport', 'MESSAGE_CODE_32')*/
		return await db.updateUserSportData(id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_)
	}
	
	const deleteUserSport = async (id_, sid_) => {
		await getUserById(id_)
		const sport = await db.getSportByIdData(sid_)
		if (!sport) throw error(404, 'Sport does not exist', 'MESSAGE_CODE_30')
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