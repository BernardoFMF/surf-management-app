'use strict'

import express from 'express'
import {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany} from '../controllers/companyControllers.js'

const app = express.Router()

// companies

app.get('/', getCompanies)

app.get('/:cid', getCompanyById)

app.post('/', postCompany)

app.put('/:cid', updateCompany)

app.delete('/:cid', deleteCompany)

export default app