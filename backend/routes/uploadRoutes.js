'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import uploadController from '../controllers/uploadControllers.js'


const uploadRoutes = (data) => {
	const app = express.Router()

	const controller = uploadController(data)

	app.post('/uploadfile', authentication.authMember, controller.uploadFile)
    

	return app
}

export default uploadRoutes