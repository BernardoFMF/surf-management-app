'use strict'

import error from '../utils/error.js'
import {getEvents, getEventById, postEvent, updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance} from '../data/eventDataMem.js'

const getEventsServices = async() => {
	return await getEvents()
}

const getEventByIdServices = async(event_id) => {
	if(!event_id) throw error(400,'Parameter not found: event_id')
	return await getEventById(event_id)
}

const postEventServices = async(name, initial_date, final_date) => {
	if(!name) throw error(400,'Parameter not found: name')
	if(!initial_date) throw error(400,'Parameter not found: initial_date')
	if(!final_date) throw error(400,'Parameter not found: final_date')
	return await postEvent(name, initial_date,final_date)
}

const updateEventServices = async(name, initial_date, final_date) => {
	if(!name) throw error(400,'Parameter not found: name')
	if(!initial_date) throw error(400,'Parameter not found: initial_date')
	if(!final_date) throw error(400,'Parameter not found: final_date')
	return await updateEvent(name, initial_date, final_date)
}

const deleteEventServices = async(event_id) => {
	if(!event_id) throw error(400,'Parameter not found: event_id')
	return await deleteEvent(event_id)
}

const postMemberAttendanceServices = async(event_id, id, state) => {
	if(!event_id) throw error(400,'Parameter not found: event_id')
	if(!id) throw error(400,'Parameter not found: id')
	if(!state) throw error(400,'Parameter not found: state')
	return await postMemberAttendance(event_id, id, state)
}

const updateMemberAttendanceServices = async(event_id, id, state) => {
	if(!event_id) throw error(400,'Parameter not found: event_id')
	if(!id) throw error(400,'Parameter not found: id')
	if(!state) throw error(400,'Parameter not found: state')
	return await updateMemberAttendance(event_id, id, state)
}


export { getEventsServices, getEventByIdServices, postEventServices, updateEventServices, deleteEventServices, updateMemberAttendanceServices, postMemberAttendanceServices }

