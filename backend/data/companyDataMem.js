'use strict'

import error from '../utils/error.js'
let companies = []
let autoId = 0

const getCompanies = async () => {
	return companies
}

const getCompanyById = async (cid) => {
	const company = companies.filter(company => company.cid == cid)[0]
	if (!company) throw error(404, 'Could not find any company.')
	return company
}

const postCompany = async (name, nif) => {
	autoId++
	const newCompany = {cid : autoId, name, nif, quotas :[]}
	companies.push(newCompany)
	return newCompany
}

const updateCompany = async (cid, name, nif) => {
	const companyUpdated = companies.filter(company => {
		if(company.cid == cid){
			company.name = name
			company.nif = nif
			return company
		}
	})
	return companyUpdated
}

const deleteCompany = async (cid) => {
	const company = companies.filter(company => company.cid != cid)
	return company
}

const getCompaniesQuotas = async (cid) => {
	//TODO
}

const getCompanyQuotasById = async (cid) => {
	const company = companies.filter(company => company.cid == cid)[0]
	return company.quotas
}

const postCompaniesQuota = async (cid) => {
	//TODO
}

const updateCompanyQuota = async (qid, paymentDate) => {
	const quota = companies.quotas.filter(quota => {
		if(quota.qid == qid){
			quota.paymentDate = paymentDate
			return quota
		}
	})
	return quota
}

export {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompanyQuota } 