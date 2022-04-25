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
    session = res
        .headers['set-cookie'][0]
});

test('Post, Gets, Put & Delete user', async () => {
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

	const getRes = await supertest(app)
        .get('/api/users')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getRes).toSatisfyApiSpec()
    expect(getRes.body[0]).toSatisfySchemaInApiSpec("user")

	const getIdRes = await supertest(app)
		.get(`/api/users/${userRes.body}`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getIdRes).toSatisfyApiSpec()
    expect(getIdRes.body).toSatisfySchemaInApiSpec("userById")

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

//Company

test('Post, Gets, Put & Delete company', async () => {
	const companyRes = await supertest(app)
        .post('/api/companies')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "name": "Footlocker",
            "nif": 29067459,
            "phone_number": 936666648,
            "email": "flocker@gmail.com",
            "postal_code": "2745-056",
            "address": "Rua da Borboletas n45 2esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "flocker",
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(companyRes).toSatisfyApiSpec()
	expect(companyRes.body).toSatisfySchemaInApiSpec("id")

	const getRes = await supertest(app)
        .get('/api/companies')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getRes).toSatisfyApiSpec()
    expect(getRes.body[0]).toSatisfySchemaInApiSpec("company")

	const getIdRes = await supertest(app)
		.get(`/api/companies/${companyRes.body}`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getIdRes).toSatisfyApiSpec()
    expect(getIdRes.body).toSatisfySchemaInApiSpec("companyById")

	const putRes = await supertest(app)
		.put(`/api/companies/${companyRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"name": "Footlocker Lda.",
			"nif": 29067459,
			"phone_number": 936666548,
			"postal_code": "2745-056",
			"address": "Rua da Borboletas n45 2esq",
			"location": "Porto Covo",
			"email": "flocker@gmail.com"
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec("id")

	const deleteRes = await supertest(app)
		.delete(`/api/companies/${companyRes.body}`)
		.set('Accept', 'application/json')
        .set('Cookie', session)
		.expect('Content-Type', /json/)
        .expect(200)
	expect(deleteRes).toSatisfyApiSpec()
    expect(deleteRes.body).toSatisfySchemaInApiSpec("message")
})

//Quotas

test('Post, Gets, Put quotas', async () => {
	// the company creation is needed because of the get companies quotas
	const companyRes = await supertest(app)
        .post('/api/companies')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "name": "Footlocker",
            "nif": 29067459,
            "phone_number": 936666648,
            "email": "flocker@gmail.com",
            "postal_code": "2745-056",
            "address": "Rua da Borboletas n45 2esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "flocker",
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(companyRes).toSatisfyApiSpec()
	expect(companyRes.body).toSatisfySchemaInApiSpec("id")

	const quotasRes = await supertest(app)
        .post('/api/quotas')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
			"date": "2021-01-01"
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(quotasRes).toSatisfyApiSpec()
	expect(quotasRes.body).toSatisfySchemaInApiSpec("message")

	const getRes = await supertest(app)
        .get('/api/quotas')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getRes).toSatisfyApiSpec()
    expect(getRes.body[0]).toSatisfySchemaInApiSpec("quota")

	const getUsersRes = await supertest(app)
		.get(`/api/quotas/users`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getUsersRes).toSatisfyApiSpec()
    expect(getUsersRes.body[0]).toSatisfySchemaInApiSpec("quota")

	const getCompaniesRes = await supertest(app)
		.get(`/api/quotas/companies`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getCompaniesRes).toSatisfyApiSpec()
    expect(getCompaniesRes.body[0]).toSatisfySchemaInApiSpec("quota")

	const putRes = await supertest(app)
		.put('/api/quotas/1')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"payment_date": "2022-01-01"
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec("id")
})

//User Sports

test('Post, Gets, Put & Delete company', async () => {
	// the user creation is needed 
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

	// the sport creation is needed 
	const sportRes = await supertest(app)
		.post('/api/sports')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"name": "surf"
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(sportRes).toSatisfyApiSpec()
	expect(sportRes.body).toSatisfySchemaInApiSpec("id")

	const uSportsRes = await supertest(app)
        .post(`/api/users/${userRes.body}/sports`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "sid": sportRes.body,
            "fed_id": 29067459,
            "fed_number": 12333318,
            "fed_name": "Federeção de surf",
            "type": ["coach"],
            "years_federated": [2018, 2019, 2020, 2021]
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(uSportsRes).toSatisfyApiSpec()
	expect(uSportsRes.body).toSatisfySchemaInApiSpec("user_sport_ids")

	const getRes = await supertest(app)
        .get('/api/users/sports')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getRes).toSatisfyApiSpec()
    expect(getRes.body[0]).toSatisfySchemaInApiSpec("sportJoinUser")

	const getSidRes = await supertest(app)
		.get(`/api/users/sports/${sportRes.body}`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getSidRes).toSatisfyApiSpec()
    expect(getSidRes.body[0]).toSatisfySchemaInApiSpec("sportJoinUser")

	const getUidRes = await supertest(app)
		.get(`/api/users/${userRes.body}/sports`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getUidRes).toSatisfyApiSpec()
    expect(getUidRes.body[0]).toSatisfySchemaInApiSpec("sportJoinUser")

	const putRes = await supertest(app)
		.put(`/api/users/${userRes.body}/sports/${sportRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"fed_id": 29067459,
            "fed_number": 12333318,
            "fed_name": "Federeção de surf",
            "type": ["coach"],
            "years_federated": [2018, 2019, 2020, 2021],
			"is_absent": false
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec("user_sport_ids")

	const deleteRes = await supertest(app)
		.delete(`/api/users/${userRes.body}/sports/${sportRes.body}`)
		.set('Accept', 'application/json')
        .set('Cookie', session)
		.expect('Content-Type', /json/)
        .expect(200)
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
*/



