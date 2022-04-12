'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import eventController from '../controllers/eventControllers.js'


const eventRoutes = (data) => {
	const app = express.Router()

	const controller = eventController(data)

	app.get('/', authentication.authMember, controller.getEvents)
    
	app.get('/:eid', authentication.authMember, controller.getEventById)
    
	app.post('/', authentication.authAdmin, controller.postEvent)
    
	app.put('/:eid', authentication.authAdmin, controller.updateEvent)
    
	app.delete('/:eid', authentication.authAdmin, controller.deleteEvent)
    
	app.post('/:eid/attendance', authentication.authMember, controller.postMemberAttendance)
    
	app.put('/:eid/attendance', authentication.authMember, controller.updateMemberAttendance)
    
	app.get('/:eid/attendance', authentication.authMember, controller.getEventByIdAttendance)

	return app
}

export default eventRoutes