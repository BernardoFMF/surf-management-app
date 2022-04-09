'use strict'

import express from 'express'

import quotaController from '../controllers/quotaControllers.js'


const quotaRoutes = (data) => {
	const app = express.Router()

	const controller = quotaController(data)

	app.get('/', controller.getQuotas)
    
	app.get('/companies', controller.getCompaniesQuotas)
    
	app.get('/users', controller.getUsersQuotas)
    
	app.get('/:id', controller.getMemberQuotasById)
    
	app.post('/', controller.postQuota)
    
	app.put('/:id', controller.updateMemberQuota)

	return app
}

export default quotaRoutes