'use strict'

import express from 'express'
import {getUsers, getUserById, postUser, updateUser, deleteUser, 
	getUsersQuotas, getUserQuotasById, postUsersQuota, updateUserQuota,
	getUsersSports, getUsersSport, getUserSportsById, postUserSport, deleteUserSport, updateUserSport} from '../controllers/userControllers.js'

const app = express.Router()

app.get('/', getUsers)

app.get('/:id', getUserById)

app.post('/', postUser)

app.put('/:id', updateUser)

app.delete('/:id', deleteUser)

// quotas

app.get('/quotas', getUsersQuotas)

app.get('/:id/quotas', getUserQuotasById)

app.post('/quotas', postUsersQuota)

app.put('/quotas/:qid', updateUserQuota)

// sports

app.get('/sports', getUsersSports)

app.get('/sports/:id', getUsersSport)

app.get('/:id/sports', getUserSportsById)

app.post('/:id/sports', postUserSport)

app.put('/:id/sports/:sid', updateUserSport)

app.delete('/sports/:id', deleteUserSport)

export default app