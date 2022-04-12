'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import candidateController from '../controllers/candidateControllers.js'

const candidateRoutes = (data) => {
	const app = express.Router()

	const controller = candidateController(data)
	
	app.get('/', authentication.authAdmin, controller.getCandidates)
    
	app.get('/:cid', authentication.authAdmin, controller.getCandidateById)
    
	app.post('/', controller.postCandidate)
    
	app.delete('/:cid', authentication.authAdmin, controller.deleteCandidate)
    
	app.put('/:cid', authentication.authAdmin, controller.approveCandidate)
    
	return app
}

export default candidateRoutes