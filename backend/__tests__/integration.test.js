import supertest from 'supertest'
import express, { request } from 'express'
import jestOpenAPI from 'jest-openapi'
import data from '../data/__mock__/mockDataAccess.js'
/*
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

test('Post, Put, Gets & Delete sport', async () => {
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

	const putRes = await supertest(app)
		.put(`/api/sports/${createRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"is_deleted": false,
			"name": "Surf"
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec("id")

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
            "nif": 155555666,
            "phone_number": 912543345,
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
            "name": "Nike",
            "nif": 198272000,
            "phone_number": 933356648,
            "email": "nikie@gmail.com",
            "postal_code": "2745-056",
            "address": "Rua da Borboletas n45 2esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "nikie",
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(companyRes).toSatisfyApiSpec()
	expect(companyRes.body).toSatisfySchemaInApiSpec("id")

	const userRes = await supertest(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "cc": 299998204,
            "nif": 290678979,
            "type": "effective",
            "birth_date": "09-05-2000",
            "nationality": "Portuguesa",
            "full_name": "Joca Joquissimo",
            "phone_number": 934523248,
            "email": "jocaoao@gmail.com",
            "postal_code": "2745-056",
            "address": "Rua da Borboletas n45 2esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "jocaoao",
            "paid_enrollment": false,
            "gender": "Male"
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(userRes).toSatisfyApiSpec()
	expect(userRes.body).toSatisfySchemaInApiSpec("id")

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

test('Post, Gets, Put & Delete user sport', async () => {
	// the user creation is needed 
	const userRes = await supertest(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "cc": 234568444,
            "nif": 294547459,
            "type": "effective",
            "birth_date": "09-05-2000",
            "nationality": "Portuguesa",
            "full_name": "João Miguel",
            "phone_number": 934509248,
            "email": "mofiguel@gmail.com",
            "postal_code": "2745-056",
            "address": "Rua da Borboletas n45 2esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "mofiguel",
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

//Events

test('Post, Put, Gets & Delete event', async () => {
	const createRes = await supertest(app)
		.post('/api/events')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			'name': 'assembleia geral',
			'initial_date': '08-08-2022',
			'final_date': '10-08-2022',
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(createRes).toSatisfyApiSpec()
	expect(createRes.body).toSatisfySchemaInApiSpec('id')

	const getAllRes = await supertest(app)
		.get('/api/events')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect('Content-Type', /json/)
		.expect(200)
	expect(getAllRes).toSatisfyApiSpec()
	expect(getAllRes.body[0]).toSatisfySchemaInApiSpec('event')

	const getByIdRes = await supertest(app)
		.get(`/api/events/${createRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect('Content-Type', /json/)
		.expect(200)
	expect(getByIdRes).toSatisfyApiSpec()
	expect(getByIdRes.body).toSatisfySchemaInApiSpec('event')

	const putRes = await supertest(app)
		.put(`/api/events/${createRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			'name': 'assembleia geral v2',
			'initial_date': '10-08-2022',
			'final_date': '12-08-2022',
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec('id')

	const deleteRes = await supertest(app)
		.delete(`/api/events/${createRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect('Content-Type', /json/)
		.expect(200)
	expect(deleteRes).toSatisfyApiSpec()
	expect(deleteRes.body).toSatisfySchemaInApiSpec('message')
})

//Attendance

test('Post, Put & Get an attendance', async () => {
	const userRes = await supertest(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "cc": 23456834,
            "nif": 29067439,
            "type": "effective",
            "birth_date": "09-05-2000",
            "nationality": "Portuguesa",
            "full_name": "João Miguel",
            "phone_number": 934509248,
            "email": "jmiguel12@gmail.com",
            "postal_code": "2745-056",
            "address": "Rua da Borboletas n45 2esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "jmiguel12",
            "paid_enrollment": false,
            "gender": "Male"
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(userRes).toSatisfyApiSpec()
	expect(userRes.body).toSatisfySchemaInApiSpec("id")

	const createRes = await supertest(app)
		.post('/api/events')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			'name': 'assembleia geral',
			'initial_date': '08-08-2022',
			'final_date': '10-08-2022',
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(createRes).toSatisfyApiSpec()
	expect(createRes.body).toSatisfySchemaInApiSpec('id')

	const createAttRes = await supertest(app)
		.post(`/api/events/${createRes.body}/attendance`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			'id': userRes.body,
			'state': 'going',
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(createAttRes).toSatisfyApiSpec()
	expect(createAttRes.body).toSatisfySchemaInApiSpec('id_pair')

	const putRes = await supertest(app)
		.put(`/api/events/${createRes.body}/attendance`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			'id': userRes.body,
			'state': 'not going',
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec('id_pair')

	const getRes = await supertest(app)
		.get(`/api/events/${createRes.body}/attendance`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect('Content-Type', /json/)
		.expect(200)
	expect(getRes).toSatisfyApiSpec()
	expect(getRes.body[0]).toSatisfySchemaInApiSpec('event_attendance')

	const getMemberRes = await supertest(app)
		.get(`/api/events/members/${userRes.body}/attendance`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect('Content-Type', /json/)
		.expect(200)
	expect(getMemberRes).toSatisfyApiSpec()
	expect(getMemberRes.body[0]).toSatisfySchemaInApiSpec('attendance_event')
})

//Candidate

test('Create, Get & Delete candidate', async () => {
	const postRes = await supertest(app)
		.post('/api/candidates')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"cc": 23451224,
			"nif": 29012459,
			"birth_date": "09-05-2000",
			"nationality": "Portuguesa",
			"full_name": "João Miguel",
			"phone_number": 934509248,
			"email": "jmiguel12345@gmail.com",
			"postal_code": "2745-056",
			"address": "Rua da Borboletas n45 2esq",
			"location": "Porto Covo",
			"password": "123",
			"username": "jmiguel12345",
			"gender": "Male",
			"img": [13, 16, 83, 1]
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(postRes).toSatisfyApiSpec()
	expect(postRes.body).toSatisfySchemaInApiSpec("id")

	const getRes = await supertest(app)
		.get('/api/candidates')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect(200)
	expect(getRes).toSatisfyApiSpec()
	expect(getRes.body[0]).toSatisfySchemaInApiSpec("candidate")

	const getByIdRes = await supertest(app)
		.get(`/api/candidates/${postRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect(200)
	expect(getByIdRes).toSatisfyApiSpec()
	expect(getByIdRes.body).toSatisfySchemaInApiSpec("candidate")

	const deleteRes = await supertest(app)
		.delete(`/api/candidates/${postRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect(200)
	expect(deleteRes).toSatisfyApiSpec()
	expect(deleteRes.body).toSatisfySchemaInApiSpec("message")
})

test('Approve candidate', async () => {
	const postRes = await supertest(app)
		.post('/api/candidates')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"cc": 23451224,
			"nif": 29012459,
			"birth_date": "09-05-2000",
			"nationality": "Portuguesa",
			"full_name": "João Miguel",
			"phone_number": 934509248,
			"email": "jmiguel12345@gmail.com",
			"postal_code": "2745-056",
			"address": "Rua da Borboletas n45 2esq",
			"location": "Porto Covo",
			"password": "123",
			"username": "jmiguel12345",
			"gender": "Male",
			"img": [13, 16, 83, 1]
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(postRes).toSatisfyApiSpec()
	expect(postRes.body).toSatisfySchemaInApiSpec("id")

	const approveRes = await supertest(app)
		.put(`/api/candidates/${postRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect(200)
	expect(approveRes).toSatisfyApiSpec()
	expect(approveRes.body).toSatisfySchemaInApiSpec("message")
})

*/
