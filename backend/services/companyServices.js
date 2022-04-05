'use strict'

import error from '../utils/error.js'
import {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompanyQuota} from '../data/companyDataMem.js'

const getCompaniesServices = async() => {
	return await getCompanies()
}

const getCompanyByIdServices = async(id) => {
	if(!id) throw error(400,'Parameter not found: id')
	return await getCompanyById(id)
}

const postCompanyServices = async(name, nif, phone_number, email, postal_code, address, location) => {
	if(!name) throw error(400,'Parameter not found: name')
	if(!nif) throw error(400,'Parameter not found: nif')
	if(!phone_number) throw error(400, 'Parameter not found: phone_number')
	if(!email) throw error(400, 'Parameter not found: email')
	if(!postal_code) throw error(400, 'Parameter not found: postal_code')
	if(!address) throw error(400, 'Parameter not found: address')
	if(!location) throw error(400, 'Parameter not found: location')
	return await postCompany(name, nif)
}

const updateCompanyServices = async(id, name, nif, phone_number, email, postal_code, address, location) => {
	if(!id) throw error(400,'Parameter not found: id')
	if(!name) throw error(400,'Parameter not found: name')
	if(!nif) throw error(400,'Parameter not found: nif')
	if(!phone_number) throw error(400, 'Parameter not found: phone_number')
	if(!email) throw error(400, 'Parameter not found: email')
	if(!postal_code) throw error(400, 'Parameter not found: postal_code')
	if(!address) throw error(400, 'Parameter not found: address')
	if(!location) throw error(400, 'Parameter not found: location')
	return await updateCompany(id, name, nif, phone_number, email, postal_code, address, location)
}

const deleteCompanyServices = async(id) => {
	if(!id) throw error(400,'Parameter not found: id')
	return await deleteCompany(id)
}

const getCompaniesQuotasServices = async() => {
	return await getCompaniesQuotas()
}

const getCompanyQuotasByIdServices = async(id) => {
	if(!id) throw error(400,'Parameter not found: id')
	return await getCompanyQuotasById(id)
}

const postCompaniesQuotaServices = async(date) => {
	if(!date) throw error(400,'Parameter not found: date')
	return await postCompaniesQuota(date)
}

const updateCompanyQuotaServices = async(qid, paymentDate) => {
	if(!qid) throw error(400,'Parameter not found: qid')
	if(!paymentDate) throw error(400,'Parameter not found: paymentDate')
	return await updateCompanyQuota(qid, paymentDate)
}

export { getCompaniesServices, getCompanyByIdServices, postCompanyServices, updateCompanyServices, deleteCompanyServices, 
	getCompaniesQuotasServices, getCompanyQuotasByIdServices, postCompaniesQuotaServices, updateCompanyQuotaServices }


