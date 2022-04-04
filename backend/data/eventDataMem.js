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
	const idx = events.findIndex((obj => obj.eid == eid))
	if(idx == undefined) throw Error(404, 'Could not find any event with that Id')
	events[idx].name = name
	events[idx].initial_date = initial_date
	events[idx].final_date = final_date
	return events[idx]
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
	const idx = attendance.findIndex((obj => obj.eid == event_id && obj.uid == id))
	if(idx == undefined) throw Error(404, 'User does not have attendance to this event')
	attendance[idx].state = state
	return attendance[idx]
}

const getEventByIdAttendance = async (event_id) => {
	return attendance.filter(attendance_tuple => attendance_tuple.eid == event_id)[0]
}

export {getEvents, getEventById, postEvent,updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance, getEventByIdAttendance} 