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

export {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany} 