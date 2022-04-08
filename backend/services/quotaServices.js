'use strict'

import error from '../utils/error.js'
import {getQuotas, getCompaniesQuotas, getUserQuotas, getMemberQuotasById, postQuota, updateMemberQuota} from '../data/quotaData.js'

const getQuotasServices = async () => {
	return await getQuotas()
}

const getCompaniesQuotasServices = async () => {
	return await getCompaniesQuotas()
}

const getUserQuotasServices = async () => {
	return await getUserQuotas()
}

const getMemberQuotasByIdServices = async (id) => {
	if(!id) throw error(400, 'Parameter not found: id')
	return await getMemberQuotasById(id)
}

const postQuotaServices = async (date) => {
	if(!date) throw error(400, 'Parameter not found: date')
	return await postQuota(date)
}

const updateMemberQuotaServices = async (qid, paymentDate) => {
	if(!qid) throw error(400, 'Parameter not found: qid')
	if(!paymentDate) throw error(400, 'Parameter not found: paymentDate')
	return await updateMemberQuota(qid, paymentDate)
}

export {getQuotasServices, getCompaniesQuotasServices, getUserQuotasServices, getMemberQuotasByIdServices, postQuotaServices, updateMemberQuotaServices}