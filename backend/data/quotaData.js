'use strict'

import error from '../utils/error.js'
import mailSender from '../utils/email/mailSender.js'
import { quotaAlertTemplate } from  '../utils/email/mailTemplates.js'

const quotaData = (db) => {
	const getQuotas = async (username_filter, email_filter,date_filter,offset,limit) => {
		return await db.getQuotasData(username_filter, email_filter,date_filter,offset,limit)
	} 
    
	const getCompaniesQuotas = async () => {
		return await db.getCompaniesQuotasData()
	}
    
	const getUsersQuotas = async () => {
		return await db.getUsersQuotasData()
	} 
    
	const getMemberQuotasById = async (id_,offset, limit) => {
		const member = await db.getMemberByIdData(id_)
		if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_28')
		return await db.getMemberQuotasByIdData(id_,offset,limit)
	}
    
	const postQuota = async (date_) => {
		//let allEmails = await db.getEmails()
		//await mailSender(allEmails,`Novo Evento: ${name_}`, quotaAlertTemplate(name_, initial_date_, final_date_))
		return await db.postQuotaData(date_)
	}
    
	const updateMemberQuota = async (qid_, payment_date_) => {
		const quota = await db.getQuotaByIdData(qid_)
		if (!quota) throw error(404, 'Quota does not exist', 'MESSAGE_CODE_29')
		return await db.updateMemberQuotaData(qid_, payment_date_)
	}

	const getManagementQuotas = async () => {
		return await db.getManagementQuotas()
	}

	const getManagementQuotaByType = async (type_) => {
		return await db.getManagementQuotaByType(type_)
	}

	const updateManagementQuotaByType = async (type_, quota_value_) => {
		const quota_role = await db.getManagementQuotaByType(type_)
		if (!quota_role) throw error(404, 'That type does not exist', 'MESSAGE_CODE_36')
		return await db.updateManagementQuotaByType(type_, quota_value_)
	}

	const postManagementQuota = async (type_, quota_value_) => {
		return await db.postManagementQuota(type_, quota_value_)
	}

	return {
		getQuotas, 
		getCompaniesQuotas, 
		getUsersQuotas,
		getMemberQuotasById, 
		postQuota, 
		updateMemberQuota,
		getManagementQuotas,
		getManagementQuotaByType,
		updateManagementQuotaByType,
		postManagementQuota
	} 
}

export default quotaData