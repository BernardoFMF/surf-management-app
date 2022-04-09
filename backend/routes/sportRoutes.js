'use strict'

import express from 'express'

import sportController from '../controllers/sportControllers.js'

const sportRoutes = (data) => {
	const app = express.Router()

	const controller = sportController(data)
	
	app.get('/', controller.getSports)
    
	app.get('/:sid', controller.getSportById)
    
	app.post('/', controller.postSport)
    
	app.delete('/:sid', controller.deleteSport)
    
	return app
}

export default sportRoutes