'use strict'

import error from '../utils/error.js'

const candidateData = (db) => {
	const getCandidates = async () => {
		return await db.getCandidatesData()
	}
	
	const getCandidateById = async (id_) => {
		const candidate = await db.getCandidateByIdData(id_)
		if (!candidate) throw error(404, 'Candidate does not exist')
		return candidate
	}
	
	const postCandidate = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_) => {
		const candidate = await db.getCandidateByUsernameData(username_)
		if (candidate) throw error(409, 'Candidate with that username already exists')
		const member = await db.getMemberByUsernameData(username_)
		if (member) throw error(409, 'Member with that username already exists')
		return await db.postCandidateData(username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_)
	}
	
	const deleteCandidate = async (id_) => {
		await getCandidateById(id_)
		return await db.deleteCandidateData(id_)
	}
	
	const approveCandidate = async (id_) => {
		await getCandidateById(id_)
		return await db.approveCandidateData(id_)
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