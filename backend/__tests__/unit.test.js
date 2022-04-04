'use strict'

import {getSports, getSportById, postSport, deleteSport} from '../data/sportDataMem.js'
import {getEvents, getEventById, postEvent, updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance, getEventByIdAttendance} from '../data/eventDataMem.js'

async function insertSportDummies() {
	await postSport('Surf')
	await postSport('Bodyboard')
}

async function insertEventDummies() {
	await postEvent('Assembleia geral.', '15-04-2022', '16-04-2022')
	await postEvent('Entrega de prémios.', '12-06-2022', '12-06-2022')
}

beforeAll( async () => { 
	await insertSportDummies()
	return await insertEventDummies()
})

//Sports

test('Get all sports', async () => {
	expect.assertions(2)
	const sports = await getSports()
	expect(sports[0].name).toBe('Surf')
	expect(sports[1].name).toBe('Bodyboard')
})

test('Get specific sport', async () => {
	expect.assertions(1)
	const sport = await getSportById(1)
	expect(sport.name).toBe('Surf')
})

test('Delete specific sport', async () => {
	expect.assertions(1)
	const sports = await deleteSport(1)
	expect(sports.length).toBe(1)
})

test('Create a sport', async () => {
	expect.assertions(1)
	const sport = await postSport('Skimboarding')
	expect(sport.name).toBe('Skimboarding')
})

//Events

test('Get all events', async () => {
	expect.assertions(2)
	const events = await getEvents()
	console.log(events)
	expect(events[0].name).toBe('Assembleia geral.')
	expect(events[1].name).toBe('Entrega de prémios.')
})

test('Get specific event', async () => {
	expect.assertions(1)
	const event = await getEventById(1)
	expect(event.name).toBe('Assembleia geral.')
})

test('Delete specific event', async () => {
	expect.assertions(1)
	const events = await deleteEvent(2)
	expect(events.length).toBe(1)
})

test('Create a event', async () => {
	expect.assertions(1)
	const event = await postEvent('Entrega de troféus.', '12-07-2022', '12-07-2022')
	expect(event.name).toBe('Entrega de troféus.')
})

test('Update a event', async () => {
	expect.assertions(1)
	const event = await updateEvent(1, 'Assembleia geral.', '12-11-2022', '12-07-2022')
	expect(event.initial_date).toBe('12-11-2022')
})

//Attendance

test('Create a attendance', async () => {
	expect.assertions(1)
	const attendance = await postMemberAttendance(1, 1, 'going')
	expect(attendance.state).toBe('going')
})

test('Get specific attendance', async () => {
	expect.assertions(1)
	const attendance = await getEventByIdAttendance(1)
	expect(attendance.state).toBe('going')
})

test('Update specific attendance', async () => {
	expect.assertions(1)
	const attendance = await updateMemberAttendance(1, 1, 'not going')
	expect(attendance.state).toBe('not going')
})
	
