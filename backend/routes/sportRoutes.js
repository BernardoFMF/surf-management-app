'use strict'

import express from 'express'
import {getSports, getSportById, postSport, deleteSport} from '../controllers/sportControllers.js'

const app = express.Router()

app.get('/', getSports)

app.get('/:sid', getSportById)

app.post('/', postSport)

app.delete('/:sid', deleteSport)

export default app