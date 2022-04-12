'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import companyController from '../controllers/companyControllers.js'

const companyRoutes = (data) => {
	const app = express.Router()
	
	const controller = companyController(data)
	
	app.get('/', authentication.authAdmin, controller.getCompanies)

	app.get('/:cid', authentication.authMember, controller.getCompanyById)
    
	app.post('/', authentication.authAdmin, controller.postCompany)
    
	app.put('/:cid', authentication.authMember, controller.updateCompany)
    
	app.delete('/:cid', authentication.authAdmin, controller.deleteCompany)
    
	return app
}

export default companyRoutes