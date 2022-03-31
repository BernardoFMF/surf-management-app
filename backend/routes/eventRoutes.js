'use strict'

import express from 'express'
import {getEvents, getEventById, postEvent, updateEvent, deleteEvent} from '../controllers/eventController.js'

const app = express.Router()

app.get('/',getEvents)

app.get('/:id',getEventById)

app.post('/',postEvent)

app.put('/:id',updateEvent)

app.delete('/:id',deleteEvent)