'use strict'

import error from '../utils/error.js'

const companyData = (db) => {
	const getCompanies = async () => {
		return await db.getCompaniesData()
	}
	
	const getCompanyById = async (id_) => {
		const company = await db.getCompanyByIdData(id_)
		if (!company) throw error(404, 'Company does not exist', 'MESSAGE_CODE_24')
		return company
	}
	
	const postCompany = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, password_) => {
		let member = await db.getMemberByUsernameData(username_)
		if (member) throw error(409, 'Member with that username already exists', 'MESSAGE_CODE_20')
		member = await db.getMemberByNifData(nif_)
		if (member) throw error(409, 'Member with that nif already exists', 'MESSAGE_CODE_22')
		member = await db.getMemberByEmailData(email_)
		if (member) throw error(409, 'Member with that email already exists', 'MESSAGE_CODE_23')
		return await db.postCompanyData(name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, password_)
	}
	
	const updateCompany = async (id_, name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, password_) => {
		await getCompanyById(id_)
		return await db.updateCompanyData(id_, name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, password_)
	}
	
	const deleteCompany = async (id_) => {
		await getCompanyById(id_)
		return await db.deleteCompanyData(id_)
	}

	return {
		getCompanies,
		getCompanyById, 
		postCompany, 
		updateCompany, 
		deleteCompany
	} 
}

export default companyData