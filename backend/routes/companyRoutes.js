'use strict'

import express from 'express'
import {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompaniesQuota, updateCompanyQuota} from '../controllers/companyControllers.js'

const app = express.Router()

// quotas

app.get('/quotas', getCompaniesQuotas)

app.get('/:cid/quotas', getCompanyQuotasById)

app.post('/quotas', postCompaniesQuota)

app.put('/quotas', updateCompaniesQuota)

app.put('/quotas/:qid', updateCompanyQuota)

// companies

app.get('/', getCompanies)

app.get('/:cid', getCompanyById)

app.post('/', postCompany)

app.put('/:cid', updateCompany)

app.delete('/:cid', deleteCompany)

export default app