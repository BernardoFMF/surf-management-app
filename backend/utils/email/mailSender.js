'use strict'

import {createTransport, getTestMessageUrl } from 'nodemailer'

export const mailSender = async(receivers, subject, content) => {

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
		to: receivers, //verificar se é so um ent usar ou fazer o join
		subject: subject, 
		text: content.text, 
		html: content.html, 
	})
}

export const contact = async(from, name, topic, content) => {
	let transporter = createTransport({
		service: 'gmail',
		auth: {
			user: '', 
			pass: '', 
		},
	})

	try {
		let info = await transporter.sendMail({
			from: from,
			to: '',
			subject: topic, 
			text: content, 
			html: content
		})
		console.log("info -> " + info);
	} catch (e) {
		console.log("error -> " + e);
	}
}