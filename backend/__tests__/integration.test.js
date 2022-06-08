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
        .post('/api/auth/login')
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
            "gender": "Male",
			"iban" : "PT501231010101010101",
			"img" : "imagem",
			"paid_enrollment": "01-01-2019"
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(userRes).toSatisfyApiSpec()
	expect(userRes.body).toSatisfySchemaInApiSpec("id")

	const getRes = await supertest(app)
        .get('/api/users?offset=0&limit=10')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getRes).toSatisfyApiSpec()
    expect(getRes.body.users[0]).toSatisfySchemaInApiSpec("user")

	const getIdRes = await supertest(app)
		.get(`/api/users/${userRes.body}`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getIdRes).toSatisfyApiSpec()
    expect(getIdRes.body).toSatisfySchemaInApiSpec("userById")

	const deleteUser = await supertest(app)
		.delete(`/api/users/${userRes.body}`)
		.set('Accept', 'application/json')
        .set('Cookie', session)
		.expect('Content-Type', /json/)
        .expect(200)
	expect(deleteUser).toSatisfyApiSpec()
    expect(deleteUser.body).toSatisfySchemaInApiSpec("message")
	
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
			"is_deleted": false,
			"img": [13, 16, 83, 1],
			"iban": "PT501231010101010101"
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec("userById")

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
			"type": "corporate",
			"img": "image",
			"iban": "PT501111111111111111"
        })
        .expect('Content-Type', /json/)
        .expect(201)
    expect(companyRes).toSatisfyApiSpec()
	expect(companyRes.body).toSatisfySchemaInApiSpec("id")

	const getRes = await supertest(app)
        .get('/api/companies?offset=0&limit=10')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getRes).toSatisfyApiSpec()
    expect(getRes.body.companies[0]).toSatisfySchemaInApiSpec("company")

	const getIdRes = await supertest(app)
		.get(`/api/companies/${companyRes.body}`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getIdRes).toSatisfyApiSpec()
    expect(getIdRes.body).toSatisfySchemaInApiSpec("companyById")

	const deleteRes = await supertest(app)
		.delete(`/api/companies/${companyRes.body}`)
		.set('Accept', 'application/json')
        .set('Cookie', session)
		.expect('Content-Type', /json/)
        .expect(200)
	expect(deleteRes).toSatisfyApiSpec()
    expect(deleteRes.body).toSatisfySchemaInApiSpec("message")
	
	const putRes = await supertest(app)
		.put(`/api/companies/${companyRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"name": "Footlocker Lda.",
			"nif": 29061159,
			"phone_number": 936666548,
			"postal_code": "2745-056",
			"address": "Rua da Borboletas n45 2esq",
			"location": "Porto Covo",
			"email": "flocker@gmail.com",
			"is_deleted": false,
			"iban": "PT501111123431233412",
			"img": "image"
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(putRes).toSatisfyApiSpec()
	expect(putRes.body).toSatisfySchemaInApiSpec("company")
})

//Quotas

test('Post, Gets, Put quotas', async () => {
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
        .get('/api/quotas?offset=0&limit=10')
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getRes).toSatisfyApiSpec()
    expect(getRes.body.quotas[0]).toSatisfySchemaInApiSpec("quota")
	
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

	const postManagementQuotas = await supertest(app)
		.post(`/api/quotas/management`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
		.send({
			"type": "effective",
			"quota_value": 15
		})
    expect(postManagementQuotas).toSatisfyApiSpec()
    expect(postManagementQuotas.body).toSatisfySchemaInApiSpec("message")

	const getManagementQuotas = await supertest(app)
		.get(`/api/quotas/management`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getManagementQuotas).toSatisfyApiSpec()
    expect(getManagementQuotas.body[0]).toSatisfySchemaInApiSpec("quotas_management")

	const putManagementQuotas = await supertest(app)
		.put(`/api/quotas/management/effective`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
		.send({
			"quota_value": 15
		})
    expect(putManagementQuotas).toSatisfyApiSpec()
    expect(putManagementQuotas.body).toSatisfySchemaInApiSpec("quota_type")
})

//User Sports

test('Post, Gets, Put & Delete user sport', async () => {
	// the user creation is needed 
	const userRes = await supertest(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Cookie', session)
        .send({
            "cc": 23456058,
            "nif": 29067435,
            "type": "effective",
            "birth_date": "11-05-1999",
            "nationality": "Portuguesa",
            "full_name": "José Lopes",
            "phone_number": 934509667,
            "email": "jlopes@gmail.com",
            "postal_code": "2600-546",
            "address": "Rua Afonso Henriques n03 1esq",
            "location": "Lisboa",
            "password": "123",
            "username": "joselopes",
            "paid_enrollment": true,
            "gender": "Male",
			"iban" : "PT501231010101085672",
			"img" : "imagem5",
			"paid_enrollment": "01-01-2019"
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
    expect(getRes.body).toSatisfySchemaInApiSpec("usersSports")

	const getSidRes = await supertest(app)
		.get(`/api/users/sports/${sportRes.body}?offset=0&limit=10`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getSidRes).toSatisfyApiSpec()
    expect(getSidRes.body).toSatisfySchemaInApiSpec("usersSports")

	const getUidRes = await supertest(app)
		.get(`/api/users/${userRes.body}/sports?offset=0&limit=10`)
        .set('Accept', 'application/json')
        .set('Cookie', session)
    expect(getUidRes).toSatisfyApiSpec()
    expect(getUidRes.body).toSatisfySchemaInApiSpec("usersSports")

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
		.query({
			"offset": 0,
			"limit": 100
		})
		.expect('Content-Type', /json/)
		.expect(200)
	expect(getAllRes).toSatisfyApiSpec()
	expect(getAllRes.body.events[0]).toSatisfySchemaInApiSpec('event')

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
            "cc": 23456823,
            "nif": 29067458,
            "type": "effective",
            "birth_date": "09-05-2001",
            "nationality": "Portuguesa",
            "full_name": "Miguel João",
            "phone_number": 934509267,
            "email": "miguelj@gmail.com",
            "postal_code": "2835-056",
            "address": "Rua dos Corvos n41 3esq",
            "location": "Porto Covo",
            "password": "123",
            "username": "miguelj",
            "paid_enrollment": true,
            "gender": "Male",
			"iban" : "PT501231010101010857",
			"img" : "imagem2",
			"paid_enrollment": "01-01-2019"
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
	expect(getRes.body).toSatisfySchemaInApiSpec('event_attendances')

	const getMemberRes = await supertest(app)
		.get(`/api/events/members/${userRes.body}/attendance?offset=0&limit=10`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.expect('Content-Type', /json/)
		.expect(200)
		console.log(userRes.body)
	expect(getMemberRes).toSatisfyApiSpec()
	expect(getMemberRes.body).toSatisfySchemaInApiSpec('attendances_event_member')
})

//Candidate

test('Create, Get & Delete candidate', async () => {
	const postRes = await supertest(app)
		.post('/api/candidates')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"username": "jmiguel12345",
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
			"gender": "Male",
			"img": "imgfixe",
			"iban": "pt50159595959595959595959"
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(postRes).toSatisfyApiSpec()
	expect(postRes.body).toSatisfySchemaInApiSpec("id")

	const getRes = await supertest(app)
		.get('/api/candidates')
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.query({
			"offset": 0,
			"limit": 100
		})
		.expect(200)
	expect(getRes).toSatisfyApiSpec()
	expect(getRes.body.candidates[0]).toSatisfySchemaInApiSpec("candidate")

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
			"username": "jmiguel12345",
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
			"gender": "Male",
			"img": "imgfixe",
			"iban": "pt50159595959595959595959"
		})
		.expect('Content-Type', /json/)
		.expect(201)
	expect(postRes).toSatisfyApiSpec()
	expect(postRes.body).toSatisfySchemaInApiSpec("id")

	const approveRes = await supertest(app)
		.put(`/api/candidates/${postRes.body}`)
		.set('Accept', 'application/json')
		.set('Cookie', session)
		.send({
			"type_": "effective",
			"paid_enrollment": true
		})
		.expect(200)
	expect(approveRes).toSatisfyApiSpec()
	expect(approveRes.body).toSatisfySchemaInApiSpec("message")
})