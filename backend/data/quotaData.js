'use strict'

import error from '../utils/error.js'
import { mailSender } from '../utils/email/mailSender.js'
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

	const getQuotasByDate = async (date) => {
		return await db.getQuotasByDateData(date)
	} 

	const getQuotasByEmail = async (email) => {
		return await db.getQuotasByEmailData(email)
	} 
    
    
	const postQuota = async (date_) => {
		const hasCreated = await getQuotasByDate(date_)
		console.log(hasCreated);
		if (hasCreated.length !== 0) throw error(409, 'Quota with that date already exists', 'MESSAGE_CODE_44')
		console.log('cheguei');
		return await db.postQuotaData(date_)
	}

	const deleteQuota = async (date_) => {
		return await db.deleteQuotaData(date_)
	}
    
	const updateMemberQuota = async (qid_, payment_date_) => {
		const quota = await db.getQuotaByIdData(qid_)
		if (!quota) throw error(404, 'Quota does not exist', 'MESSAGE_CODE_29')
		return await db.updateMemberQuotaData(qid_, payment_date_)
	}

	const getManagementQuotas = async (category_) => {
		return await db.getManagementQuotas(category_)
	}

	const getManagementQuotaByType = async (type_) => {
		return await db.getManagementQuotaByType(type_)
	}

	const updateManagementQuotaByType = async (type_, quota_value_) => {
		const quota_role = await db.getManagementQuotaByType(type_)
		if (!quota_role) throw error(404, 'That type does not exist', 'MESSAGE_CODE_36')
		return await db.updateManagementQuotaByType(type_, quota_value_)
	}

	const postManagementQuota = async (type_, quota_value_, category_) => {
		return await db.postManagementQuota(type_, quota_value_, category_)
	}

	return {
		getQuotas, 
		getCompaniesQuotas, 
		getUsersQuotas,
		getMemberQuotasById, 
		postQuota, 
		deleteQuota,
		updateMemberQuota,
		getManagementQuotas,
		getManagementQuotaByType,
		updateManagementQuotaByType,
		postManagementQuota,
		getQuotasByDate,
		getQuotasByEmail
	} 
}

export default quotaData