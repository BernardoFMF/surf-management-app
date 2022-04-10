'use strict'

import error from '../utils/error.js'

const companyData = (db) => {
	const getCompanies = async () => {
		return db.getCompaniesData()
	}
	
	const getCompanyById = async (id_) => {
		const company = db.getCompanyByIdData(id_)
		if (!company) throw error(404, 'Company does not exist')
		return company
	}
	
	const postCompany = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
		return db.postCompanyData(name_, nif_, phone_number_, email_, postal_code_, address_, location_)
	}
	
	const updateCompany = async (id_, name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
		await getCompanyById(id_)
		return db.updateCompanyData(id_, name_, nif_, phone_number_, email_, postal_code_, address_, location_)
	}
	
	const deleteCompany = async (id_) => {
		await getCompanyById(id_)
		return db.deleteCompanyData(id_)
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