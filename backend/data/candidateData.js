'use strict'

import error from '../utils/error.js'

const candidateData = (db) => {
	const getCandidates = async () => {
		return db.getCandidatesData()
	}
	
	const getCandidateById = async (id_) => {
		const candidate = db.getCandidateByIdData(id_)
		if (!candidate) throw error(404, 'Candidate does not exist')
		return candidate
	}
	
	const postCandidate = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_) => {
		return db.postCandidateData(username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_)
	}
	
	const deleteCandidate = async (id_) => {
		await getCandidateById(id_)
		return db.deleteCandidateData(id_)
	}
	
	const approveCandidate = async (id_) => {
		await getCandidateById(id_)
		return db.approveCandidateData(id_)
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