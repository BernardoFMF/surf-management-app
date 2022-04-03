'use strict'

import asyncHandler from 'express-async-handler'

import {getEventsServices, getEventByIdServices, postEventServices, updateEventServices, deleteEventServices, updateMemberAttendanceServices, postMemberAttendanceServices, getEventByIdAttendanceServices} from '../services/eventServices.js'

const getEvents = asyncHandler(async (req, res) => {
	const events = await getEventsServices()
	res.json(events)
})

const getEventById = asyncHandler(async (req, res) => {
	const event = await getEventByIdServices(req.params.eid)
	if (event) res.json(event)
})

const postEvent = asyncHandler(async (req, res) => {
	const event = await postEventServices(req.body.name, req.body.initial_date, req.body.final_date)
	if (event) {
		res.status(201)
		res.json(event)
	}
})

const updateEvent = asyncHandler(async (req, res) => {
	const event = await updateEventServices(req.params.eid, req.body.name, req.body.initial_date, req.body.final_date)
	if (event) res.json(event)
})

const deleteEvent = asyncHandler(async (req, res) => {
	const event = await deleteEventServices(req.params.eid)
	if (event) res.json({ message: 'Event deleted sucessfully' })
})

const postMemberAttendance = asyncHandler(async (req,res) => {
	const event = await postMemberAttendanceServices(req.params.eid, req.body.id, req.body.state)
	if (event) {
		res.status(201)
		res.json(event)
	}
})

const updateMemberAttendance = asyncHandler(async (req,res) => {
	const event = await updateMemberAttendanceServices(req.params.eid, req.body.id, req.body.state)
	if (event) res.json(event)
})

const getEventByIdAttendance = asyncHandler(async (req,res) => {
	const attendance = await getEventByIdAttendanceServices(req.params.eid)
	res.json(attendance)
})

export {getEvents, getEventById, postEvent, updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance, getEventByIdAttendance}