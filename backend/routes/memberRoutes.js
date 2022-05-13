import express from 'express'

import authentication from '../middlewares/authMiddleware.js'

import memberController from '../controllers/memberControllers.js'

const memberRoutes = (data) => {
	const app = express.Router()

	const controller = memberController(data)

    app.get('/:id', authentication.authMember, controller.getMemberById)

    return app
}

export default memberRoutes