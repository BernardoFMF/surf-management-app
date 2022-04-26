'use strict'

import error from '../utils/error.js'
import mailSender from '../utils/email/mailSender.js'
import { quotaAlertTemplate } from  '../utils/email/mailTemplates.js'

const quotaData = (db) => {
	const getQuotas = async () => {
		return await db.getQuotasData()
	} 
    
	const getCompaniesQuotas = async () => {
		return await db.getCompaniesQuotasData()
	}
    
	const getUsersQuotas = async () => {
		return await db.getUsersQuotasData()
	} 
    
	const getMemberQuotasById = async (id_) => {
		const member = await db.getMemberByIdData(id_)
		if (!member) throw error(404, 'Member does not exist')
		return await db.getMemberQuotasByIdData(id_)
	}
    
	const postQuota = async (date_) => {
		//let allEmails = await db.getEmails()
		//await mailSender(allEmails,`Novo Evento: ${name_}`, quotaAlertTemplate(name_, initial_date_, final_date_))
		return await db.postQuotaData(date_)
	}
    
	const updateMemberQuota = async (qid_, payment_date_) => {
		const quota = await db.getQuotaByIdData(qid_)
		if (!quota) throw error(404, 'Quota does not exist')
		return await db.updateMemberQuotaData(qid_, payment_date_)
	}

	return {
		getQuotas, 
		getCompaniesQuotas, 
		getUsersQuotas,
		getMemberQuotasById, 
		postQuota, 
		updateMemberQuota
	} 
}

export default quotaData