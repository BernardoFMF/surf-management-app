'use strict'

import asyncHandler from 'express-async-handler'

import {getCompaniesServices, getCompanyByIdServices, postCompanyServices, updateCompanyServices, deleteCompanyServices, 
	getCompaniesQuotasServices, getCompanyQuotasByIdServices, postCompaniesQuotaServices, updateCompanyQuotaServices, updateCompaniesQuotaServices} from '../services/companyServices.js'

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

const getCompaniesQuotas = asyncHandler(async (req, res) => {
	const companiesQuotas = await getCompaniesQuotasServices()
	if (companiesQuotas) res.json(companiesQuotas)
})

const getCompanyQuotasById = asyncHandler(async (req, res) => {
	const companyQuotas = await getCompanyQuotasByIdServices(req.params.cid)
	if(companyQuotas) res.json(companyQuotas)
})

const postCompaniesQuota = asyncHandler(async (req,res) => {
	const companyQuota = await postCompaniesQuotaServices(req.body.date)
	if(companyQuota) {
		res.status(201)
		res.json({ message: 'Quotas created sucessfully' })
	}
})

const updateCompanyQuota = asyncHandler(async (req,res) => {
	const companyQuota = await updateCompanyQuotaServices(req.params.qid, req.body.payment_date)
	if(companyQuota) res.json(companyQuota)
})

const updateCompaniesQuota = asyncHandler(async (req,res) => {
	const companyQuota = await updateCompaniesQuotaServices(req.body.old_date, req.body.new_date)
	if(companyQuota) res.json(companyQuota)
})

export { getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompanyQuota, updateCompaniesQuota }