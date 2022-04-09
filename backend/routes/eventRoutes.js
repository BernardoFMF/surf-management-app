'use strict'

import express from 'express'

import eventController from '../controllers/eventControllers.js'


const eventRoutes = (data) => {
	const app = express.Router()

	const controller = eventController(data)

	app.get('/', controller.getEvents)
    
	app.get('/:eid', controller.getEventById)
    
	app.post('/', controller.postEvent)
    
	app.put('/:eid', controller.updateEvent)
    
	app.delete('/:eid', controller.deleteEvent)
    
	app.post('/:eid/attendance', controller.postMemberAttendance)
    
	app.put('/:eid/attendance', controller.updateMemberAttendance)
    
	app.get('/:eid/attendance', controller.getEventByIdAttendance)

	return app
}

export default eventRoutes