'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

import companyServices from '../services/companyServices.js'

const companyController = (data) => {
	const services = companyServices(data)

	const getCompanies = asyncHandler(async (req, res) => {
		const companies = await services.getCompaniesServices(req.query.username,req.query.name,req.query.email,req.query.offset,req.query.limit)
		res.json(companies)
	})
	
	const getCompanyById = asyncHandler(async (req, res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.cid) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const company = await services.getCompanyByIdServices(req.params.cid)
		if (company) res.json(company)
	})
	
	const postCompany = asyncHandler(async (req, res) => {
		const company = await services.postCompanyServices(req.body.name, req.body.nif, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location, req.body.username, req.body.password, req.body.type, req.body.img, req.body.iban)
		if (company) {
			res.status(201)
			res.json(company)
		}
	})
	
	const updateCompany = asyncHandler(async (req, res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.cid) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const company = await services.updateCompanyServices(req.params.cid, req.body.nif, req.body.name, req.body.phone_number, req.body.postal_code, req.body.address, req.body.location, req.body.img, req.body.is_deleted, req.body.iban)
		if (company) res.json(company)
	})
	
	const deleteCompany = asyncHandler(async (req, res) => {
		const company = await services.deleteCompanyServices(req.params.cid)
		if (company) res.json({ message: 'Company deleted sucessfully', message_code: 'MESSAGE_CODE_6' })
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