'use strict'

import error from '../utils/error.js'
let events = []
let attendance = []
let autoId = 0

const getEvents = async () => {
	return events
}

const getEventById = async (eid) => {
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
	console.log(final_date)
	let retEvent
	events = events.map(event => {
		if(event.eid == eid){
			event.name = name
			event.initial_date = initial_date
			event.final_date = final_date
			retEvent = event
		}
		return event
	})
	return retEvent
}

const deleteEvent = async (eid) => {
	events = events.filter(event => event.eid != eid)
	return events
}

const postMemberAttendance = async (event_id, id, state) => {
	let event_user = {eid: event_id, uid: id, state}
	attendance.push(event_user)
	return event_user
}

const updateMemberAttendance = async (event_id, id, state) => {
	let event_user
	attendance = attendance.map(attendance_tuple => {
		if (attendance_tuple.eid == event_id && attendance_tuple.uid == id) {
			attendance_tuple.state = state
		}
		event_user = attendance_tuple
		return attendance_tuple
	})
	if (!event_user) throw error(404, 'User does not have attendance to this event')
	return event_user
}

const getEventByIdAttendance = async (event_id) => {
	return attendance.filter(attendance_tuple => attendance_tuple.eid == event_id)
}

export {getEvents, getEventById, postEvent,updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance, getEventByIdAttendance} 