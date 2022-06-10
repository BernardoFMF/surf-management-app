'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

//import groupController from '../controllers/groupControllers.js'

const groupRoutes = (data) => {
	const app = express.Router()

	const controller = groupController(data)
	
	app.get('/', authentication.authAdmin, controller.getGroups)
	
	//app.get('/:id', authentication.authAdmin, controller.getGroupById)
		
	app.post('/', authentication.authAdmin, controller.postGroup)
	
	return app
}

export default groupRoutes