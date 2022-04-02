'use strict'

import error from '../utils/error.js'
let events = []
let autoId = 0

const getEvents = async () => {
	return events
}

const getEventsById = async (eid) => {
	const event = events.filter(event => event.eid == eid)[0]
	if (!event) throw error(404, 'Could not find any event.')
	return event
}

const postEvent = async (name, initial_date, final_date) => {
	autoId++
	const newEvent = {eid : autoId, name, initial_date, final_date}
	events.push(newEvent)
	return newEvent
}

const updateEvent = async (eid, name, initial_date, final_date) => {
	const eventUpdated = events.filter(event => {
		if(event.eid == eid){
			event.name = name
			event.initial_date = initial_date
			event.final_date = final_date
			return event
		}
	})
	return eventUpdated
}

const deleteEvent = async (eid) => {
	events = events.filter(event => event.eid != eid)
	return events
}

export {getEvents, getEventsById, postEvent,updateEvent, deleteEvent} 