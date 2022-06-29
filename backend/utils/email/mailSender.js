'use strict'

import {createTransport, getTestMessageUrl } from 'nodemailer'

export const mailSender = async(receivers, subject, content) => {

	let transporter = createTransport({
		host: 'smtp-mail.outlook.com',
		service: 'outlook',
		secureConnection: false,
		port: 587,
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			user: 'ericeirasurfclub@outlook.com', 
			pass: 'Miguelbernardogoncalo2022', 
		}
	})
	let info = await transporter.sendMail({
		from: 'ericeirasurfclub@outlook.com',
		to: receivers,
		subject: subject, 
		text: content.text, 
		html: content.html,
	})
}

export const contact = async(from, name, topic, content) => {
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
			pass: 'Miguelbernardogoncalo2022'
		},
	})
	try {
		let info = await transporter.sendMail({
			from: from,
			to: 'ericeirasurfclub@outlook.com',
			subject: topic + name, 
			text: content, 
			html: content, 
		})
		console.log("INFO -> " + info);
	} catch (e) {
		console.log("ERROR -> " + e);
	}
	
}