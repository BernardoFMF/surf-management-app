import supertest from 'supertest'
import express, { request } from 'express'
import jestOpenAPI from 'jest-openapi'
import data from '../data/__mock__/mockDataAccess.js'

jestOpenAPI(process.cwd() +  "/backend/openApi.yaml")

const app = express()

import server from '../server.js'

server(app, data)

let session = null

beforeEach(async () => {
    const res = await supertest(app)
        .post('/api/members/login')
        .send({
         'username': 'senhorJoel',
         'password': '123'
        })
        .expect(200)
    console.log("RESPONSE: " + res)
    session = res
        .headers['set-cookie'][0]
});

test('Get all users', async () => {
	const userRes = await supertest(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(userRes).toSatisfyApiSpec()
    console.log(userRes.body)
    expect(userRes.body[0]).toSatisfySchemaInApiSpec("user")
})

test('Get a specific user', async () => {
	const userRes = await supertest(app)
		.get('/api/users/0')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(userRes).toSatisfyApiSpec()
    expect(userRes.body).toSatisfySchemaInApiSpec("userById")
})

test('Post, Put & Delete user', async () => {
    const userRes = await supertest(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "cc": 23456824,
            "nif": 29067459,
            "type": "effective",
            "birth_date": "09-05-2000",
            "nationality": "Portuguesa",
            "full_name": "João Miguel",
            "phone_number": 934509248,
            "email": "jmiguel@gmail.com",
            "postal_code": "2745-056",
            "address": "Rua da Borboletas n45 2esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "jmiguel",
            "paid_enrollment": false,
            "gender": "Male"
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(userRes).toSatisfyApiSpec()
	expect(userRes.body).toSatisfySchemaInApiSpec("id")

	const putRes = await supertest(app)
		.put(`/api/users/${userRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"cc": 23456824,
			"nif": 29067459,
			"type": "effective",
			"birth_date": "09-05-2000",
			"nationality": "Portuguesa",
			"full_name": "João Miguel Santos",
			"phone_number": 934509248,
			"postal_code": "2745-056",
			"address": "Rua da Borboletas n45 2esq",
			"location": "Porto Covo",
			"paid_enrollment": false,
			"gender": "Male",
			"is_admin": false,
			"quota_value": 15,
			"is_deleted": false,
			"img": [13, 16, 83, 1]
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec("id")

	const deleteUser = await supertest(app)
		.delete(`/api/users/${userRes.body}`)
		.set('Accept', 'application/json')
        .set('Cookie', session)
		.expect('Content-Type', /json/)
        .expect(200)

	expect(deleteUser).toSatisfyApiSpec()
    expect(deleteUser.body).toSatisfySchemaInApiSpec("message")

})

test('Post, Gets & Delete sport', async () => {
	const createRes = await supertest(app)
		.post('/api/sports')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"name": "surf"
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(createRes).toSatisfyApiSpec()
	expect(createRes.body).toSatisfySchemaInApiSpec("id")

	const sportRes = await supertest(app)
		.get('/api/sports')
		.set('Accept', 'application/json')
		.set('Cookie', session)
	expect(sportRes).toSatisfyApiSpec()
	expect(sportRes.body[0]).toSatisfySchemaInApiSpec("sport")

	const sportByIdRes = await supertest(app)
		.get(`/api/sports/${createRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
	expect(sportByIdRes).toSatisfyApiSpec()
	expect(sportByIdRes.body).toSatisfySchemaInApiSpec("sport")

	const deleteRes = await supertest(app)
		.delete(`/api/sports/${createRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
	expect(deleteRes).toSatisfyApiSpec()
	expect(deleteRes.body).toSatisfySchemaInApiSpec("message")

})
/*

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
})*/