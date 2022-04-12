'use strict'

import express from 'express'

import companyController from '../controllers/companyControllers.js'

const companyRoutes = (data) => {
	const app = express.Router()
	
	const controller = companyController(data)
	
	app.get('/', controller.getCompanies)

	app.get('/:cid', controller.getCompanyById)
    
	app.post('/', controller.postCompany)
    
	app.put('/:cid', controller.updateCompany)
    
	app.delete('/:cid', controller.deleteCompany)
    
	return app
}

export default companyRoutes