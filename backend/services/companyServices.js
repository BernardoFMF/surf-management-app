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

const postCompanyServices = async(name, nif) => {
	if(!name) throw error(400,'Parameter not found: name')
	if(!nif) throw error(400,'Parameter not found: nif')
	return await postCompany(name, nif)
}

const updateCompanyServices = async(name, nif) => {
	if(!name) throw error(400,'Parameter not found: name')
	if(!nif) throw error(400,'Parameter not found: nif')
	return await updateCompany(name, nif)
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


