'use strict'

import asyncHandler from 'express-async-handler'

import candidateServices from '../services/candidateServices.js'

const candidateController = (data) => {
	const services = candidateServices(data)

	const getCandidates = asyncHandler(async (req, res) => {
		const candidates = await services.getCandidatesServices(req.query.username,req.query.name,req.query.email,req.query.offset,req.query.limit)
		res.json(candidates)
	})
	
	const getCandidateById = asyncHandler(async (req, res) => {
		const candidate = await services.getCandidateByIdServices(req.params.cid)
		if (candidate) res.json(candidate)
	})
	
	const postCandidate = asyncHandler(async (req, res) => {
		const candidate = await services.postCandidateServices(req.body.username, req.body.cc, req.body.nif, req.body.birth_date, req.body.nationality, req.body.full_name, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location, req.body.password, req.body.img, req.body.gender, req.body.iban)
		if (candidate) {
			res.status(201)
			res.json(candidate)
		}
	})
	
	const deleteCandidate = asyncHandler(async (req, res) => {
		const candidate = await services.deleteCandidateServices(req.params.cid)
		if (candidate) res.json({ message: 'Candidate deleted sucessfully', message_code: 'MESSAGE_CODE_3' })
	})
	
	const approveCandidate = asyncHandler(async (req, res) => {
		const url = req.protocol + '://' + req.get('host')
		const candidate = await services.approveCandidateServices(req.params.cid, req.body.type_, req.body.paid_enrollment_, url)
		if (candidate) res.json({ message: 'Candidate approved sucessfully', message_code: 'MESSAGE_CODE_4' })
	})

	return {
		getCandidates,
		getCandidateById,
		postCandidate,
		deleteCandidate,
		approveCandidate
	}
}

export default candidateController