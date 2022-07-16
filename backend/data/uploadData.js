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
			return !rowElems.every(rowElem => rowElem == "")
		})
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
		for(let val in data){
			let value = data[val]
			value = value.split(delimiter)
			value[0] = `'${value[0]}'`
			value[2] = `'${value[2]}'`
			data[count++] = value
		}
		return await db.uploadMemberTypesData(data)
	}

	const uploadUsersAndCompanies = async(data, url) => {
		let users = []
		let companies = []
		let countU = 0;
		let countC = 0;
		for(let val in data){
			let value = data[val]
			value = value.split(delimiter)
			if(value[0] == "U"){
				let birthDate = value[7].split("/")
				value[7] = `${birthDate[2]}-${birthDate[1]}-${birthDate[0]}`
				let enrollmentDate = value[8].split("/")
				value[8] = `${enrollmentDate[2]}-${enrollmentDate[1]}-${enrollmentDate[0]}`
				users[countU++] = value.slice(1,value.length)
			}else {
				companies[countC++] = value.slice(1,value.length)
			}
		}
		let idsUsers = await db.uploadUsersData(users)
		for(let userId in idsUsers){
			const qrcode_ = await toDataURL(`${url}/validate/${idsUsers[userId]}`)
			await db.updateUserQrCodeData(userId, qrcode_)
		}

		let idsCompanies = await db.uploadCompaniesData(companies)

		let ids = [...idsUsers, ...idsCompanies]
		for (let id in ids) {
			try {
				let userEmail = await db.getUserEmailByIdData(ids[id])
				
				let resetToken = crypto.randomBytes(32).toString('hex')
				const hash = await cryptoUtil.hashpassword(resetToken)

				await db.postNewCredentialsTokenData(ids[id], hash)

				const link = url + `/change-credentials?token=${resetToken}&id=${ids[id]}`

				await mailSender(userEmail.email_, 'Alteração de credenciais', credentialsChangeTemplate(link))
			} catch (e) {
				throw e
			}
			
		}
		return ids
	}

	const uploadQuotas = async(data) => {
		let count = 0
		for(let val in data){
			let value = data[val]
			value = value.split(delimiter)
			let Date = value[3].split("/") 
			value[3] = `'${Date[2]}-${Date[1]}-${Date[0]}'`
			if(value[1]){
				let paymentDate = value[1].split("/")
				value[1] = `'${paymentDate[2]}-${paymentDate[1]}-${paymentDate[0]}'`
			}else {value[1] = "null"}
			data[count++] = value
		}
		return await db.uploadQuotasData(data)
	}

	const uploadSports = async(data) => {
		let count = 0
		for(let val in data){
			let value = data[val]
			value = value.split(delimiter)
			value[0] = `'${value[0]}'`
			value.push(false)
			data[count++] = value
		}
		return await db.uploadSportsData(data)
	}

	const uploadSportTypes = async(data) => {
		let count = 0
		for(let val in data){
			let value = data[val]
			value = value.split(delimiter)
			value[0] = `'${value[0]}'`
			data[count++] = value
		}
		return await db.uploadSportTypesData(data)
	}

	const uploadUsersSports = async(data) => {
		let count = 0
		for(let val in data){
			let value = data[val]
			value = value.split(delimiter)
			value[2] = value[2].slice(1,value[2].length-1).split("|")
			value[6] = value[6].slice(1,value[6].length-1).split("|")
			data[count++] = value
		}
		return await db.uploadUsersSportsData(data)
	}

    return { 
		upload
	}

}

export default uploadData