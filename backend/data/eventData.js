'use strict'

import error from '../utils/error.js'
import mailSender from '../utils/email/mailSender.js'
import { eventTemplate } from  '../utils/email/mailTemplates.js'

const eventData = (db) => {
	const getEvents = async (name_filter,initialDate_filter,endDate_filter,offset,limit) => {
		return await db.getEventsData(name_filter,initialDate_filter,endDate_filter,offset,limit)
	}
	
	const getEventById = async (id_) => {
		const event = await db.getEventByIdData(id_)
		if (!event) throw error(404, 'Event does not exist', 'MESSAGE_CODE_25')
		return event
	}
	
	const postEvent = async (name_, initial_date_, final_date_) => {
		//let allEmails = await db.getEmails()
		//await mailSender(allEmails,`Novo Evento: ${name_}`, eventTemplate(name_, initial_date_, final_date_))
		return await db.postEventData(name_, initial_date_, final_date_)
	}
	
	const updateEvent = async (id_, name_, initial_date_, final_date_) => {
		await getEventById(id_)
		return await db.updateEventData(id_, name_, initial_date_, final_date_)
	}
	
	const deleteEvent = async (id_) => {
		await getEventById(id_)
		return await db.deleteEventData(id_)
	}
	
	const postMemberAttendance = async (eid_, id_, state_) => {
		const event = await getEventById(eid_)
		const user = await db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist', 'MESSAGE_CODE_12')
		const attendance = await db.getEventByIdAttendanceData(eid_)
		if (attendance.filter(att => att.member_id_ == id_)[0])
			throw error(409, 'User is already related to this Event', 'MESSAGE_CODE_26')
		return await db.postMemberAttendanceData(event.id_, id_, state_)
	}
	
	const updateMemberAttendance = async (eid_, id_, state_) => {
		await getEventById(eid_)
		const user = await db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist', 'MESSAGE_CODE_12')
		const attendance = await db.getEventByIdAttendanceData(eid_)
		if (!attendance.filter(att => att.member_id_ == id_)[0])
			throw error(409, 'User is not related to this Event', 'MESSAGE_CODE_27')
		return await db.updateMemberAttendanceData(eid_, id_, state_)
	}
	
	const getEventByIdAttendance = async (eid_, offset, limit) => {
		await getEventById(eid_)
		return await db.getEventByIdAttendanceData(eid_, offset, limit)
	}

	const getEventMemberByIdAttendance = async (id_) => {
		const user = await db.getUserByIdData(id_)
		if (!user) throw error(404, 'User does not exist', 'MESSAGE_CODE_12')
		return await db.getEventMemberByIdAttendanceData(id_)
	}

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

export default eventData