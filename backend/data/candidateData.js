'use strict'

import error from '../utils/error.js'
import { toDataURL } from 'qrcode'


const candidateData = (db) => {
	const getCandidates = async () => {
		return await db.getCandidatesData()
	}
	
	const getCandidateById = async (id_) => {
		const candidate = await db.getCandidateByIdData(id_)
		if (!candidate) throw error(404, 'Candidate does not exist')
		return candidate
	}
	
	const postCandidate = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_) => {
		let candidate = await db.getCandidateByUsernameData(username_)
		if (candidate) throw error(409, 'Candidate with that username already exists')
		candidate = await db.getCandidateByCCData(cc_)
		if (candidate) throw error(409, 'Candidate with that cc already exists')
		candidate = await db.getCandidateByNifData(nif_)
		if (candidate) throw error(409, 'Candidate with that nif already exists')
		candidate = await db.getCandidateByEmailData(email_)
		if (candidate) throw error(409, 'Candidate with that email already exists')

		let member = await db.getMemberByUsernameData(username_)
		if (member) throw error(409, 'Member with that username already exists')
		member = await db.getMemberByCCData(cc_)
		if (member) throw error(409, 'Member with that cc already exists')
		member = await db.getMemberByNifData(nif_)
		if (member) throw error(409, 'Member with that nif already exists')
		member = await db.getMemberByEmailData(email_)
		if (member) throw error(409, 'Member with that email already exists')

		return await db.postCandidateData(username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_)
	}
	
	const deleteCandidate = async (id_) => {
		await getCandidateById(id_)
		return await db.deleteCandidateData(id_)
	}
	
	const approveCandidate = async (id_, type_, paid_enrollment_, url) => {
		await getCandidateById(id_)
		
		let quota_value = 0
		if (type_ == 'effective') quota_value = 15

		const qrcode_ = await toDataURL(`${url}/members/validate/${id_}`)
		const u_id_ = await db.approveCandidateData(id_, type_, quota_value, paid_enrollment_)
		await db.updateUserQrCodeData(u_id_, qrcode_)

		return u_id_
	}

	return {
		getCandidates, 
		getCandidateById, 
		postCandidate, 
		deleteCandidate, 
		approveCandidate
	} 
}


export default candidateData