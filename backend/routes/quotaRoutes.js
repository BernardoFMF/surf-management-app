'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import quotaController from '../controllers/quotaControllers.js'


const quotaRoutes = (data) => {
	const app = express.Router()

	const controller = quotaController(data)

	app.get('/', authentication.authAdmin, controller.getQuotas)
    
	app.get('/companies', authentication.authAdmin, controller.getCompaniesQuotas)
    
	app.get('/users', authentication.authAdmin, controller.getUsersQuotas)
    
	app.get('/members/:id', authentication.authMember, controller.getMemberQuotasById)
    
	app.post('/', authentication.authAdmin, controller.postQuota)

	app.delete('/', authentication.authAdmin, controller.deleteQuota)
    
	app.put('/:id', authentication.authAdmin, controller.updateMemberQuota)

	app.get('/management', authentication.authAdmin, controller.getManagementQuotas)

	app.put('/management/:type', authentication.authAdmin, controller.updateManagementQuotaByType)

	app.post('/management', authentication.authAdmin, controller.postManagementQuota)

	return app
}

export default quotaRoutes