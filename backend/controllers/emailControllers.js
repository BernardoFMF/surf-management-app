'use strict'

import asyncHandler from 'express-async-handler'
import emailServices from '../services/emailServices.js'


const emailController = (db) => {
    const services = emailServices(db)

	const sendContactEmail = asyncHandler(async (req, res) => {
		const emailResp = await services.sendContactEmailServices(req.body.from_email, req.body.from_name, req.body.topic, req.body.text)
		if (emailResp) {
			res.status(201)
			res.json({ message: 'Email sent successfully', message_code: 'MESSAGE_CODE_43' })
		}
		
	})

	const sendNotifyEmail = asyncHandler(async (req, res) => {
		const emailResp = await services.sendNotifyEmailServices()
		if (emailResp) {
			res.status(201)
			res.json({ message: 'Email sent successfully', message_code: 'MESSAGE_CODE_43' })
		}
		
	})

	return {
		sendContactEmail,
		sendNotifyEmail

	}
}

export default emailController