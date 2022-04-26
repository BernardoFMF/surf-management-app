'use strict'

import cryptoUtil from '../utils/crypto.js'
import crypto from 'crypto'
import mailSender from '../utils/email/mailSender.js'
import { passwordChangeTemplate, passwordChangedTemplate } from  '../utils/email/mailTemplates.js'
import error from '../utils/error.js'

const authServices = (db) => { 

	const requestPasswordReset = async (id) => {
		const user = await db.getMemberByIdData(id)
		if (!user) throw new error(404, 'User does not exist')
	
		let token = await db.getMemberTokenByIdData(id) //ir buscar o token do user
		if (token) await db.deleteMemberTokenData(id) //se ja existir eliminá-lo
	
		let resetToken = crypto.randomBytes(32).toString('hex') //gerar um novo
		const hash = await cryptoUtil.hashpassword(resetToken) //encripta-lo para guardar
		
		await db.postNewTokenData(id,hash) //guardar o novo token ja encriptado
	
		const link = `/passwordReset?token=${resetToken}&id=${user.id_}`

		let userEmail = await db.getUserEmailByIdData(id)
	
		await mailSender(userEmail,'Mudança de password',passwordChangeTemplate(link))

		return link
	}
	
	const resetPassword = async (userId, token, password) => {
		let passwordResetToken = await db.getMemberTokenByIdData(userId) //verificar se o User tem um token

		if (!passwordResetToken) {
			throw new error(409, 'Invalid or expired password reset token')
		}

	
		let isValid = await cryptoUtil.comparepassword(token, passwordResetToken.token) //comparar o token
	
		if (!isValid) {
			throw new error(409, 'Invalid or expired password reset token')
		}
	
		const hash = await cryptoUtil.hashpassword(password)
		await db.deleteMemberTokenData(userId)
		await db.postNewTokenData(userId, hash) 
	
		//const user = await userServices.findById(userId)

		//let userEmail = await db.getUserEmailByIdData(userId)
	
		//await mailSender(userEmail,'Password changed successfully',passwordChangedTemplate())
	
		//await passwordResetToken.deleteOne()
	
		return true
	}
	return {
		requestPasswordReset,
		resetPassword
	}
}

export default authServices