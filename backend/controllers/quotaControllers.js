'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

import quotaServices from '../services/quotaServices.js'

const quotaController = (data) => {
	const services = quotaServices(data)

	const getQuotas = asyncHandler(async (req, res) => {
		const quotas = await services.getQuotasServices(req.query.username,req.query.email,req.query.date,req.query.offset,req.query.limit)
		if (quotas) res.json(quotas)
	})
	
	const getCompaniesQuotas = asyncHandler(async (req, res) => {
		const quotas = await services.getCompaniesQuotasServices()
		if (quotas) res.json(quotas)
	})
	
	const getUsersQuotas = asyncHandler(async (req, res) => {
		const quotas = await services.getUsersQuotasServices()
		if (quotas) res.json(quotas)
	})
	
	const getMemberQuotasById = asyncHandler(async (req, res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.params.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const quotas = await services.getMemberQuotasByIdServices(req.params.id,req.query.offset,req.query.limit)
		if (quotas) res.json(quotas)
	})
	
	const postQuota = asyncHandler(async (req, res) => {
		const quota = await services.postQuotaServices(req.body.date)
		if (quota) {
			res.status(201)
			res.json({ message: 'Quotas created sucessfully', message_code: 'MESSAGE_CODE_8' })
		}
	})

	const deleteQuota = asyncHandler(async (req, res) => {
		const quota = await services.deleteQuotaServices(req.body.date)
		if (quota) {
			res.status(201)
			res.json({ message: 'Quotas deleted sucessfully', message_code: 'MESSAGE_CODE_45' })
		}
	})
	
	const updateMemberQuota = asyncHandler(async (req, res) => {
		const quota = await services.updateMemberQuotaServices(req.params.id, req.body.payment_date)
		if (quota) res.json(quota)
	})

	const getManagementQuotas = asyncHandler(async (req, res) => {
		const quota = await services.getManagementQuotasServices(req.query.category)
		if (quota) res.json(quota)
	})

	const updateManagementQuotaByType = asyncHandler(async (req, res) => {
		const quota = await services.updateManagementQuotaByTypeServices(req.params.type, req.body.quota_value)
		if (quota) res.json(quota)
	})

	const postManagementQuota = asyncHandler(async (req, res) => {
		const quota = await services.postManagementQuotaServices(req.body.type, req.body.quota_value, req.body.category)
		if (quota) {
			res.status(201)
			res.json({ message: 'New quota role created sucessfully', message_code: 'MESSAGE_CODE_35' })
		}
	})

	return {
		getQuotas,
		getCompaniesQuotas,
		getUsersQuotas,
		getMemberQuotasById,
		postQuota,
		deleteQuota,
		updateMemberQuota,
		getManagementQuotas,
		updateManagementQuotaByType,
		postManagementQuota
	}
}

export default quotaController