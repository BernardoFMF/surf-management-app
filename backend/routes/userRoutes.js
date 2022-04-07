'use strict'

import express from 'express'
import {getUsers, getUserById, postUser, updateUser, deleteUser, 
	getUsersQuotas, getUserQuotasById, postUsersQuota, updateUserQuota, updateUsersQuota,
	getUsersSports, getUsersSport, getUserSportsById, postUserSport, deleteUserSport, updateUserSport} from '../controllers/userControllers.js'

const app = express.Router()

// quotas

app.get('/quotas', getUsersQuotas)

app.get('/:id/quotas', getUserQuotasById)

app.post('/quotas', postUsersQuota)

app.put('/quotas', updateUsersQuota)

app.put('/quotas/:qid', updateUserQuota)

// sports

app.get('/sports', getUsersSports)

app.get('/sports/:sid', getUsersSport)

app.get('/:id/sports', getUserSportsById)

app.post('/:id/sports', postUserSport)

app.put('/:id/sports/:sid', updateUserSport)

app.delete('/:id/sports/:sid', deleteUserSport)

// users

app.get('/', getUsers)

app.get('/:id', getUserById)

app.post('/', postUser)

app.put('/:id', updateUser)

app.delete('/:id', deleteUser)

export default app