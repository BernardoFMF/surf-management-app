'use strict'

import express from 'express'
import {getSports, getSportById, postSport, updateSport, deleteSport} from '../controllers/sportControllers.js'

const app = express.Router()

app.get('/',getSports)

app.get('/:id',getSportById)

app.post('/',postSport)

app.put('/:id',updateSport)

app.delete('/:id',deleteSport)