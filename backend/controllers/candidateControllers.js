'use strict'

import asyncHandler from 'express-async-handler'

import {getCandidatesServices, getCandidateByIdServices, postCandidateServices, deleteCandidateServices, approveCandidateServices} from '../services/candidateServices.js'

const getCandidates = asyncHandler(async (req, res) => {
	const candidates = await getCandidatesServices()
	res.json(candidates)
})

const getCandidateById = asyncHandler(async (req, res) => {
	const candidate = await getCandidateByIdServices(req.params.cid)
	if (candidate) res.json(candidate)
})

const postCandidate = asyncHandler(async (req, res) => {
	const candidate = await postCandidateServices(req.body.cc, req.body.nif, req.body.type, req.body.birth_date, req.body.nationality, req.body.full_name, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location, req.body.password)
	if (candidate) {
		res.status(201)
		res.json(candidate)
	}
})

const deleteCandidate = asyncHandler(async (req, res) => {
	const candidate = await deleteCandidateServices(req.params.cid)
	if (candidate) res.json({ message: 'Candidate deleted sucessfully' })
})

const approveCandidate = asyncHandler(async (req, res) => {
	const candidate = await approveCandidateServices(req.params.cid)
	if (candidate) res.json({ message: 'Candidate approved sucessfully' })
})

export {getCandidates, getCandidateById, postCandidate, deleteCandidate, approveCandidate}