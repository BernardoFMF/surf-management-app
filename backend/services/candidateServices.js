'use strict'

import error from '../utils/error.js'
import candidateData from '../data/candidateData.js'
import crypto from '../utils/crypto.js'

const candidateServices = (db) => {
	const data = candidateData(db)

	const getCandidatesServices = async () => {
		return await data.getCandidates()
	}
	
	const getCandidateByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id')
		return await data.getCandidateById(id)
	}
	
	const postCandidateServices = async (username, cc, nif, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
		if(!username) throw error(400, 'Parameter not found: username')
		if(!cc) throw error(400, 'Parameter not found: cc')
		if(!nif) throw error(400, 'Parameter not found: nif')
		if(!birth_date) throw error(400, 'Parameter not found: birth_date')
		if(!nationality) throw error(400, 'Parameter not found: nationality')
		if(!full_name) throw error(400, 'Parameter not found: full_name')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number')
		if(!email) throw error(400, 'Parameter not found: email')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code')
		if(!address) throw error(400, 'Parameter not found: address')
		if(!location) throw error(400, 'Parameter not found: location')
		if(!password) throw error(400, 'Parameter not found: password')
		const pwordhashed = await crypto.hashpassword(password)
		return await data.postCandidate(username, cc, nif, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, pwordhashed)
	}
	
	const deleteCandidateServices = async (cid) => {
		if(!cid) throw error(400, 'Parameter not found: cid')
		return await data.deleteCandidate(cid)
	}
	
	const approveCandidateServices = async (cid, type_, quota_value_, qr_code_, paid_enrollment_) => {
		if(!cid) throw error(400, 'Parameter not found: cid')
		return await data.approveCandidate(cid, type_, quota_value_, qr_code_, paid_enrollment_)
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