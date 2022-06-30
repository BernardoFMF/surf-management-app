'use strict'

import asyncHandler from 'express-async-handler'
import emailServices from '../services/emailServices.js'


const emailController = () => {
    const services = emailServices()

	const sendContactEmail = asyncHandler(async (req, res) => {
		const emailResp = await services.sendContactEmailServices(req.body.from_email, req.body.from_name, req.body.topic, req.body.text)
		console.log(emailResp);
		if (emailResp) {
			res.status(201)
			res.json({ message: 'Email sent successfully', message_code: 'MESSAGE_CODE_45' })
		}
		
	})

	return {
		sendContactEmail
	}
}

export default emailController