'use strict'

import {getSports, getSportById, postSport, deleteSport} from '../data/sportDataMem.js'
import {getEvents, getEventById, postEvent, updateEvent, deleteEvent, postMemberAttendance, updateMemberAttendance, getEventByIdAttendance} from '../data/eventDataMem.js'
import {getCandidates, getCandidateById, postCandidate, deleteCandidate, approveCandidate} from '../data/candidateDataMem.js'
import {getCompanies, getCompanyById, postCompany, updateCompany, deleteCompany, getCompaniesQuotas, getCompanyQuotasById, postCompaniesQuota, updateCompanyQuota } from '../data/companyDataMem'

async function insertSportDummies() {
	await postSport('Surf')
	await postSport('Bodyboard')
}

async function insertEventDummies() {
	await postEvent('Assembleia geral.', '15-04-2022', '16-04-2022')
	await postEvent('Entrega de prémios.', '12-06-2022', '12-06-2022')
}

async function insertCandidateDummies() {
	await postCandidate(74389323248, 342893489348, 'effective', '12-06-1990', 'Angolana', 'Jobileu Santos', 932727288, 'jobi@clix.pt', '2830-829', 'Rua da bobadela', 'Bobadela', 'barbie2')
	await postCandidate(34898942908, 109381908487, 'effective', '15-03-1990', 'Portuguesa', 'Carlitos Roger', 927182837, 'carliti@hotmail.com', '2423-829', 'Rua da banheira', 'Baixa da Banheira', 'duche2' )
}

async function insertCompanyDummies() {
	await postCompany('Ericeira surf shop', 231312312312, 938172388, 'ess@gmail.com', '2812-829', 'Rua da ericeira', 'Ericeira')
	await postCompany('Billabong', 42321331231, 932323238, 'billybonga@gmail.com', '2220-829', 'Rua da billa', 'Billacity')
}

beforeAll( async () => { 
	await insertSportDummies()
	await insertCandidateDummies()
	await insertCompanyDummies()
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

//Candidate

test('Get all candidates', async () => {
	expect.assertions(2)
	const candidates = await getCandidates()
	expect(candidates[0].nationality).toBe('Angolana')
	expect(candidates[1].nationality).toBe('Portuguesa')
})

test('Get specific candidate', async () => {
	expect.assertions(1)
	const candidate = await getCandidateById(1)
	expect(candidate.nationality).toBe('Angolana')
})

test('Create a candidate', async () => {
	expect.assertions(1)
	const candidate = await postCandidate(6723355243, 123213213123, 'effective', '21-06-1990', 'Portuguesa', 'João Santos', 932333288, 'joao@clix.pt', '2830-829', 'Rua da bobadela', 'Bobadela', 'barbi')
	expect(candidate.nationality).toBe('Portuguesa')
})

test('Delete specific candidate', async () => {
	expect.assertions(1)
	const candidates = await deleteCandidate(2)
	expect(candidates.length).toBe(2)
})

test('Approve a candidate', async () => {
	expect.assertions(1)
	const candidates = await approveCandidate(1)
	expect(candidates.length).toBe(1)
})

//Company

test('Get all companies', async () => {
	expect.assertions(2)
	const companies = await getCompanies()
	expect(companies[0].name).toBe('Ericeira surf shop')
	expect(companies[1].name).toBe('Billabong')
})

test('Get specific company', async () => {
	expect.assertions(1)
	const company = await getCompanyById(1)
	expect(company.name).toBe('Ericeira surf shop')
})

test('Create a company', async () => {
	expect.assertions(1)
	const company = await postCompany('Ripcurl', 2313123216812, 967872388, 'rippy@gmail.com', '2112-829', 'Rua do rip', 'Rip on the curls')
	expect(company.name).toBe('Ripcurl')
})

test('Update a company', async () => {
	expect.assertions(1)
	const company = await updateCompany(1, 'Ericeira surf shop', 231312312312, 918923180, 'ess@gmail.com', '2812-829', 'Rua da ericeira', 'Ericeira')
	expect(company.phone_number).toBe(918923180)
})

test('Delete specific company', async () => {
	expect.assertions(1)
	const companies = await deleteCompany(3)
	expect(companies.length).toBe(2)
})

//Company quotas

test('Create a company quota', async () => {
	expect.assertions(1)
	const quotas = await postCompaniesQuota('01-01-2022')
	expect(quotas.length).toBe(2)
})

test('Get all companies quotas', async () => {
	expect.assertions(1)
	const quotas = await getCompaniesQuotas()
	expect(quotas.length).toBe(2)
})	

test('Get specific company quota', async () => {
	expect.assertions(1)
	const quotas = await getCompanyQuotasById(1)
	expect(quotas.length).toBe(1)
})

test('Update a company quota', async () => {
	expect.assertions(1)
	const quota = await updateCompanyQuota(1, '02-03-2022')
	expect(quota.payment_date).toBe('02-03-2022')
})