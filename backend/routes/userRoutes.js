'use strict'

import express from 'express'

import userController from '../controllers/userControllers.js'

const userRoutes = (data) => {
	const app = express.Router()

	const controller = userController(data)

	// sports
	
	app.get('/sports', controller.getUsersSports)
	
	app.get('/sports/:sid', controller.getUsersSport)
	
	app.get('/:id/sports', controller.getUserSportsById)
	
	app.post('/:id/sports', controller.postUserSport)
	
	app.put('/:id/sports/:sid', controller.updateUserSport)
	
	app.delete('/:id/sports/:sid', controller.deleteUserSport)
	
	// users
	
	app.get('/', controller.getUsers)
	
	app.get('/:id', controller.getUserById)
	
	app.post('/', controller.postUser)
	
	app.put('/:id', controller.updateUser)
	
	app.delete('/:id', controller.deleteUser)
	
	return app
}

export default userRoutes