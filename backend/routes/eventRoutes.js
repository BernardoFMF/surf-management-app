'use strict'

import express from 'express'
import {getEvents, getEventById, postEvent, updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance} from '../controllers/eventControllers.js'

const app = express.Router()

app.get('/', getEvents)

app.get('/:eid', getEventById)

app.post('/', postEvent)

app.put('/:eid', updateEvent)

app.delete('/:eid', deleteEvent)

app.post('/:eid', postMemberAttendance)

app.put('/:eid', updateMemberAttendance)

export default app