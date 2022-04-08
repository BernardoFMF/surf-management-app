'use strict'

import error from '../utils/error.js'
import {getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData} from './__mock__/mock.js'

const getCandidates = async () => {
	return getCandidatesData()
}

const getCandidateById = async (id) => {
	const candidate = getCandidateByIdData(id)
	if (!candidate) throw error(404, 'Could not find any candidate.')
	return candidate
}

const postCandidate = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	return postCandidateData(cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password)
}

const deleteCandidate = async (id) => {
	getCandidateById(id)
	return deleteCandidateData(id)
}

const approveCandidate = async (id) => {
	getCandidateById(id)
	return approveCandidateData(id)
}

export {getCandidates, getCandidateById, postCandidate, deleteCandidate, approveCandidate} 