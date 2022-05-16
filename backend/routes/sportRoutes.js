'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import sportController from '../controllers/sportControllers.js'

const sportRoutes = (data) => {
	const app = express.Router()

	const controller = sportController(data)
	
	app.get('/', authentication.authMember, controller.getSports)
    
	app.get('/:sid', authentication.authMember, controller.getSportById)
    
	app.post('/', authentication.authAdmin, controller.postSport)

	app.put('/:sid', authentication.authAdmin, controller.updateSport)
    
	app.delete('/:sid', authentication.authAdmin, controller.deleteSport)
    
	return app
}

export default sportRoutes