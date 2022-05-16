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
		if(!id) throw error(400,'Parameter not found: id', 'MESSAGE_CODE_14')
		return await data.getCompanyById(id)
	}
	
	const postCompanyServices = async(name, nif, phone_number, email, postal_code, address, location, username, password, type, img) => {
		if(!name) throw error(400,'Parameter not found: name', 'MESSAGE_CODE_14')
		if(!nif) throw error(400,'Parameter not found: nif', 'MESSAGE_CODE_14')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number', 'MESSAGE_CODE_14')
		if(!email) throw error(400, 'Parameter not found: email', 'MESSAGE_CODE_14')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code', 'MESSAGE_CODE_14')
		if(!address) throw error(400, 'Parameter not found: address', 'MESSAGE_CODE_14')
		if(!location) throw error(400, 'Parameter not found: location', 'MESSAGE_CODE_14')
		if(!username) throw error(400, 'Parameter not found: username', 'MESSAGE_CODE_14')
		if(!password) throw error(400, 'Parameter not found: password', 'MESSAGE_CODE_14')
		
		const pwordhashed = await crypto.hashpassword(password)
		return await data.postCompany(name, nif, phone_number, email, postal_code, address, location, username, pwordhashed, type, img)
	}
	
	const updateCompanyServices = async(id, nif, name, phone_number, postal_code, address, location, img, is_deleted) => {
		if(!id) throw error(400,'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!name) throw error(400,'Parameter not found: name', 'MESSAGE_CODE_14')
		if(!nif) throw error(400,'Parameter not found: nif', 'MESSAGE_CODE_14')
		if(!phone_number) throw error(400, 'Parameter not found: phone_number', 'MESSAGE_CODE_14')
		if(!postal_code) throw error(400, 'Parameter not found: postal_code', 'MESSAGE_CODE_14')
		if(!address) throw error(400, 'Parameter not found: address', 'MESSAGE_CODE_14')
		if(!location) throw error(400, 'Parameter not found: location', 'MESSAGE_CODE_14')
		if(is_deleted == undefined) throw error(400, 'Parameter not found: is_deleted', 'MESSAGE_CODE_14')
		return await data.updateCompany(id, nif, name, phone_number, postal_code, address, location, img, is_deleted)
	}
	
	const deleteCompanyServices = async(id) => {
		if(!id) throw error(400,'Parameter not found: id', 'MESSAGE_CODE_14')
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


