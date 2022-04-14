'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

import quotaServices from '../services/quotaServices.js'

const quotaController = (data) => {
	const services = quotaServices(data)

	const getQuotas = asyncHandler(async (req, res) => {
		const quotas = await services.getQuotasServices()
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
				throw error(401, 'Unauthorized')
			}
		}
		const quotas = await services.getMemberQuotasByIdServices(req.params.id)
		if (quotas) res.json(quotas)
	})
	
	const postQuota = asyncHandler(async (req, res) => {
		const quota = await services.postQuotaServices(req.body.date)
		if (quota) {
			res.status(201)
			res.json({ message: 'Quotas created sucessfully' })
		}
	})
	
	const updateMemberQuota = asyncHandler(async (req, res) => {
		const quota = await services.updateMemberQuotaServices(req.params.id, req.body.payment_date)
		if (quota) res.json(quota)
	})

	return {
		getQuotas,
		getCompaniesQuotas,
		getUsersQuotas,
		getMemberQuotasById,
		postQuota,
		updateMemberQuota
	}
}

export default quotaController