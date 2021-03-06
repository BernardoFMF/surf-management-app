'use strict'

import error from '../utils/error.js'
import { toDataURL } from 'qrcode'
import { mailSender } from '../utils/email/mailSender.js'
import { approvalTemplate } from  '../utils/email/mailTemplates.js'
import crypto from '../utils/crypto.js'

const candidateData = (db) => {
	const getCandidates = async (username_filter,name_filter,email_filter,offset,limit) => {
		return await db.getCandidatesData(username_filter,name_filter,email_filter,offset,limit)
	}
	
	const getCandidateById = async (id_) => {
		const candidate = await db.getCandidateByIdData(id_)
		if (!candidate) throw error(404, 'Candidate does not exist', 'MESSAGE_CODE_15')
		return candidate
	}
	
	const postCandidate = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_, iban_) => {
		let candidate = await db.getCandidateByUsernameData(username_)
		if (candidate) throw error(409, 'Candidate with that username already exists', 'MESSAGE_CODE_16')
		candidate = await db.getCandidateByCCData(cc_)
		if (candidate) throw error(409, 'Candidate with that cc already exists', 'MESSAGE_CODE_17')
		candidate = await db.getCandidateByNifData(nif_)
		if (candidate) throw error(409, 'Candidate with that nif already exists', 'MESSAGE_CODE_18')
		candidate = await db.getCandidateByEmailData(email_)
		if (candidate) throw error(409, 'Candidate with that email already exists', 'MESSAGE_CODE_19')
		candidate = await db.getCandidateByIbanData(iban_)
		if (candidate) throw error(409, 'Candidate with that iban already exists', 'MESSAGE_CODE_37')


		let member = await db.getMemberByUsernameData(username_)
		if (member) throw error(409, 'Member with that username already exists', 'MESSAGE_CODE_20')
		member = await db.getMemberByCCData(cc_)
		if (member) throw error(409, 'Member with that cc already exists', 'MESSAGE_CODE_21')
		member = await db.getMemberByNifData(nif_)
		if (member) throw error(409, 'Member with that nif already exists', 'MESSAGE_CODE_22')
		member = await db.getMemberByEmailData(email_)
		if (member) throw error(409, 'Member with that email already exists', 'MESSAGE_CODE_23')
		member = await db.getMemberByIbanData(iban_)
		if (member) throw error(409, 'Member with that iban already exists', 'MESSAGE_CODE_38')

		return await db.postCandidateData(username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_, iban_)
	}
	
	const deleteCandidate = async (id_) => {
		await getCandidateById(id_)
		return await db.deleteCandidateData(id_)
	}
	
	const approveCandidate = async (id_, type_, paid_enrollment_, url, sendEmail) => {
		const candidate = await getCandidateById(id_)
		
		const u_id_ = await db.approveCandidateData(id_, type_, paid_enrollment_)
		const member = await db.getMemberByIdData(u_id_)
		const qrcode_ = await toDataURL(`${url}/validate/${u_id_}`)

		const pin_ = crypto.generatePin(4)

		await db.updateUserQrCodeData(u_id_, qrcode_, pin_)
		
		if(sendEmail == undefined || sendEmail)
			await mailSender([candidate.email_],`Aprova????o de candidatura`, approvalTemplate(candidate.full_name_, member.member_type_))

		return u_id_
	}

	return {
		getCandidates, 
		getCandidateById, 
		postCandidate, 
		deleteCandidate, 
		approveCandidate
	} 
}


export default candidateData