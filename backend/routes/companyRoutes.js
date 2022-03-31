'use strict'

import express from 'express'
import {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, 
	getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompaniesQuota, updateCompanyQuota,
	postCompanyEvent, updateCompanyEventById} from '../controllers/userControllers.js'

const app = express.Router()


app.get('/',)

app.get('/:id',)

app.post('/',)

app.put('/:id',)

app.delete('/:id',)

// quotas

app.get('/quotas',)

app.get('/:id/quotas',)

app.post('/quotas',)

app.put('/quotas/:qid/',)

app.put('/:id/quotas/:qid',)

// events

app.post('/:id/events',)

app.put('/:id/events/:eid',)