'use strict'

import asyncHandler from 'express-async-handler'

import sportServices from '../services/sportServices.js'

const sportController = (data) => {
	const services = sportServices(data)

	const getSports = asyncHandler(async (req, res) => {
		const sports = await services.getSportsServices()
		res.json(sports)
	})
	
	const getSportById = asyncHandler(async (req, res) => {
		const sport = await services.getSportByIdServices(req.params.sid)
		if (sport) res.json(sport)
	})
	
	const postSport = asyncHandler(async (req, res) => {
		const sport = await services.postSportServices(req.body.name)
		if (sport) {
			res.status(201)
			res.json(sport)
		}
	})
	
	const deleteSport = asyncHandler(async (req, res) => {
		const sport = await services.deleteSportServices(req.params.sid)
		if (sport) res.json({ message: 'Sport deleted sucessfully' })
	})

	return {
		getSports,
		getSportById,
		postSport,
		deleteSport
	}
}

export default sportController