'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'
import groupController from '../controllers/groupControllers.js'

const groupRoutes = (data) => {
	const app = express.Router()

	const controller = groupController(data)

	app.get('/:id/members', authentication.authAdmin, controller.getGroupByIdMembers)

	app.get('/', authentication.authAdmin, controller.getGroups)

	app.get('/:id', authentication.authAdmin, controller.getGroupById)

	app.post('/', authentication.authAdmin, controller.postGroup)

	app.delete('/:id', authentication.authAdmin, controller.deleteGroup)

	app.get('/members/:id', authentication.authMember, controller.getMemberGroups)

	app.post('/:id/members', authentication.authAdmin, controller.postMemberInGroup)

	app.delete('/:id/members/:uid', authentication.authAdmin, controller.deleteMemberInGroup)

	

	return app
}

export default groupRoutes