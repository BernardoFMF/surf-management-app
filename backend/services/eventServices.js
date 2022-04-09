'use strict'

import error from '../utils/error.js'
import eventData from '../data/eventData.js'

const eventServices = (db) => {
	const data = eventData(db)

	const getEventsServices = async() => {
		return await data.getEvents()
	}
	
	const getEventByIdServices = async(event_id) => {
		if(!event_id) throw error(400,'Parameter not found: event_id')
		return await data.getEventById(event_id)
	}
	
	const postEventServices = async(name, initial_date, final_date) => {
		if(!name) throw error(400,'Parameter not found: name')
		if(!initial_date) throw error(400,'Parameter not found: initial_date')
		if(!final_date) throw error(400,'Parameter not found: final_date')
		return await data.postEvent(name, initial_date,final_date)
	}
	
	const updateEventServices = async(event_id, name, initial_date, final_date) => {
		if(!event_id) throw error(400,'Parameter not found: event_id')
		if(!name) throw error(400,'Parameter not found: name')
		if(!initial_date) throw error(400,'Parameter not found: initial_date')
		if(!final_date) throw error(400,'Parameter not found: final_date')
		return await data.updateEvent(event_id, name, initial_date, final_date)
	}
	
	const deleteEventServices = async(event_id) => {
		if(!event_id) throw error(400,'Parameter not found: event_id')
		return await data.deleteEvent(event_id)
	}
	
	const postMemberAttendanceServices = async(event_id, id, state) => {
		if(!event_id) throw error(400,'Parameter not found: event_id')
		if(!id) throw error(400,'Parameter not found: id')
		if(!state) throw error(400,'Parameter not found: state')
		return await data.postMemberAttendance(event_id, id, state)
	}
	
	const updateMemberAttendanceServices = async(event_id, id, state) => {
		if(!event_id) throw error(400,'Parameter not found: event_id')
		if(!id) throw error(400,'Parameter not found: id')
		if(!state) throw error(400,'Parameter not found: state')
		return await data.updateMemberAttendance(event_id, id, state)
	}
	
	const getEventByIdAttendanceServices = async(event_id) => {
		if(!event_id) throw error(400,'Parameter not found: event_id')
		return await data.getEventByIdAttendance(event_id)
	}

	return { 
		getEventsServices, 
		getEventByIdServices, 
		postEventServices, 
		updateEventServices, 
		deleteEventServices, 
		updateMemberAttendanceServices,
		postMemberAttendanceServices, 
		getEventByIdAttendanceServices 
	}
}

export default eventServices
