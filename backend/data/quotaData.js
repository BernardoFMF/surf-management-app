'use strict'

import error from '../utils/error.js'

const quotaData = (db) => {
	const getQuotas = async () => {
		return db.getQuotasData()
	} 
    
	const getCompaniesQuotas = async () => {
		return db.getCompaniesQuotasData()
	}
    
	const getUsersQuotas = async () => {
		return db.getUsersQuotasData()
	} 
    
	const getMemberQuotasById = async (id_) => {
		const member = db.getMemberByIdData(id_)
		if (!member) throw error(404, 'Member does not exist')
		return db.getMemberQuotasByIdData(id_)
	}
    
	const postQuota = async (date_) => {
		return db.postQuotaData(date_)
	}
    
	const updateMemberQuota = async (qid_, payment_date_) => {
		const quota = db.getMemberQuotasByIdData(qid_)
		if (!quota) throw error(404, 'Quota does not exist')
		return db.updateMemberQuotaData(qid_, payment_date_)
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