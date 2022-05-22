'use strict'

import error from '../utils/error.js'
import quotaData from '../data/quotaData.js'

const quotaServices = (db) => {
	const data = quotaData(db)

	const getQuotasServices = async (username_filter,email_filter,date_filter,offset,limit) => {
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		return await data.getQuotas(username_filter,email_filter,date_filter,offset,limit)
	}
	
	const getCompaniesQuotasServices = async () => {
		return await data.getCompaniesQuotas()
	}
	
	const getUsersQuotasServices = async () => {
		return await data.getUsersQuotas()
	}
	
	const getMemberQuotasByIdServices = async (id,offset,limit) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		return await data.getMemberQuotasById(id,offset,limit)
	}
	
	const postQuotaServices = async (date) => {
		if(!date) throw error(400, 'Parameter not found: date', 'MESSAGE_CODE_14')
		return await data.postQuota(date)
	}
	
	const updateMemberQuotaServices = async (qid, paymentDate) => {
		if(!qid) throw error(400, 'Parameter not found: qid', 'MESSAGE_CODE_14')
		if(!paymentDate) throw error(400, 'Parameter not found: paymentDate', 'MESSAGE_CODE_14')
		return await data.updateMemberQuota(qid, paymentDate)
	}

	const getManagementQuotasServices = async () => {
		return await data.getManagementQuotas()
	}

	const updateManagementQuotaByTypeServices = async (type, quota_value) => {
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!quota_value) throw error(400, 'Parameter not found: quota_value', 'MESSAGE_CODE_14')

		return await data.updateManagementQuotaByType(type, quota_value)
	}

	const postManagementQuotaServices = async (type, quota_value) => {
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		if(!quota_value) throw error(400, 'Parameter not found: quota_value', 'MESSAGE_CODE_14')

		return await data.postManagementQuota(type, quota_value)
	}

	return {
		getQuotasServices, 
		getCompaniesQuotasServices, 
		getUsersQuotasServices, 
		getMemberQuotasByIdServices, 
		postQuotaServices, 
		updateMemberQuotaServices,
		getManagementQuotasServices,
		updateManagementQuotaByTypeServices,
		postManagementQuotaServices
	}
}

export default quotaServices