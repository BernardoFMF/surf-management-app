'use strict'

import asyncHandler from 'express-async-handler'

import {getQuotasServices, getCompaniesQuotasServices, getUserQuotasServices, getMemberQuotasByIdServices, postQuotaServices, updateMemberQuotaServices} from '../services/quotaServices.js'

const getQuotas = asyncHandler(async (req, res) => {
	const quotas = await getQuotasServices()
	if (quotas) res.json(quotas)
})

const getCompaniesQuotas = asyncHandler(async (req, res) => {
	const quotas = await getCompaniesQuotasServices()
	if (quotas) res.json(quotas)
})

const getUserQuotas = asyncHandler(async (req, res) => {
	const quotas = await getUserQuotasServices()
	if (quotas) res.json(quotas)
})

const getMemberQuotasById = asyncHandler(async (req, res) => {
	const quotas = await getMemberQuotasByIdServices(req.params.id)
	if (quotas) res.json(quotas)
})

const postQuota = asyncHandler(async (req, res) => {
	const quota = await postQuotaServices(req.body.date)
	if (quota) {
		res.status(201)
		res.json({ message: 'Quotas created sucessfully' })
	}
})

const updateMemberQuota = asyncHandler(async (req, res) => {
	const quota = await updateMemberQuotaServices(req.params.qid, req.body.payment_date)
	if (quota) res.json(quota)
})

export {getQuotas, getCompaniesQuotas, getUserQuotas, getMemberQuotasById, postQuota, updateMemberQuota}