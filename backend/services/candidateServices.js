'use strict'

import error from '../utils/error.js'
import candidateData from '../data/candidateData.js'
import crypto from '../utils/crypto.js'

const candidateServices = (db) => {
	const data = candidateData(db)

	const getCandidatesServices = async (username_filter,name_filter,email_filter,offset,limit) => {
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		return await data.getCandidates(username_filter,name_filter,email_filter,offset,limit)
	}
	
	const getCandidateByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		return await data.getCandidateById(id)
	}
	
	const postCandidateServices = async (username, cc, nif, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password, img, gender, iban) => {
		if(!username) throw error(400, 'Parameter not found: username', 'MESSAGE_CODE_14')
		if(!cc) throw error(400, 'Parameter not found: cc', 'MESSAGE_CODE_14')
		if(!nif) throw error(400, 'Parameter not found: nif', 'MESSAGE_CODE_14')
		if(!birth_date) throw error(400, 'Parameter not found: birth_date', 'MESSAGE_CODE_14')
		if(!nationality) throw error(400, 'Parameter not found: nationality', 'MESSAGE_CODE_14')
		if(!full_name) throw error(400, 'Parameter not found: full_name', 'MESSAGE_CODE_14')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number', 'MESSAGE_CODE_14')
		if(!email) throw error(400, 'Parameter not found: email', 'MESSAGE_CODE_14')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code', 'MESSAGE_CODE_14')
		if(!address) throw error(400, 'Parameter not found: address', 'MESSAGE_CODE_14')
		if(!location) throw error(400, 'Parameter not found: location', 'MESSAGE_CODE_14')
		if(!password) throw error(400, 'Parameter not found: password', 'MESSAGE_CODE_14')
		if(!gender) throw error(400, 'Parameter not found: gender', 'MESSAGE_CODE_14')
		if(!iban) throw error(400, 'Parameter not found: iban', 'MESSAGE_CODE_14')

		const pwordhashed = await crypto.hashpassword(password)
		return await data.postCandidate(username, cc, nif, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, pwordhashed, img, gender, iban)
	}
	
	const deleteCandidateServices = async (cid) => {
		if(!cid) throw error(400, 'Parameter not found: cid', 'MESSAGE_CODE_14')
		return await data.deleteCandidate(cid)
	}
	
	const approveCandidateServices = async (cid, type_, paid_enrollment_, url, sendEmail) => {
		if(!cid) throw error(400, 'Parameter not found: cid', 'MESSAGE_CODE_14')

		return await data.approveCandidate(cid, type_, paid_enrollment_, url, sendEmail)
	}

	return {
		getCandidatesServices, 
		getCandidateByIdServices, 
		postCandidateServices, 
		deleteCandidateServices, 
		approveCandidateServices
	}
}

export default candidateServices