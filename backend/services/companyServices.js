'use strict'

import error from '../utils/error.js'
import companyData from '../data/companyData.js'
import crypto from '../utils/crypto.js'

const companyServices = (db) => {
	const data = companyData(db)

	const getCompaniesServices = async() => {
		return await data.getCompanies()
	}
	
	const getCompanyByIdServices = async(id) => {
		if(!id) throw error(400,'Parameter not found: id')
		return await data.getCompanyById(id)
	}
	
	const postCompanyServices = async(name, nif, phone_number, email, postal_code, address, location, username, password) => {
		if(!name) throw error(400,'Parameter not found: name')
		if(!nif) throw error(400,'Parameter not found: nif')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number')
		if(!email) throw error(400, 'Parameter not found: email')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code')
		if(!address) throw error(400, 'Parameter not found: address')
		if(!location) throw error(400, 'Parameter not found: location')
		if(!username) throw error(400, 'Parameter not found: username')
		if(!password) throw error(400, 'Parameter not found: password')
		const pwordhashed = await crypto.hashpassword(password)
		return await data.postCompany(name, nif, phone_number, email, postal_code, address, location, username, pwordhashed)
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
		return await data.updateCompany(id, name, nif, phone_number, email, postal_code, address, location)
	}
	
	const deleteCompanyServices = async(id) => {
		if(!id) throw error(400,'Parameter not found: id')
		return await data.deleteCompany(id)
	}

	return { 
		getCompaniesServices, 
		getCompanyByIdServices, 
		postCompanyServices, 
		updateCompanyServices, 
		deleteCompanyServices 
	}
}

export default companyServices


