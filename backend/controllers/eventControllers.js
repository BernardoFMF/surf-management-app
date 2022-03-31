'use strict'
//TODO Error Handling
import asyncHandler from 'express-async-handler'

import {getEventsServices, getEventByIdServices, postEventServices, updateEventServices, deleteEventServices} from '../services/eventsServices.js'

const getEvents = asyncHandler(async (req, res) => {
	const events = await getEventsServices()
	res.json(events)
})

const getEventById = asyncHandler(async (req, res) => {
	const event = await getEventByIdServices(req.params.id)
	if (event) res.json(event)
	else {
		res.status(404)
		throw new Error('Event not found.')
	}
})

const postEvent = asyncHandler(async (req, res) => {
	const event = await postEventServices(req.body.name, req.body.initialDate, req.body.finalDate)
	if (event) res.json(event)
	else {
		res.status()
        throw new Error('Event could not be created.')
	}
})

const updateEvent = asyncHandler(async (req, res) => {
	const events = await updateEventServices(req.body.name, req.body.initialDate, req.body.finalDate)
	if(events) res.json(events)
	else {
		res.status()
	}
})

const deleteEvent = asyncHandler(async (req, res) => {
	const event = await deleteEventServices(req.params.id)
	if(event) res.json(event)
	else {
		res.status()
        throw new Error('Event could not be deleted.')
	}
})

export {getEvents, getEventById, postEvent, updateEvent, deleteEvent}