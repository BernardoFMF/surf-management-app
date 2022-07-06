'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import statisticsController from '../controllers/statisticsController.js'

const statisticsRoutes = (data) => {
	const app = express.Router()

	const controller = statisticsController(data)
	
	app.get('/', authentication.authAdmin, controller.getStatistics)

	return app
}

export default statisticsRoutes