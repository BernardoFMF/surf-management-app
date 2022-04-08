'use strict'

import asyncHandler from 'express-async-handler'

import {getCompaniesServices, getCompanyByIdServices, postCompanyServices, updateCompanyServices, deleteCompanyServices} from '../services/companyServices.js'

const getCompanies = asyncHandler(async (req, res) => {
	const companies = await getCompaniesServices()
	res.json(companies)
})

const getCompanyById = asyncHandler(async (req, res) => {
	const company = await getCompanyByIdServices(req.params.cid)
	if (company) res.json(company)
})

const postCompany = asyncHandler(async (req, res) => {
	const company = await postCompanyServices(req.body.name, req.body.nif, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location)
	if (company) {
		res.status(201)
		res.json(company)
	}
})

const updateCompany = asyncHandler(async (req, res) => {
	const company = await updateCompanyServices(req.params.cid, req.body.name, req.body.nif, req.body.phone_number, req.body.email, req.body.postal_code, req.body.address, req.body.location)
	if (company) res.json(company)
})

const deleteCompany = asyncHandler(async (req, res) => {
	const company = await deleteCompanyServices(req.params.cid)
	if (company) res.json({ message: 'Company deleted sucessfully' })
})

export { getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany }