'use strict'
//TODO Error Handling
import asyncHandler from 'express-async-handler'

import {getSportsServices, getSportByIdServices, postSportServices, updateSportServices, deleteSportServices} from '../services/sportServices.js'

const getSports = asyncHandler(async (req, res) => {
	const sports = await getSportsServices()
	res.json(sports)
})

const getSportById = asyncHandler(async (req, res) => {
	const sport = await getSportByIdServices(req.params.id)
	if (sport) res.json(sport)
	else {
		res.status(404)
		throw new Error('Sport not found.')
	}
})

const postSport = asyncHandler(async (req, res) => {
	const sport = await postSportServices(req.body.name)
	if (sport) res.json(sport)
	else {
		res.status()
	}
})

const updateSport = asyncHandler(async (req, res) => {
	const sports = await updateSportServices(req.body.name)
	if(sports) res.json(sports)
	else {
		res.status()
	}
})

const deleteSport = asyncHandler(async (req, res) => {
	const sport = await deleteSportServices(req.params.id)
	if(sport) res.json(sport)
	else {
		res.status()
	}
})

export {getSports, getSportById, postSport, updateSport, deleteSport}