'use strict'

import asyncHandler from 'express-async-handler'
import error from '../utils/error.js'

import eventServices from '../services/eventServices.js'

const eventController = (data) => {
	const services = eventServices(data)

	const getEvents = asyncHandler(async (req, res) => {
		const events = await services.getEventsServices(req.query.name, req.query.initialDate, req.query.endDate, req.query.offset, req.query.limit)
		res.json(events)
	})
	
	const getEventById = asyncHandler(async (req, res) => {
		const event = await services.getEventByIdServices(req.params.eid)
		if (event) res.json(event)
	})
	
	const postEvent = asyncHandler(async (req, res) => {
		const event = await services.postEventServices(req.body.name, req.body.initial_date, req.body.final_date)
		if (event) {
			res.status(201)
			res.json(event)
		}
	})
	
	const updateEvent = asyncHandler(async (req, res) => {
		const event = await services.updateEventServices(req.params.eid, req.body.name, req.body.initial_date, req.body.final_date)
		if (event) res.json(event)
	})
	
	const deleteEvent = asyncHandler(async (req, res) => {
		const event = await services.deleteEventServices(req.params.eid)
		if (event) res.json({ message: 'Event deleted sucessfully', message_code: 'MESSAGE_CODE_7' })
	})
	
	const postMemberAttendance = asyncHandler(async (req,res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.body.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const event = await services.postMemberAttendanceServices(req.params.eid, req.body.id, req.body.state)
		if (event) {
			res.status(201)
			res.json(event)
		}
	})
	
	const updateMemberAttendance = asyncHandler(async (req,res) => {
		if(!req.user.is_admin_) {
			if(req.user.id_ != req.body.id) {
				throw error(401, 'Unauthorized', 'MESSAGE_CODE_5')
			}
		}
		const event = await services.updateMemberAttendanceServices(req.params.eid, req.body.id, req.body.state)
		if (event) res.json(event)
	})
	
	const getEventByIdAttendance = asyncHandler(async (req,res) => {
		const attendance = await services.getEventByIdAttendanceServices(req.params.eid, req.query.offset, req.query.limit)
		res.json(attendance)
	})

	const getEventMemberByIdAttendance = asyncHandler(async (req,res) => {
		const attendance = await services.getEventMemberByIdAttendanceServices(req.params.id,req.query.name,req.query.state,req.query.date,req.query.offset,req.query.limit)
		res.json(attendance)
	})

	return {
		getEvents,
		getEventById,
		postEvent,
		updateEvent,
		deleteEvent,
		postMemberAttendance,
		updateMemberAttendance,
		getEventByIdAttendance,
		getEventMemberByIdAttendance
	}
}

export default eventController