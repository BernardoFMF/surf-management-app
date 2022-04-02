'use strict'

import error from '../utils/error.js'
import {postUser} from './userDataMem.js'
let candidates = []
let autoId = 0

const getCandidates = async () => {
	return candidates
}

const getCandidateById = async (id) => {
	const candidate = candidates.filter(candidate => candidate.id == id)[0]
	if (!candidate) throw error(404, 'Could not find any candidate.')
	return candidate
}

const postCandidate = async (cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password) => {
	autoId++
	const newCandidate = {id : autoId, cc, nif, type, birth_date, nationality, full_name, phone_number, email, postal_code, address, location, password}
	candidates.push(newCandidate)
	return newCandidate
}

const deleteCandidate = async (id) => {
	candidates = candidates.filter(candidate => candidate.id != id)
	return candidates
}

const approveCandidate = async (id) => {
	const candidate = await getCandidateById(id)
	candidates = candidates.filter(candidate => candidate.id != id)
	postUser(candidate.cc, candidate.nif, candidate.type, candidate.birth_date, candidate.nationality, candidate.full_name, candidate.phone_number, candidate.email, candidate.postal_code, candidate.address, location, candidate.password)
	return candidates
}

export {getCandidates, getCandidateById, postCandidate, deleteCandidate, approveCandidate} 