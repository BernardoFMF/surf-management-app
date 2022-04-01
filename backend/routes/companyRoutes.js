'use strict'

import express from 'express'
import {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompanyQuota} from '../controllers/companyControllers.js'

const app = express.Router()

app.get('/', getCompanies)

app.get('/:id', getCompanyById)

app.post('/', postCompany)

app.put('/:id', updateCompany)

app.delete('/:id', deleteCompany)

// quotas

app.get('/quotas', getCompaniesQuotas)

app.get('/:id/quotas', getCompanyQuotasById)

app.post('/quotas', postCompaniesQuota)

app.put('/quotas/:qid', updateCompanyQuota)

export default app