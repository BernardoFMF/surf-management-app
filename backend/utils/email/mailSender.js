'use strict'

import {createTransport, getTestMessageUrl } from 'nodemailer'

const mailSender = async(receivers, subject, content) => {

	let transporter = createTransport({
		host: 'smtp-mail.outlook.com', // hostname
		service: 'outlook',
		secureConnection: false, // TLS requires secureConnection to be false
		port: 587, // port for secure SMTP
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			user: 'ericeirasurfclub@outlook.com', 
			pass: 'Miguelbernardogoncalo2022', 
		},
	})
	let info = await transporter.sendMail({
		from: 'ericeirasurfclub@outlook.com',
		to: receivers.join(', '),
		subject: subject, 
		text: content.text, 
		html: content.html, 
	})

	console.log('Message sent: %s', info.messageId)
	console.log('Preview URL: %s', getTestMessageUrl(info))
}

export default mailSender