'use strict'

import {createTransport, getTestMessageUrl } from 'nodemailer'
import error from '../error.js'

export const mailSender = async(receivers, subject, content) => {
	const email = process.env.EMAIL
	const password = process.env.EMAIL_PASSWORD

	let transporter = createTransport({
		host: 'smtp-mail.outlook.com',
		service: 'outlook',
		secureConnection: false,
		port: 587,
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			user: email, 
			pass: password, 
		}
	})
	
	try {
		let info = await transporter.sendMail({
			from: email,
			to: receivers,
			subject: subject, 
			text: content.text, 
			html: content.html,
		})
		return info
	} catch (e) {
		console.log(e);
		throw error(554, 'Error while sending email', 'MESSAGE_CODE_42')
	}
}

export const notify = async(receivers, subject, content) => {
	const email = process.env.EMAIL
	const password = process.env.EMAIL_PASSWORD

	let transporter = createTransport({
		host: 'smtp-mail.outlook.com',
		service: 'outlook',
		secureConnection: false,
		port: 587,
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			user: email, 
			pass: password, 
		}
	})
	
	try {
		let info = await transporter.sendMail({
			from: email,
			to: receivers,
			subject: subject, 
			text: content.text, 
			html: content.html,
		})
		return info
	} catch (e) {
		console.log(e);
		throw error(554, 'Error while sending email', 'MESSAGE_CODE_42')
	}
}

export const contact = async(from, name, content) => {
	const email = process.env.EMAIL
	const password = process.env.EMAIL_PASSWORD

	let transporter = createTransport({
		host: 'smtp-mail.outlook.com',
		service: 'outlook',
		secureConnection: false,
		port: 587,
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			user: email, 
			pass: password
		},
	})
	try {
		let info = await transporter.sendMail({
			from: 'ericeirasurfclub@outlook.com',
			to: 'ericeirasurfclub@outlook.com',
			cc: from,
			subject: `Novo email de: ${name}`, 
			text: content.text,
			html: content.html,
		})
		return info
	} catch (e) {
		console.log(e);
		throw error(554, 'Error while sending email', 'MESSAGE_CODE_42')
	}
	
}