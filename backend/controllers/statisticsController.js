'use strict'

import asyncHandler from 'express-async-handler'

import statisticsServices from '../services/statisticsServices.js'

const statisticsController = (data) => {
	const services = statisticsServices(data)

	const getStatistics = asyncHandler(async (req, res) => {
		const statistics = await services.getStatisticsServices()
		res.json(statistics)
	})

	return {
		getStatistics
	}
}

export default statisticsController