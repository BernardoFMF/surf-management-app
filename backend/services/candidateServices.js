'use strict'

import error from '../utils/error.js'
import {getCandidates, getCandidateById, postCandidate, deleteCandidate, approveCandidate} from '../data/candidateDateMem.js'

const getCandidatesServices = async () => {
	return await getCandidates()
}

const getCandidateByIdServices = async (id) => {
	if(!id) throw error(400, 'Parameter not found: id')
	return await getCandidateById(id)
}

const postCandidateServices = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	if(!cc) throw error(400, 'Parameter not found: cc')
	if(!nif) throw error(400, 'Parameter not found: nif')
	if(!type) throw error(400, 'Parameter not found: type')
	if(!birth_date) throw error(400, 'Parameter not found: birth_date')
	if(!nationality) throw error(400, 'Parameter not found: nationality')
	if(!full_name) throw error(400, 'Parameter not found: full_name')
	if(!phone_number) throw error(400, 'Parameter not found: phone_number')
	if(!email) throw error(400, 'Parameter not found: email')
	if(!postal_code) throw error(400, 'Parameter not found: postal_code')
	if(!address) throw error(400, 'Parameter not found: address')
	if(!location) throw error(400, 'Parameter not found: location')
	if(!password) throw error(400, 'Parameter not found: password')
	return await postCandidate(cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password)
}

const deleteCandidateServices = async (cid) => {
	if(!cid) throw error(400, 'Parameter not found: cid')
	return await deleteCandidate(cid)
}

const approveCandidateServices = async (cid) => {
	if(!cid) throw error(400, 'Parameter not found: cid')
	return await approveCandidate(cid)
}

export {getCandidatesServices, getCandidateByIdServices, postCandidateServices, deleteCandidateServices, approveCandidateServices}