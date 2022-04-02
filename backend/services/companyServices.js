'use strict'

import {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompanyQuota} from '../data/companyData.js'

const getCompaniesServices = async() => {
    return await db.getCompanies()
}

const getCompanyByIdServices = async(id) => {
    if(!id) throw error(400,'Parameter not found: id')
    return await db.getCompanyById(id)
}

const postCompanyServices = async(name, nif) => {
    if(!name) throw error(400,'Parameter not found: name')
    if(!nif) throw error(400,'Parameter not found: nif')
    return await db.getCompanyById(name, nif)
}

const updateCompanyServices = async(name, nif) => {
    if(!name) throw error(400,'Parameter not found: name')
    if(!nif) throw error(400,'Parameter not found: nif')
    return await db.updateCompany(name, nif)
}

const deleteCompanyServices = async(id) => {
    if(!id) throw error(400,'Parameter not found: id')
    return await db.deleteCompany(id)
}

const getCompaniesQuotasServices = async() => {
    return await db.getCompaniesQuotas()
}

const getCompanyQuotasByIdServices = async(id) => {
    if(!id) throw error(400,'Parameter not found: id')
    return await db.getCompanyQuotasById(id)
}

const postCompaniesQuotaServices = async(date) => {
    if(!date) throw error(400,'Parameter not found: date')
    return await db.postCompaniesQuota(id)
}

const updateCompanyQuotaServices = async(qid, paymentDate) => {
    if(!qid) throw error(400,'Parameter not found: qid')
    if(!paymentDate) throw error(400,'Parameter not found: paymentDate')
    return await db.updateCompanyQuota(qid, paymentDate)
}

export { getCompaniesServices, getCompanyByIdServices, postCompanyServices, updateCompanyServices, deleteCompanyServices, 
	getCompaniesQuotasServices, getCompanyQuotasByIdServices, postCompaniesQuotaServices, updateCompanyQuotaServices }


