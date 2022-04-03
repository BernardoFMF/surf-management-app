'use strict'

import asyncHandler from 'express-async-handler'

import {getSportsServices, getSportByIdServices, postSportServices, deleteSportServices} from '../services/sportServices.js'

const getSports = asyncHandler(async (req, res) => {
	const sports = await getSportsServices()
	res.json(sports)
})

const getSportById = asyncHandler(async (req, res) => {
	const sport = await getSportByIdServices(req.params.sid)
	if (sport) res.json(sport)
})

const postSport = asyncHandler(async (req, res) => {
	const sport = await postSportServices(req.body.name)
	if (sport) {
		res.status(201)
		res.json(sport)
	}
})

const deleteSport = asyncHandler(async (req, res) => {
	const sport = await deleteSportServices(req.params.sid)
	if (sport) res.json({ message: 'Sport deleted sucessfully' })
})

export {getSports, getSportById, postSport, deleteSport}