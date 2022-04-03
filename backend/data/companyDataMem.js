'use strict'

import error from '../utils/error.js'
let companies = []
let autoId = 0
let quotaAutoId = 0

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
	const newCompany = {cid: autoId, name, nif, quotas: []}
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

const getCompaniesQuotas = async () => {
	let quotas = []
	for (let company in companies) {
		let companyQuotas = company.quotas
		quotas.push(...companyQuotas)
	}
	return quotas
}

const getCompanyQuotasById = async (cid) => {
	return companies.filter(company => company.id == cid)[0].quotas
}

const postCompaniesQuota = async (date) => {
	let created_quotas = []
	companies = companies.map(company => {
		let quotaIfExists = company.quotas.filter(quota => quota.date == date)
		if (!quotaIfExists) {
			quotaAutoId++
			const newQuota = {
				uid: company.id,
				id: quotaAutoId,
				amount: company.quota_value,
				payment_date: 'NULL',
				date
			}
			company.quotas.push(newQuota)
			created_quotas.push(newQuota)
			return company
		}
	})
	return created_quotas
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