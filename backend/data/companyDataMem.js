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

const postCompany = async (name, nif, phone_number, email, postal_code, address, location) => {
	autoId++
	const newCompany = {cid: autoId, name, nif, quotas: [], quota_value: 50, phone_number, email, postal_code, address, location}
	companies.push(newCompany)
	return newCompany
}

const updateCompany = async (cid, name, nif, phone_number, email, postal_code, address, location) => {
	const idx = companies.findIndex((obj => obj.cid == cid))
	if(idx == -1) throw error(404, 'Could not find any company with that Id')
	companies[idx].name = name
	companies[idx].nif = nif
	companies[idx].phone_number = phone_number
	companies[idx].email = email
	companies[idx].postal_code = postal_code
	companies[idx].address = address
	companies[idx].location = location
	return companies[idx]
}

const deleteCompany = async (cid) => {
	await getCompanyById(cid)
	companies = companies.filter(company => company.cid != cid)
	return companies
}

const getCompaniesQuotas = async () => {
	let quotas = []
	for (let company of companies) {
		for(let quota of company.quotas) {
			quotas.push(quota)
		}
	}
	return quotas
}

const getCompanyQuotasById = async (cid) => {
	const company = companies.filter(company => company.cid == cid)[0]
	if (!company) throw error(404, 'Company does not exist')
	return company.quotas
}

const postCompaniesQuota = async (date) => {
	let created_quotas = []
	companies = companies.map(company => {
		let quotaIfExists = company.quotas.filter(quota => quota.date == date)[0]
		if (!quotaIfExists) {
			quotaAutoId++
			const newQuota = {
				cid: company.cid,
				qid: quotaAutoId,
				amount: company.quota_value,
				payment_date: 'NULL',
				date
			}
			company.quotas.push(newQuota)
			created_quotas.push(newQuota)
		}
		return company
	})
	return created_quotas
}

const updateCompanyQuota = async (qid, paymentDate) => {
	let idx = 0
	for (let company in companies) {
		const quotaIfExists = companies[company].quotas.filter(quota => quota.qid == qid)[0]
		if(quotaIfExists) break
		idx++
	}
	const idxQ = companies[idx].quotas.findIndex((obj => obj.qid == qid))
	companies[idx].quotas[idxQ].payment_date = paymentDate
	return companies[idx].quotas[idxQ]
}

export {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompanyQuota } 