'use strict'

import express from 'express'
import {getCandidates, getCandidateById, postCandidate, deleteCandidate, approveCandidate} from '../controllers/candidateControllers.js'

const app = express.Router()

app.get('/', getCandidates)

app.get('/:cid', getCandidateById)

app.post('/', postCandidate)

app.delete('/:cid', deleteCandidate)

app.put('/:cid', approveCandidate)

export default app