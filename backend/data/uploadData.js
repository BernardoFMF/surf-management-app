'use strict'

import error from '../utils/error.js'
import { toDataURL } from 'qrcode'
import cryptoUtil from '../utils/crypto.js'
import crypto from 'crypto'
import { mailSender } from '../utils/email/mailSender.js'
import { credentialsChangeTemplate } from  '../utils/email/mailTemplates.js'

const uploadData = (db) => {
	let delimiter;

	const upload = async (file,type,url) => {
		let data = new Buffer.from(file).toString().split("\r\n")
		const checkDelimiter = data[0].includes(";")
		delimiter = checkDelimiter ? ";" : ","
		data = data.slice(1,data.length-1)
		data = data.filter(elem => {
			const rowElems = elem.split(delimiter)
			console.log(typeof(rowElems[0]));
			return !rowElems.every(rowElem => rowElem == "")
		})
		console.log(data)
		if(type == "memberTypes") return await uploadMemberTypes(data)
		if(type == "usersCompanies") return await uploadUsersAndCompanies(data,url)
		if(type=="quotas") return await uploadQuotas(data)
		if(type=="sports") return await uploadSports(data)
		if(type=="sportTypes") return await uploadSportTypes(data)
		if(type=="memberSports") return await uploadUsersSports(data)
		throw error(404, 'Type does not exist', 'MESSAGE_CODE_30')
	}

	const uploadMemberTypes = async(data) => {
		let count = 0;
		for(let val of data){
			val = val.split(delimiter)
			val[0] = `'${val[0]}'`
			val[2] = `'${val[2]}'`
			data[count++] = val
		}
		return await db.uploadMemberTypesData(data)
	}

	const uploadUsersAndCompanies = async(data, url) => {
		let users = []
		let companies = []
		let countU = 0;
		let countC = 0;
		for(let val of data){
			val = val.split(delimiter)
			if(val[0] == "U"){
				let birthDate = val[7].split("/")
				val[7] = `${birthDate[2]}-${birthDate[1]}-${birthDate[0]}`
				let enrollmentDate = val[8].split("/")
				val[8] = `${enrollmentDate[2]}-${enrollmentDate[1]}-${enrollmentDate[0]}`
				users[countU++] = val.slice(1,val.length)
			}else {
				companies[countC++] = val.slice(1,val.length)
			}
		}
		let idsUsers = await db.uploadUsersData(users)
		for(let userId of idsUsers){
			const qrcode_ = await toDataURL(`${url}/validate/${userId}`)
			await db.updateUserQrCodeData(userId, qrcode_)
		}

		let idsCompanies = await db.uploadCompaniesData(companies)

		let ids = [...idsUsers, ...idsCompanies]
		for (let id of ids) {
			try {
				let userEmail = await db.getUserEmailByIdData(id)
				
				let resetToken = crypto.randomBytes(32).toString('hex')
				const hash = await cryptoUtil.hashpassword(resetToken)

				await db.postNewCredentialsTokenData(id, hash)

				const link = url + `/change-credentials?token=${resetToken}&id=${id}`

				await mailSender(userEmail.email_, 'Alteração de credenciais', credentialsChangeTemplate(link))
			} catch (e) {
				console.log(e);
				throw e
			}
			
		}
		return ids
	}

	const uploadQuotas = async(data) => {
		let count = 0
		for(let val of data){
			val = val.split(delimiter)
			let Date = val[3].split("/") 
			val[3] = `'${Date[2]}-${Date[1]}-${Date[0]}'`
			if(val[1]){
				let paymentDate = val[1].split("/")
				val[1] = `'${paymentDate[2]}-${paymentDate[1]}-${paymentDate[0]}'`
			}else {val[1] = "null"}
			data[count++] = val
		}
		return await db.uploadQuotasData(data)
	}

	const uploadSports = async(data) => {
		console.log(data)
		let count = 0
		for(let val of data){
			val = val.split(delimiter)
			val[0] = `'${val[0]}'`
			val.push(false)
			data[count++] = val
		}
		return await db.uploadSportsData(data)
	}

	const uploadSportTypes = async(data) => {
		let count = 0
		for(let val of data){
			val = val.split(delimiter)
			val[0] = `'${val[0]}'`
			data[count++] = val
		}
		return await db.uploadSportTypesData(data)
	}

	const uploadUsersSports = async(data) => {
		let count = 0
		for(let val of data){
			val = val.split(delimiter)
			val[2] = val[2].slice(1,val[2].length-1).split("|")
			val[6] = val[6].slice(1,val[6].length-1).split("|")
			data[count++] = val
		}
		return await db.uploadUsersSportsData(data)
	}

    return { 
		upload
	}

}

export default uploadData