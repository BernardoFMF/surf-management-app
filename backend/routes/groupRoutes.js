'use strict'

import express from 'express'

import authentication from '../middlewares/authMiddleware.js'


const groupRoutes = (data) => {
	const app = express.Router()

	const controller = groupController(data)

	app.get('/', authentication.authAdmin, controller.getGroups)

	app.get('/:id', authentication.authAdmin, controller.getGroupById)

	app.post('/', authentication.authAdmin, controller.postGroup)

	app.delete('/', authentication.authAdmin, controller.deleteGroup)

	app.get('/members/:id', authentication.authMember, controller.getMemberGroups)

	app.post('/:id', authentication.authAdmin, controller.postMemberInGroup)

	app.delete('/:id', authentication.authAdmin, controller.deleteMemberInGroup)

	app.get(':id/members', authentication.authAdmin, controller.getGroupByIdMembers)

	return app
}

export default groupRoutes