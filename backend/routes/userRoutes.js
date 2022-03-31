'use strict'

import express from 'express'
import {getUsers, getUserById, postUser, updateUser, deleteUser, 
	getUsersQuotas, getUserQuotasById, postUsersQuota, updateUsersQuota, updateUserQuota,
	getUsersSports, getUsersSport, getUserSportsById, postUserSport, deleteUserSport,
	postUserEvent, updateUserEventById, updateUserSport} from '../controllers/userControllers.js'

const app = express.Router()


app.get('/', getUsers)

app.get('/:id',getUserById)

app.post('/',postUser)

app.put('/:id',updateUser)

app.delete('/:id',deleteUser)

// quotas

app.get('/quotas',getUsersQuotas)

app.get('/:id/quotas',getUserQuotasById)

app.post('/quotas',postUsersQuota)

app.put('/quotas/:qid',updateUsersQuota)

app.put('/:id/quotas/:qid',updateUserQuota)

// sports

app.get('/sports',getUsersSports)

app.get('/sports/:id',getUsersSport)

app.get('/:id/sports',getUserSportsById)

app.post('/:id/sports',postUserSport)

app.put('/:id/sports/:sid',updateUserSport)

app.delete('/sports/:id',deleteUserSport)

// events

app.post('/:id/events',postUserEvent)

app.put('/:id/events/:eid',updateUserEventById)
