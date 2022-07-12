'use strict'

import error from '../utils/error.js'
import { mailSender } from '../utils/email/mailSender.js'
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
	
	const postEvent = async (name_, initial_date_, final_date_, groups) => {
		let allEmails = await db.getEmailByGroupIdData(groups)
		const emails = allEmails.map(row => row.email_)
		const event = await db.postEventData(name_, initial_date_, final_date_, groups)
		await mailSender(emails,`Novo Evento: ${name_}`, eventTemplate(name_, initial_date_, final_date_))
		return event
	}
	
	const updateEvent = async (id_, name_, initial_date_, final_date_) => {
		await getEventById(id_)
		return await db.updateEventData(id_, name_, initial_date_, final_date_)
	}
	
	const deleteEvent = async (id_) => {
		await getEventById(id_)
		return await db.deleteEventData(id_)
	}
	
	const updateMemberAttendance = async (eid_, id_, state_) => {
		await getEventById(eid_)
		const member = await db.getMemberByIdData(id_)
		if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_12')
		/*const attendance = await db.getEventByIdAttendanceData(eid_)
		if (!attendance.filter(att => att.member_id_ == id_)[0])
			throw error(409, 'User is not related to this Event', 'MESSAGE_CODE_27')*/
		return await db.updateMemberAttendanceData(eid_, id_, state_)
	}
	
	const getEventByIdAttendance = async (eid_, offset, limit) => {
		await getEventById(eid_)
		return await db.getEventByIdAttendanceData(eid_, offset, limit)
	}

	const getEventMemberByIdAttendance = async (id_, name_filter, state_filter,date_filter,offset,limit) => {
		const member = await db.getMemberByIdData(id_)
		if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_12')
		return await db.getEventMemberByIdAttendanceData(id_, name_filter, state_filter,date_filter,offset,limit)
	}

	return {
		getEvents, 
		getEventById, 
		postEvent,
		updateEvent, 
		deleteEvent, 
		updateMemberAttendance, 
		getEventByIdAttendance,
		getEventMemberByIdAttendance
	} 
}

export default eventData