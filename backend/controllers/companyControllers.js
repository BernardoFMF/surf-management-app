'use strict'

import asyncHandler from 'express-async-handler'

import companyServices from '../services/companyServices.js'

const companyController = (data) => {
	const services = companyServices(data)

	const getCompanies = asyncHandler(async (req, res) => {
		const companies = await services.getCompaniesServices()
		res.json(companies)
	})
	
	const getCompanyById = asyncHandler(async (req, res) => {
		const company = await services.getCompanyByIdServices(req.params.cid)
		if (company) res.json(company)
	})
	
	const postCompany = asyncHandler(async (req, res) => {
		const company = await services.postCompanyServices(req.body.name, req.body.nif, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location)
		if (company) {
			res.status(201)
			res.json(company)
		}
	})
	
	const updateCompany = asyncHandler(async (req, res) => {
		const company = await services.updateCompanyServices(req.params.cid, req.body.name, req.body.nif, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location)
		if (company) res.json(company)
	})
	
	const deleteCompany = asyncHandler(async (req, res) => {
		const company = await services.deleteCompanyServices(req.params.cid)
		if (company) res.json({ message: 'Company deleted sucessfully' })
	})

	return {
		getCompanies,
		getCompanyById,
		postCompany,
		updateCompany,
		deleteCompany
	}
}

export default companyController