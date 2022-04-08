'use strict'

import express from 'express'
import {getQuotas, getCompaniesQuotas, getUserQuotas, getMemberQuotasById, postQuota, updateMemberQuota} from '../controllers/quotaControllers.js'

const app = express.Router()

app.get('/', getQuotas)

app.get('/companies', getCompaniesQuotas)

app.get('/users', getUserQuotas)

app.get('/:id', getMemberQuotasById)

app.post('/', postQuota)

app.put('/quotas/:qid', updateMemberQuota)