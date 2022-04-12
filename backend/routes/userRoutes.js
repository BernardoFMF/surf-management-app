'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import userController from '../controllers/userControllers.js'

const userRoutes = (data) => {
	const app = express.Router()

	const controller = userController(data)

	// sports
	
	app.get('/sports', authentication.authAdmin, controller.getUsersSports)
	
	app.get('/sports/:sid', authentication.authAdmin, controller.getUsersSport)
	
	app.get('/:id/sports', authentication.authMember, controller.getUserSportsById)
	
	app.post('/:id/sports', authentication.authMember, controller.postUserSport)
	
	app.put('/:id/sports/:sid', authentication.authMember, controller.updateUserSport)
	
	app.delete('/:id/sports/:sid', authentication.authMember, controller.deleteUserSport)
	
	// users
	
	app.get('/', authentication.authAdmin, controller.getUsers)
	
	app.get('/:id', authentication.authMember, controller.getUserById)
	
	app.post('/', authentication.authAdmin, controller.postUser)
	
	app.put('/:id', authentication.authMember, controller.updateUser)
	
	app.delete('/:id', authentication.authAdmin, controller.deleteUser)
	
	return app
}

export default userRoutes