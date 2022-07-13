'use strict'

import data from '../data/__mock__/mockDataAccess.js'

import sport from '../data/sportData.js'
import event from '../data/eventData.js'
import candidate from '../data/candidateData.js'
import company from '../data/companyData.js'
import user from '../data/userData.js'
import quota from '../data/quotaData.js'
import group from '../data/groupData'

const dbSport = sport(data)
const dbEvent = event(data)
const dbCandidate = candidate(data)
const dbCompany = company(data)
const dbUser = user(data)
const dbQuota = quota(data)
const dbGroup = group(data)

const offset = 0
const limit = 100

async function insertSportDummies() {
	await dbSport.postSport('Surf')
	await dbSport.postSport('Bodyboard')
	await dbSport.postSport('Skysurf')
	await dbSport.postSport('Winfsurf')
}

async function insertEventDummies() {
	await dbEvent.postEvent('Assembleia geral.', '15-04-2022', '16-04-2022', [1], false)
	await dbEvent.postEvent('Entrega de prémios.', '12-06-2022', '12-06-2022', [2], false)
}

async function insertCandidateDummies() {
	await dbCandidate.postCandidate('jobileu', 474389323, 342893489, '12-06-1990', 'Angolana', 'Jobileu Santos', 932727288, 'jobi@clix.pt', '2830-829', 'Rua da bobadela', 'Bobadela', 'barbie2', '\\xEAABDFFA', 'Male', 'PT50001110000001234567831')
	await dbCandidate.postCandidate('carlao', 898942908, 109381908, '15-03-1990', 'Portuguesa', 'Carlitos Roger', 927182837, 'carliti@hotmail.com', '2423-829', 'Rua da banheira', 'Baixa da Banheira', 'duche2', '\\xEAABDFFA', 'Male', 'PT50112700000001234567831' )
}

async function insertCompanyDummies() {
	await dbCompany.postCompany('Ericeira surf shop', 231312312, 938172388, 'ess@gmail.com', '2812-829', 'Rua da ericeira', 'Ericeira', 'eric', 'ericeric', 'corporate', '\\xEAABDFFA', 'PT50002711110001234567831')
	await dbCompany.postCompany('Billabong', 423213312, 932323238, 'billybonga@gmail.com', '2220-829', 'Rua da billa', 'Billacity', 'billa', 'billabilla', 'corporate', '\\xEAABDFFA', 'PT50002700000011111567831')
}

async function insertUserDummies() {
	await dbUser.postUser(383128318, 764291145, 'founder', '09-03-1987', 'Iraniano', 'Mohamed Jahal Bali horad', 967022559, 'mohamedlgh@gmail.com', '3010-078', 'Rua D.José Martins', 'Lisboa','lisboa2020', 'mohamed87', true, 'Male', 'urlgandafixe', 'PT50011110000001234567831', '\\xEAABDFFA', '09-03-2022')
	await dbUser.postUser(383123818, 763371741, 'effective', '27-10-1993', 'Portuguesa', 'Luis Marquez', 967022783, 'luismarquez@gmail.com', '2080-478', 'Rua da Estrela', 'Lisboa','mariabeatriz', 'luizinho23', true, 'Male', 'urlgandafixe', 'PT50002700000011134567831', '\\xEAABDFFA', '09-03-2022')
}

async function insertSportsforUsersDummies() {
	await dbUser.postUserSport(1, 2, 54, 1890547, 'Fereracao de Surf', ['coach'], [2017,2018,2019,2020,2021], false)
	await dbUser.postUserSport(2, 1, 54, 1890548, 'Federacao de Surf', ['practitioner'], [2018], false)
	await dbUser.postUserSport(1, 3, 55, 1895731, 'Fereracao de SkySurf', ['practitioner'], [2021], false)
	await dbUser.postUserSport(2, 3, 55, 1890780, 'Federacao de SkySurf', ['practitioner'], [2022], false)
}

async function insertGroupsDummies() {
	await dbGroup.postGroup('ganda grupo de tudo', 'tudo', 'member_type', [ "effective", "corporate", "merit", "founder" ], [])
	await dbGroup.postGroup('ganda grupo de desporto', 'desporto', 'member_sport_type', [ "coach", "practitioner" ], [1, 3, 2])
}

beforeAll( async () => {	
	await insertSportDummies()
	await insertCandidateDummies()
	await insertUserDummies()
	await insertCompanyDummies()
	await insertGroupsDummies()
	await insertSportsforUsersDummies()	
	//await dbQuota.postQuota('01-01-2023')
	//await dbQuota.updateMemberQuota(2, '02-03-2023')
	return await insertEventDummies()
})

// Groups - verified at 12/07/2022

test('Get all groups', async () => {
	expect.assertions(1)
	const groups = await dbGroup.getGroups(undefined, undefined, [], 0, 100)
	expect(groups.groups.length).toBe(2)
})

test('Get specific group', async () => {
	expect.assertions(1)
	const groups = await dbGroup.getGroupById(1)
	expect(groups.name_).toBe('ganda grupo de tudo')
})

test('Get member of specific group', async () => {
	expect.assertions(1)
	const groups = await dbGroup.getGroupByIdMembers(1, undefined, 0, 100)
	expect(groups.members.length).toBe(5)
})

test('Get groups of member', async () => {
	expect.assertions(1)
	const groups = await dbGroup.getMemberGroups(1, undefined, undefined, [], 0, 100)
	expect(groups.groups[0].name_).toBe('ganda grupo de tudo')
})

test('Get member groups', async () => {
	expect.assertions(1)
	const group = await data.getMemberGroupsData(1, 'ganda grupo de tudo', 'member_type', [], 0, 100)
	expect(group.groups[0].group_id_).toBe(1)
})

test('Create a group', async () => {
	expect.assertions(1)
	const group = await dbGroup.postGroup('ganda grupo de quase tudo', 'tudo', 'member_type', [ "effective", "merit", "founder" ], [])
	expect(group).toBe(3)
})

test('Delete a group', async () => {
	expect.assertions(1)
	const group = await dbGroup.deleteGroup(3)
	expect(group).toBe(3)
})

//Sports - verified at 12/07/2022

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

test('Update specific sport', async () => {
	expect.assertions(1)
	const id = await dbSport.updateSport(4, false, 'Windsurf')
	const sport = await dbSport.getSportById(id)
	expect(sport.name_).toBe('Windsurf')
})

test('Delete specific sport', async () => {
	expect.assertions(1)
	await dbSport.deleteSport(1)
	const sport = await dbSport.getSportById(1)
	expect(sport.is_deleted_).toBe(true)

})

test('Create a sport', async () => {
	expect.assertions(1)
	const sport_id = await dbSport.postSport('Skimboarding')
	expect(sport_id).toBe(5)
})

//Events - verified 26/04/2022

test('Get all events', async () => {
	expect.assertions(2)
	const events = await dbEvent.getEvents(undefined, undefined, undefined, offset, limit)
	expect(events.events[0].name_).toBe('Assembleia geral.')
	expect(events.events[1].name_).toBe('Entrega de prémios.')
})

test('Get all events', async () => {
	expect.assertions(1)
	const events = await dbEvent.getEvents('Assembleia geral.', '15-04-2022', '16-04-2022', offset, limit)
	expect(events.events[0].name_).toBe('Assembleia geral.')
})

test('Get specific event', async () => {
	expect.assertions(1)
	const event = await dbEvent.getEventById(1)
	expect(event.name_).toBe('Assembleia geral.')
})

test('Delete specific event', async () => {
	expect.assertions(1)
	try {
		await dbEvent.deleteEvent(2)
		await dbEvent.getEventById(2)
	} catch (e) {
		expect(e.message).toBe('Event does not exist')
	}
})

test('Create a event', async () => {
	expect.assertions(1)
	const event = await dbEvent.postEvent('Entrega de troféus.', '12-07-2022', '12-07-2022', [1,2], false)
	expect(event).toBe(3)
})


test('Update a event', async () => {
	expect.assertions(1)
	const event = await dbEvent.updateEvent(1, 'Assembleia geral.', '12-08-2022', '12-11-2022')
	expect(event).toBe(1)
})

//Attendance - verified 26/04/2022 (missing get attendance by user)

test('Update specific attendance', async () => {
	expect.assertions(1)
	const attendance = await dbEvent.updateMemberAttendance(1, 1, 'not going')
	expect(attendance.id_).toBe(1)
})

test('Get specific attendance', async () => {
	expect.assertions(1)
	const attendance = await dbEvent.getEventByIdAttendance(1, offset, limit)
	expect(attendance.attendance[4].state_).toBe('not going')
})

test('Get specific member attendance', async () => {
	expect.assertions(1)
	const attendance = await dbEvent.getEventMemberByIdAttendance(1, undefined, undefined, undefined, offset, limit)
	expect(attendance.events[0].member_id_).toBe(1)
})

test('Get specific member attendance', async () => {
	expect.assertions(1)
	const attendance = await dbEvent.getEventMemberByIdAttendance(1, 'Assembleia geral.', 'not going',undefined, offset, limit)
	expect(attendance.events[0].member_id_).toBe(1)
})

//Candidate - verified 12/07/2022

test('Get all candidates', async () => {
	expect.assertions(2)
	const candidates = await dbCandidate.getCandidates(undefined, undefined, undefined, offset, limit)
	expect(candidates.candidates[0].nationality_).toBe('Angolana')
	expect(candidates.candidates[1].nationality_).toBe('Portuguesa')
})

test('Get all candidates', async () => {
	expect.assertions(1)
	const candidates = await dbCandidate.getCandidates('jobileu', 'Jobileu Santos', 'jobi@clix.pt', offset, limit)
	expect(candidates.candidates[0].nationality_).toBe('Angolana')
})

test('Get specific candidate', async () => {
	expect.assertions(1)
	const candidate = await dbCandidate.getCandidateById(1)
	expect(candidate.nationality_).toBe('Angolana')
})

test('Create a candidate', async () => {
	expect.assertions(1)
	const candidate = await dbCandidate.postCandidate('ze', 672335523, 123213123, '21-06-1990', 'Portuguesa', 'João Santos', 932333288, 'joao@clix.pt', '2830-829', 'Rua da bobadela', 'Bobadela', 'barbi', null, 'Other', 'PT50112700000111234567831')
	expect(candidate).toBe(3)
})

test('Delete specific candidate', async () => {
	expect.assertions(1)
	try {
		await dbCandidate.deleteCandidate(2)
		await dbCandidate.getCandidateById(2)
	} catch (e) {
		expect(e.message).toBe('Candidate does not exist')
	}
})

test('Approve a candidate', async () => {
	expect.assertions(1)
	const userId = await dbCandidate.approveCandidate(1, 'effective', true, 'candidatebemaneiro', false)
	expect(userId).toBe(5)
})

//Company - verified 12/07/2022

test('Get all companies', async () => {
	expect.assertions(2)
	const companies = await dbCompany.getCompanies(undefined, undefined, undefined, undefined, offset, limit)
	expect(companies.companies[0].name_).toBe('Ericeira surf shop')
	expect(companies.companies[1].name_).toBe('Billabong')
})

test('Get all companies', async () => {
	expect.assertions(1)
	const companies = await dbCompany.getCompanies('eric', 'Ericeira surf shop', 'ess@gmail.com',undefined, offset, limit)
	expect(companies.companies[0].name_).toBe('Ericeira surf shop')
})

test('Get specific company', async () => {
	expect.assertions(1)
	const company = await dbCompany.getCompanyById(3)
	expect(company.name_).toBe('Ericeira surf shop')
})

test('Create a company', async () => {
	expect.assertions(1)
	const company_id = await dbCompany.postCompany('Ripcurl', 999321681, 967872388, 'rippy@gmail.com', '2112-829', 'Rua do rip', 'Rip on the curls', 'rippy', 'roppypipy', 'corporate', '\\xEAABDFFA', 'PT50111700000001234544441')
	expect(company_id).toBe(6)
})

test('Update a company', async () => {
	expect.assertions(1)
	const company = await dbCompany.updateCompany(3, 354876321, 'corporate', 'Ericeira Surf shop', 918923180, '2812-829', 'Rua da ericeira', 'Ericeira', '\\xEAABDFFA', false, 'PT50111700000111134544441')
	expect(company.name_).toBe('Ericeira Surf shop')
})

test('Delete specific company', async () => {
	expect.assertions(1)
	const id = await dbCompany.deleteCompany(3)
	const company = await dbCompany.getCompanyById(id)
	expect(company.is_deleted_).toBe(true)

})

//Quotas - verified 12/07/2022

test('Create a quota', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.postQuota('01-01-2023')
	expect(quotas).toBe('01-01-2023')
})

test('Get all quotas', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getQuotas(undefined, undefined, undefined, 0, 100)
	expect(quotas.number_of_quotas).toBe(5)
})	

test('Get all quotas', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getQuotas('luizinho23', 'luismarquez@gmail.com', '01-01-2023', 0, 100)
	expect(quotas.number_of_quotas).toBe(1)
})

test('Get all users quotas', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getUsersQuotas()
	expect(quotas.length).toBe(2)
})	

test('Get all companies quotas', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getCompaniesQuotas()
	expect(quotas.length).toBe(2)
})	

test('Get specific member quota', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getMemberQuotasById(6, offset, limit)
	expect(quotas.quotas[0].date_).toBe('01-01-2023')
})

test('Update a company quota', async () => {
	expect.assertions(1)
	const quota = await dbQuota.updateMemberQuota(2, '02-03-2022')
	expect(quota).toBe(2)
})

test('Delete a quota', async () => {
	expect.assertions(1)
	await dbQuota.deleteQuota('01-01-2023')
	const quotas = await dbQuota.getQuotas(undefined, undefined, undefined, 0, 100)
	expect(quotas.number_of_quotas).toBe(1)
})

test('Get all management quotas', async () => {
	expect.assertions(1)
	const quotas = await dbQuota.getManagementQuotas('user')
	expect(quotas.length).toBe(3)
})	

test('Update specific management quota', async () => {
	expect.assertions(1)
	await dbQuota.updateManagementQuotaByType('effective', 20)
	const mq = await dbQuota.getManagementQuotaByType('effective')
	expect(mq.quota_value_).toBe(20)
})

test('Create management quota', async () => {
	expect.assertions(1)
	const quota = await dbQuota.postManagementQuota('super effective', 100)
	expect(quota).toBe('super effective')
})

//User - verified 26/04/2022

test('Get all users', async () => {
	expect.assertions(1)
	const users = await dbUser.getUsers(undefined, undefined, undefined, undefined, offset, limit)
	expect(users.number_of_users).toBe(3)
})

test('Get all users', async () => {
	expect.assertions(1)
	const users = await dbUser.getUsers('luizinho23', 'Luis Marquez', 'luismarquez@gmail.com', undefined, offset, limit)
	expect(users.number_of_users).toBe(1)
})

test('Get a specific user', async () => {
	expect.assertions(1)
	const user = await dbUser.getUserById(1)
	expect(user.birth_date_).toBe('09-03-1987')
})

test('Post User', async () => {
	expect.assertions(1)
	const user = await dbUser.postUser(383123909, 763841145, 'effective', '03-10-1983', 'Senegales', 'Moussa Marega', 934077623, 'maregagrandefixe@outlook.com', '2835-081', 'Rua D.Batista', 'Lisboa','gandagolo', 'marega', true, 'Male', 'PT50666660000001234567831')
	expect(user).toBe(7)
})

test('Update a user', async () => {
	expect.assertions(1)
	const user = await dbUser.updateUser(2, 383123818, 763841444, 'effective', '27-10-1993', 'Portuguese', 'Luis Marques', 967022783, '2080-478', 'Rua da Estrela', 'Lisboa','/xB33FDEAF',false, false, false, 'Other', 'PT50111700000001234567831')
	expect(user.full_name_).toBe('Luis Marques')
})

test('Delete user', async () => {
	expect.assertions(1)
	const id = await dbUser.deleteUser(1)
	const user = await dbUser.getUserById(id)
	expect(user.is_deleted_).toBe(true)
})
/*

//User Sports - verified 26/04/2022

test('Get all sports for users', async () => {
	expect.assertions(1)
	const userSports = await dbUser.getUsersSports()
	expect(userSports.length).toBe(1) 
})

test('Get users that practice a given sport ', async () => {
	expect.assertions(1)
	const users = await dbUser.getUsersSport(2, offset, limit, false, undefined)
	expect(users.users.length).toBe(0) 
})	

test('Get users that practice a given sport ', async () => {
	expect.assertions(1)
	const users = await dbUser.getUsersSport(2, offset, limit, false, 'jobileu')
	expect(users.users.length).toBe(0) 
})	

test('Get sports that a given user practice', async () => {
	expect.assertions(1)
	const sports = await dbUser.getUserSportsById(2, offset, limit)
	expect(sports.sports.length).toBe(1)
})

test('Get sports that a given user practice', async () => {
	expect.assertions(1)
	const sports = await dbUser.getUsersSports()
	expect(sports.length).toBe(1)
})

test('Create a sport for a user', async () => {
	expect.assertions(1)
	const sport = await dbUser.postUserSport(2, 4, 54, 1890547,'Federacao de Windsurf', ['trainer'],  [2019,2020,2021])
	expect(sport.id_).toBe(2)
})

test('Update a sport for a user', async () => {
	expect.assertions(1)
	const sport = await dbUser.updateUserSport(2, 3, 54, 1890547,'Federacao de Windsurf', ['trainer'],  [2019,2020,2021,2022], false)
	expect(sport.id_).toBe(2)
})

test('Delete a sport for a user', async () => {
	expect.assertions(1)
	const user = await dbUser.deleteUserSport(2,4)
	expect(user.id_).toBe(2)
})
*/