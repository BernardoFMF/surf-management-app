'use strict'

import nodemailer from 'nodemailer'

const mailSender = async(receivers, subject, content) => {

	let transporter = nodemailer.createTransport({
		host: 'hotmail',
		port: 587,
		secure: false, 
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
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

export{mailSender}