'use strict'

import error from '../utils/error.js'
import eventData from '../data/eventData.js'

const eventServices = (db) => {
	const data = eventData(db)

	const getEventsServices = async() => {
		return await data.getEvents()
	}
	
	const getEventByIdServices = async(event_id) => {
		if(!event_id) throw error(400,'Parameter not found: event_id', 'MESSAGE_CODE_14')
		return await data.getEventById(event_id)
	}
	
	const postEventServices = async(name, initial_date, final_date) => {
		if(!name) throw error(400,'Parameter not found: name', 'MESSAGE_CODE_14')
		if(!initial_date) throw error(400,'Parameter not found: initial_date', 'MESSAGE_CODE_14')
		if(!final_date) throw error(400,'Parameter not found: final_date', 'MESSAGE_CODE_14')
		return await data.postEvent(name, initial_date,final_date)
	}
	
	const updateEventServices = async(event_id, name, initial_date, final_date) => {
		if(!event_id) throw error(400,'Parameter not found: event_id', 'MESSAGE_CODE_14')
		if(!name) throw error(400,'Parameter not found: name', 'MESSAGE_CODE_14')
		if(!initial_date) throw error(400,'Parameter not found: initial_date', 'MESSAGE_CODE_14')
		if(!final_date) throw error(400,'Parameter not found: final_date', 'MESSAGE_CODE_14')
		return await data.updateEvent(event_id, name, initial_date, final_date)
	}
	
	const deleteEventServices = async(event_id) => {
		if(!event_id) throw error(400,'Parameter not found: event_id', 'MESSAGE_CODE_14')
		return await data.deleteEvent(event_id)
	}
	
	const postMemberAttendanceServices = async(event_id, id, state) => {
		if(!event_id) throw error(400,'Parameter not found: event_id', 'MESSAGE_CODE_14')
		if(!id) throw error(400,'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!state) throw error(400,'Parameter not found: state', 'MESSAGE_CODE_14')
		return await data.postMemberAttendance(event_id, id, state)
	}
	
	const updateMemberAttendanceServices = async(event_id, id, state) => {
		if(!event_id) throw error(400,'Parameter not found: event_id', 'MESSAGE_CODE_14')
		if(!id) throw error(400,'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!state) throw error(400,'Parameter not found: state', 'MESSAGE_CODE_14')
		return await data.updateMemberAttendance(event_id, id, state)
	}
	
	const getEventByIdAttendanceServices = async(event_id) => {
		if(!event_id) throw error(400,'Parameter not found: event_id', 'MESSAGE_CODE_14')
		return await data.getEventByIdAttendance(event_id)
	}

	const getEventMemberByIdAttendanceServices = async(id,name_filter,state_filter,date_filter,offset,limit) => {
		if(!id) throw error(400,'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		return await data.getEventMemberByIdAttendance(id,name_filter,state_filter,date_filter,offset,limit)
	}

	return { 
		getEventsServices, 
		getEventByIdServices, 
		postEventServices, 
		updateEventServices, 
		deleteEventServices, 
		updateMemberAttendanceServices,
		postMemberAttendanceServices, 
		getEventByIdAttendanceServices,
		getEventMemberByIdAttendanceServices
	}
}

export default eventServices
