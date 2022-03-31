'use strict'
//TODO Error Handling
import asyncHandler from 'express-async-handler'

import {getCompaniesServices, getCompanyByIdServices, postCompanyServices, updateCompanyServices, deleteCompanyServices, 
	getCompaniesQuotasServices, getCompanyQuotasByIdServices, postCompaniesQuotaServices, updateCompaniesQuotaServices, updateCompanyQuotaServices,updateCompaniesQuotaServices,
	postCompanyEventServices, updateCompanyEventByIdServices} from '../services/companyServices.js'

const getCompanies = asyncHandler(async (req, res) => {
	const companies = await getCompaniesServices()
	res.json(companies)
})

const getCompanyById = asyncHandler(async (req, res) => {
	const company = await getCompanyByIdServices(req.params.id)
	if (company) res.json(company)
	else {
		res.status(404)
		throw new Error('Company not found.')
	}
})

const postCompany = asyncHandler(async (req, res) => {
	const company = await postCompanyServices(req.body.name, req.body.nif)
	if (company) res.json(company)
	else {
		res.status()
	}
})

const updateCompany = asyncHandler(async (req, res) => {
	const company = await updateCompanyServices(req.body.name, req.body.nif)
	if(company) res.json(company)
	else {
		res.status()
	}
})

const deleteCompany = asyncHandler(async (req, res) => {
	const company = await deleteCompanyServices(req.params.id)
	if(company) res.json(company)
	else {
		res.status()
	}
})

const getCompaniesQuotas = asyncHandler(async (req, res) => {
	const companies = await getCompaniesQuotasServices()
	if(companies) res.json(companies)
	else {
		res.status()
	}
})

const getCompanyQuotasById = asyncHandler(async (req, res) => {
	const quotas = await getCompanyQuotasByIdServices(req.params.id)
	if(quotas) res.json(quotas)
	else {
		res.status()
	}
})

const postCompaniesQuota = asyncHandler(async (req,res) => {
	const quota = await postCompaniesQuotaServices() // ????
	if(quota) res.json(quota)
	else {
		res.status()
	}
})

const updateCompaniesQuota = asyncHandler(async (req, res) => {	//TODO year ?
	const quota = await updateCompaniesQuotaServices(req.body.amount,req.body.date,req.body.paymentDate)
	if(quota) res.json(quota)
	else {
		res.status()
	}
})

const updateCompanyQuota = asyncHandler(async (req,res) => {	//TODO year ??
	const quota = await updateCompanyQuotaServices(req.params.id,req.body.amount,req.body.date,req.body.paymentDate)
	if(quota) res.json(quota)
	else {
		res.status()
	}
})

const postCompanyEvent = asyncHandler(async (req,res) => {
	const event = await postCompanyEventServices(req.params.id,req.body.eid,req.body.state)
	if(event) res.json(event)
	else {
		res.status()
	}
})

const updateCompanyEventById = asyncHandler(async (req,res) => {
	const event = await updateCompanyEventByIdServices(req.params.id,req.params.eid,req.body.state)
	if(event) res.json(event)
	else {
		res.status()
	}
})

export {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompaniesQuota, updateCompanyQuota,updateCompaniesQuota,
	postCompanyEvent, updateCompanyEventById}