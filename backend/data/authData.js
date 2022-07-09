'use strict'

import error from '../utils/error.js'
import cryptoUtil from '../utils/crypto.js'
import crypto from 'crypto'
import { mailSender } from '../utils/email/mailSender.js'
import { passwordChangeTemplate, passwordChangedTemplate, credentialsChangedTemplate } from  '../utils/email/mailTemplates.js'

const authData = (db) => {
	const requestPasswordReset = async (url, email) => {
		const user = await db.getMemberByEmailData(email)

		if (!user || user.is_deleted_ == true) throw error(404, 'User does not exist', 'MESSAGE_CODE_12')
        
		let token = await db.getMemberTokenByIdData(user.id_)
		if (token) await db.deleteMemberTokenData(user.id_)
		
		let resetToken = crypto.randomBytes(32).toString('hex')
		const hash = await cryptoUtil.hashpassword(resetToken)
		
		await db.postNewTokenData(user.id_, hash)
	
		const link = url + `/password-reset?token=${resetToken}&id=${user.id_}`
		
		await mailSender(email, 'Mudança de password', passwordChangeTemplate(link))

		return link
	}

    const resetPassword = async (userId, token, password) => {
        const user = await db.getMemberByIdData(userId)
		if (!user || user.is_deleted_) throw error(404, 'User does not exist', 'MESSAGE_CODE_12')
		let passwordResetToken = await db.getMemberTokenByIdData(userId)

		if (!passwordResetToken) {
			throw error(409, 'Invalid or expired password reset token', 'MESSAGE_CODE_13')
		}

		let isValid = await cryptoUtil.comparepassword(token, passwordResetToken.token_)
	
		if (!isValid) {
			throw error(409, 'Invalid or expired password reset token', 'MESSAGE_CODE_13')
		}

        let today = new Date();
        let limitDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        isValid = (limitDate.getTime() - passwordResetToken.createdat_.getTime()) > 0

        if (!isValid) throw error(409, 'Invalid or expired password reset token', 'MESSAGE_CODE_13')
	
		await db.deleteMemberTokenData(userId)

        const hash = await cryptoUtil.hashpassword(password)

        await db.changePassword(userId, hash)

        let userEmail = await db.getUserEmailByIdData(userId)

		await mailSender(userEmail.email_, 'Password foi alterada com sucesso', passwordChangedTemplate())

		return true
	}

    const changeCredentials = async (userId, token, email, username, password) => {
        const user = await db.getMemberByIdData(userId)
		if (!user || user.is_deleted_) throw error(404, 'User does not exist', 'MESSAGE_CODE_12')

		let userEmail = await db.getUserEmailByIdData(userId)

		if (userEmail.email_ != email) throw error(409, 'Email does not match', 'MESSAGE_CODE_48')

        const userByUsername = await db.getMemberByUsernameData(username)

        if (userByUsername) throw error(409, 'Member with that username already exists', 'MESSAGE_CODE_20')

		let credentialsToken = await db.getMemberTokenByIdData(userId)

		if (!credentialsToken) {
			throw error(409, 'Invalid or expired password reset token', 'MESSAGE_CODE_13')
		}

		let isValid = await cryptoUtil.comparepassword(token, credentialsToken.token_)
	
		if (!isValid) {
			throw error(409, 'Invalid or expired password reset token', 'MESSAGE_CODE_13')
		}
	
		await db.deleteMemberTokenData(userId)

        const hash = await cryptoUtil.hashpassword(password)

        await db.changeCredentials(userId, username, hash)

		await mailSender(userEmail.email_, 'Credenciais foram alteradas com sucesso', credentialsChangedTemplate())

		return true
	}

	return {
		requestPasswordReset,
        resetPassword,
		changeCredentials
	} 
}


export default authData