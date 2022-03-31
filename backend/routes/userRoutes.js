'use strict'

import express from 'express'
import {getUsers, getUserById, postUser, updateUser, deleteUser, 
	getUsersQuotas, getUserQuotasById, postUsersQuota, updateUsersQuota, updateUserQuota,
	getUsersSports, getUsersSport, getUserSportsById, postUserSport, deleteUserSport,
	postUserEvent, updateUserEventById} from '../controllers/userControllers.js'

const app = express.Router()


app.get('/', getUsers)

app.get('/:id',)

app.post('/',)

app.put('/:id',)

app.delete('/:id',)

// quotas

app.get('/quotas',)

app.get('/:id/quotas',)

app.post('/quotas',)

app.put('/quotas/:qid',)

app.put('/:id/quotas/:qid',)

// sports

app.get('/sports',)

app.get('/sports/:id',)

app.get('/:id/sports',)

app.post('/:id/sports',)

app.delete('/sports/:id',)

// events

app.post('/:id/events',)

app.put('/:id/events/:eid',)
