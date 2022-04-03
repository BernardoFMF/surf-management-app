'use strict'

import express from 'express'
import {getEvents, getEventById, postEvent, updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance, getEventByIdAttendance} from '../controllers/eventControllers.js'

const app = express.Router()

app.get('/', getEvents)

app.get('/:eid', getEventById)

app.post('/', postEvent)

app.put('/:eid', updateEvent)

app.delete('/:eid', deleteEvent)

app.post('/:eid/attendance', postMemberAttendance)

app.put('/:eid/attendance', updateMemberAttendance)

app.get('/:eid/attendance', getEventByIdAttendance)

export default app