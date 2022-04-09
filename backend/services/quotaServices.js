'use strict'

import error from '../utils/error.js'
import quotaData from '../data/quotaData.js'

const quotaServices = (db) => {
	const data = quotaData(db)

	const getQuotasServices = async () => {
		return await data.getQuotas()
	}
	
	const getCompaniesQuotasServices = async () => {
		return await data.getCompaniesQuotas()
	}
	
	const getUsersQuotasServices = async () => {
		return await data.getUsersQuotas()
	}
	
	const getMemberQuotasByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id')
		return await data.getMemberQuotasById(id)
	}
	
	const postQuotaServices = async (date) => {
		if(!date) throw error(400, 'Parameter not found: date')
		return await data.postQuota(date)
	}
	
	const updateMemberQuotaServices = async (qid, paymentDate) => {
		if(!qid) throw error(400, 'Parameter not found: qid')
		if(!paymentDate) throw error(400, 'Parameter not found: paymentDate')
		return await data.updateMemberQuota(qid, paymentDate)
	}

	return {
		getQuotasServices, 
		getCompaniesQuotasServices, 
		getUsersQuotasServices, 
		getMemberQuotasByIdServices, 
		postQuotaServices, 
		updateMemberQuotaServices
	}
}

export default quotaServices