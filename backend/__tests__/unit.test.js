'use strict'

/*
const db = require('../data/__mock__/mock')

const dbSport = require('../data/sportData')
const dbEvent = require('../data/eventData')
const dbCandidate = require('../data/candidateData')
const dbCompany = require('../data/companyData')
const dbUser = require('../data/userData')
const dbQuota = require('../data/quotaData')
*/

import db from '../data/__mock__/mockDataAccess.js'

import sport from '../data/sportData.js'
import event from '../data/eventData.js'
import candidate from '../data/candidateData.js'
import company from '../data/companyData.js'
import user from '../data/userData.js'
import quota from '../data/quotaData.js'

const dbSport = sport(db)
const dbEvent = event(db)
const dbCandidate = candidate(db)
const dbCompany = company(db)
const dbUser = user(db)
const dbQuota = quota(db)


async function insertSportDummies() {
	await dbSport.postSport('Surf')
	await dbSport.postSport('Bodyboard')
	await dbSport.postSport('Skysurf')
	await dbSport.postSport('Windsurf')
}

async function insertEventDummies() {
	await dbEvent.postEvent('Assembleia geral.', '15-04-2022', '16-04-2022')
	await dbEvent.postEvent('Entrega de prémios.', '12-06-2022', '12-06-2022')
}

async function insertCandidateDummies() {
	await dbCandidate.postCandidate('jobileu', 74389323248, 342893489348, 'effective','Angolana', '12-06-1990', 'Jobileu Santos', 932727288, 'jobi@clix.pt', '2830-829', 'Rua da bobadela', 'Bobadela', 'barbie2', 'Male')
	await dbCandidate.postCandidate('carlao', 34898942908, 109381908487, 'effective','Portuguesa', '15-03-1990','Carlitos Roger', 927182837, 'carliti@hotmail.com', '2423-829', 'Rua da banheira', 'Baixa da Banheira', 'duche2', 'Male' )
}

async function insertCompanyDummies() {
	await dbCompany.postCompany('Ericeira surf shop', 231312312312, 938172388, 'ess@gmail.com', '2812-829', 'Rua da ericeira', 'Ericeira')
	await dbCompany.postCompany('Billabong', 42321331231, 932323238, 'billybonga@gmail.com', '2220-829', 'Rua da billa', 'Billacity')
}

async function insertUserDummies() {
	await dbUser.postUser(383128318, 764271741145, 'founder', 0, '09-03-1987', 'Iraniano', 'Mohamed Jahal Bali horad', 967022559, 'mohamedlgh@gmail.com', '3010-078', 'Rua D.José Martins', 'Lisboa','lisboa2020', 'mohamed87', true, 'Male')
	await dbUser.postUser(383123818, 763371741145, 'effective', 15,  '27-10-1993', 'Portuguesa', 'Luis Marquez', 967022783, 'luismarquez@gmail.com', '2080-478', 'Rua da Estrela', 'Lisboa','mariabeatriz', 'luizinho23', true, 'Male')
}

async function insertSportsforUsersDummies() {
	await dbUser.postUserSport(1, 2, 54, 1890547, 'Fereracao de Surf', ['coach'], [2017,2018,2019,2020,2021])
	await dbUser.postUserSport(2, 1, 54, 1890548, 'Federacao de Surf', ['practitioner'], [2018])
	await dbUser.postUserSport(1, 3, 55, 1895731, 'Fereracao de SkySurf', ['practitioner'], [2021])
	await dbUser.postUserSport(2, 3, 55, 1890780, 'Federacao de SkySurf', ['practitioner'], [2022])
}

async function insertAttendanceDummies() {
	await dbEvent.postMemberAttendance(1,2,'going')
}


beforeAll( async () => { 
	await insertSportDummies()
	await insertCandidateDummies()
	await insertUserDummies()
	await insertCompanyDummies()
	await insertEventDummies()
	await insertSportsforUsersDummies()
	return await insertAttendanceDummies()
})

//Sports

test('Get all sports', async () => {
	expect.assertions(2)
	const sports = await dbSport.getSports()
	expect(sports[0].name_).toBe('Surf')
	expect(sports[1].name_).toBe('Bodyboard')
})

test('Get specific sport', async () => {
	expect.assertions(1)
	const sport = await dbSport.getSportById(1)
	expect(sport.name_).toBe('Surf')
})

test('Delete specific sport', async () => {
	expect.assertions(1)
	const sports = await dbSport.deleteSport(1)
	expect(sports.length).toBe(3)
})

test('Create a sport', async () => {
	expect.assertions(1)
	const sport_id = await dbSport.postSport('Skimboarding')
	expect(sport_id).toBe(5)
})

//Events

test('Get all events', async () => {
	expect.assertions(2)
	const events = await dbEvent.getEvents()
	expect(events[0].name_).toBe('Assembleia geral.')
	expect(events[1].name_).toBe('Entrega de prémios.')
})

test('Get specific event', async () => {
	expect.assertions(1)
	const event = await dbEvent.getEventById(1)
	expect(event.name_).toBe('Assembleia geral.')
})

test('Delete specific event', async () => {
	expect.assertions(1)
	const events = await dbEvent.deleteEvent(2)
	expect(events.length).toBe(1)
})

test('Create a event', async () => {
	expect.assertions(1)
	const event = await dbEvent.postEvent('Entrega de troféus.', '12-07-2022', '12-07-2022')
	expect(event.name_).toBe('Entrega de troféus.')
})

test('Update a event', async () => {
	expect.assertions(1)
	const event = await dbEvent.updateEvent(1, 'Assembleia geral.', '12-11-2022', '12-07-2022')
	expect(event.initial_date_).toBe('12-11-2022')
})

//Attendance

test('Create a attendance', async () => {
	expect.assertions(1)
	const attendance = await dbEvent.postMemberAttendance(1,1,'going')
	expect(attendance.state_).toBe('going')
	
})

test('Get specific attendance', async () => {
	expect.assertions(1)
	const attendance = await dbEvent.getEventByIdAttendance(1)
	expect(attendance[0].state_).toBe('going')
})

test('Update specific attendance', async () => {
	expect.assertions(1)
	const attendance = await dbEvent.updateMemberAttendance(1, 1, 'not going')
	expect(attendance.state_).toBe('not going')
})


//Candidate

test('Get all candidates', async () => {
	expect.assertions(2)
	const candidates = await dbCandidate.getCandidates()
	expect(candidates[0].nationality_).toBe('Angolana')
	expect(candidates[1].nationality_).toBe('Portuguesa')
})

test('Get specific candidate', async () => {
	expect.assertions(1)
	const candidate = await dbCandidate.getCandidateById(1)
	expect(candidate.nationality_).toBe('Angolana')
})

test('Create a candidate', async () => {
	expect.assertions(1)
	const candidate = await dbCandidate.postCandidate(6723355243, 123213213123, 'effective', '21-06-1990', 'Portuguesa', 'João Santos', 932333288, 'joao@clix.pt', '2830-829', 'Rua da bobadela', 'Bobadela', 'barbi', 'Other')
	expect(candidate.nationality_).toBe('Portuguesa')
})

test('Delete specific candidate', async () => {
	expect.assertions(1)
	const candidates = await dbCandidate.deleteCandidate(2)
	expect(candidates.length).toBe(2)
})

test('Approve a candidate', async () => {
	expect.assertions(1)
	const candidates = await dbCandidate.approveCandidate(1)
	expect(candidates).toBe(5)
})

//Company

test('Get all companies', async () => {
	expect.assertions(2)
	const companies = await dbCompany.getCompanies()
	expect(companies[0].name_).toBe('Ericeira surf shop')
	expect(companies[1].name_).toBe('Billabong')
})

test('Get specific company', async () => {
	expect.assertions(1)
	const company = await dbCompany.getCompanyById(3)
	expect(company.name_).toBe('Ericeira surf shop')
})

test('Create a company', async () => {
	expect.assertions(1)
	const company_id = await dbCompany.postCompany('Ripcurl', 2313123216812, 967872388, 'rippy@gmail.com', '2112-829', 'Rua do rip', 'Rip on the curls')
	expect(company_id).toBe(6)
})

test('Update a company', async () => {
	expect.assertions(1)
	const company_id = await dbCompany.updateCompany(3, 'Ericeira surf shop', 231312312312, 918923180, 'ess@gmail.com', '2812-829', 'Rua da ericeira', 'Ericeira')
	expect(company_id).toBe(3)
})

test('Delete specific company', async () => {
	expect.assertions(1)
	const companies = await dbCompany.deleteCompany(3)
	expect(companies.length).toBe(3)
})

//Quotas

test('Create a quota', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.postQuota('01-01-2022')
	expect(quotas).toBe(7)
})

test('Get all companies quotas', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getCompaniesQuotas()
	expect(quotas.length).toBe(2)
})	

test('Get specific company quota', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getMemberQuotasById(6)
	expect(quotas.date_).toBe('01-01-2022')
})

test('Update a company quota', async () => {
	expect.assertions(1)
	const quota = await dbQuota.updateMemberQuota(6, '02-03-2022')
	expect(quota.payment_date_).toBe('02-03-2022')
})

//User

test('Get all users', async () => {
	expect.assertions(1)
	const users = await dbUser.getUsers()
	expect(users.length).toBe(4)
})

test('Get a specific user', async () => {
	expect.assertions(1)
	const user = await dbUser.getUserById(1)
	expect(user.birth_date_).toBe('09-03-1987')
})

test('Post User', async () => {
	expect.assertions(1)
	const user = await dbUser.postUser(383123909, 763399841145, 'effective', '03-10-1983', 'Senegales', 'Moussa Marega', 934077623, 'maregagrandefixe@outlook.com', '2835-081', 'Rua D.Batista', 'Lisboa','gandagolo', 'Male')
	expect(user).toBe(7)
})

test('Update a user', async () => {
	expect.assertions(1)
	const user_id = await dbUser.updateUser(1,383123818, 763371741145, 'effective',15, '27-10-1993', 'Portuguesa', 'Luis Marques', 967022783, 'luismarquez@gmail.com', '2080-478', 'Rua da Estrela', 'Lisboa','C1EBBEE46D8C6128B95FEB21C187C2ED2EDDE97994A9A2BAC822F78B71789F29','mariabeatriz','/xB33FDEAF','imagem.png',true,false, 'Other')
	expect(user_id).toBe(1)
})

test('Delete user', async () => {
	expect.assertions(1)
	const users = await dbUser.deleteUser(1)
	expect(users.length).toBe(5)
})

//User Sports

test('Get all sports for users', async () => {
	expect.assertions(1)
	const userSports = await dbUser.getUsersSports()
	expect(userSports.length).toBe(1) 
})

test('Get users that practice a given sport ', async () => {
	expect.assertions(1)
	const users = await dbUser.getUsersSport(2)
	expect(users.length).toBe(0) 
})	

test('Get sports that a given user practice', async () => {
	expect.assertions(1)
	const sports = await dbUser.getUserSportsById(2)
	expect(sports.length).toBe(1)
})

test('Create a sport for a user', async () => {
	expect.assertions(1)
	const sport = await dbUser.postUserSport(2, 4, 54, 1890547,'Federacao de Windsurf', ['trainer'],  [2019,2020,2021])
	expect(sport.fed_id_).toBe(54)
})

test('Update a sport for a user', async () => {
	expect.assertions(1)
	const sport = await dbUser.updateUserSport(2, 3, 54, 1890547,'Federacao de Windsurf', ['trainer'],  [2019,2020,2021,2022])
	expect(sport.fed_name_).toBe('Federacao de Windsurf')
})

test('Delete a sport for a user', async () => {
	expect.assertions(1)
	const user = await dbUser.deleteUserSport(2,4)
	expect(user.user_id_).toBe(2)
})