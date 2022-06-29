'use strict'

import asyncHandler from 'express-async-handler'
import emailServices from '../services/emailServices.js'


const emailController = () => {
    const services = emailServices()

	const sendContactEmail = asyncHandler(async (req, res) => {
		const emailResp = await services.sendContactEmailServices(req.body.from, req.body.name, req.body.topic, req.body.text)
		res.sendStatus(201)
		res.json(emailResp)
	})

	return {
		sendContactEmail
	}
}

export default emailController