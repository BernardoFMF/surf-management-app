'use strict'

import error from '../utils/error.js'

const eventData = (db) => {
	const getEvents = async () => {
		return db.getEventsData()
	}
	
	const getEventById = async (id_) => {
		const event = db.getEventByIdData(id_)
		if (!event) throw error(404, 'Event does not exist')
		return event
	}
	
	const postEvent = async (name_, initial_date_, final_date_) => {
		return db.postEventData(name_, initial_date_, final_date_)
	}
	
	const updateEvent = async (id_, name_, initial_date_, final_date_) => {
		await getEventById(id_)
		return db.updateEventData(id_, name_, initial_date_, final_date_)
	}
	
	const deleteEvent = async (id_) => {
		await getEventById(id_)
		return db.deleteEventData(id_)
	}
	
	const postMemberAttendance = async (eid_, id_, state_) => {
		await getEventById(eid_)
		const user = db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist')
		const attendance = db.getEventByIdAttendanceData(eid_)
		if (attendance.filter(att => att.member_id_ == id_)[0])
			throw error(409, 'User is already related to this Event')
		return db.postMemberAttendanceData(eid_, id_, state_)
	}
	
	const updateMemberAttendance = async (eid_, id_, state_) => {
		await getEventById(eid_)
		const user = db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist')
		const attendance = db.getEventByIdAttendanceData(eid_)
		console.log(attendance)
		if (!attendance.filter(att => att.member_id_ == id_)[0])
			throw error(409, 'User is not related to this Event')
		return db.updateMemberAttendanceData(eid_, id_, state_)
	}
	
	const getEventByIdAttendance = async (eid_) => {
		await getEventById(eid_)
		return db.getEventByIdAttendanceData(eid_)
	}

	return {
		getEvents, 
		getEventById, 
		postEvent,
		updateEvent, 
		deleteEvent, 
		postMemberAttendance, 
		updateMemberAttendance, 
		getEventByIdAttendance
	} 
}

export default eventData