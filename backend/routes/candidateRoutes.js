'use strict'

import express from 'express'

import candidateController from '../controllers/candidateControllers.js'

const candidateRoutes = (data) => {
	const app = express.Router()

	const controller = candidateController(data)
	
	app.get('/', controller.getCandidates)
    
	app.get('/:cid', controller.getCandidateById)
    
	app.post('/', controller.postCandidate)
    
	app.delete('/:cid', controller.deleteCandidate)
    
	app.put('/:cid', controller.approveCandidate)
    
	return app
}

export default candidateRoutes