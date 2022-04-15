/* eslint-disable indent */
'use strict'

import cryptoUtil from '../utils/crypto.js'
import userServices from '../services/userServices.js'
import mailSender from '../utils/email/mailSender.js'
import { passwordChangeTemplate, passwordChangedTemplate } from  '../utils/email/mailTemplates.js'

const authServices = (db) => { 
	const requestPasswordReset = async (id) => {
		const user = await userServices.findById(id)
		if (!user) throw new Error('User does not exist')
	
		let token //= await Token.findOne({ userId: user._id }) ir buscar o token do user
		if (token) await token.deleteOne() //se ja existir eliminá-lo
	
		let resetToken = crypto.randomBytes(32).toString('hex')
		const hash = await cryptoUtil.hashpassword(resetToken)
		//criar o token
		/*
		await new Token({
			userId: user._id,
			token: hash,
			createdAt: Date.now(),
		}).save()
		*/
	
		const link = `/passwordReset?token=${resetToken}&id=${user.id_}`

		let userEmail //ir buscar o email
	
		await mailSender(userEmail,'Mudança de password',passwordChangeTemplate(link))

		return link
	}
	
	const resetPassword = async (userId, token, password) => {
		let passwordResetToken // ir buscar o token de um user à db
		/*
		if (!passwordResetToken) {
			throw new Error('Invalid or expired password reset token')
		}
		*/
	
		let isValid = await cryptoUtil.comparepassword(token, passwordResetToken.token)
	
		if (!isValid) {
			throw new Error('Invalid or expired password reset token')
		}
	
		const hash = await cryptoUtil.hashpassword(password)
	
		// await userServices.updateUser(params)      update do user com o token(hash)
	
		const user = await userServices.findById(userId)

		let userEmail = await //ir buscar o email
	
		await mailSender(userEmail,'Password changed successfully',passwordChangedTemplate())
	
		await passwordResetToken.deleteOne()
	
		return true
	}
	return {
		requestPasswordReset,
		resetPassword
	}
}

export default authServices