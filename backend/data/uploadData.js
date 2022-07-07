'use strict'

import error from '../utils/error.js'
import { toDataURL } from 'qrcode'

const uploadData = (db) => {
	const upload = async (file,type,url) => {
		if(type == "memberTypes") return await uploadMemberTypes(file)
		if(type == "usersCompanies") return await uploadUsersAndCompanies(file,url)
		if(type=="quotas") return await uploadQuotas(file)
		if(type=="sports") return await uploadSports(file)
		if(type=="sportTypes") return await uploadSportTypes(file)
		if(type=="memberSports") return await uploadUsersSports(file)
		throw error(404, 'Type does not exist', 'MESSAGE_CODE_30')
	}

	const uploadMemberTypes = async(file) => {
		let data = new Buffer.from(file).toString().split("\r\n")
		data = data.slice(1,data.length-1)
		let count = 0;
		for(let val of data){
			val = val.split(",")
			val[0] = `'${val[0]}'`
			val[2] = `'${val[2]}'`
			data[count++] = val
		}
		return await db.uploadMemberTypesData(data)
	}

	const uploadUsersAndCompanies = async(file,url) => {
		let data = new Buffer.from(file).toString().split("\r\n")
		data = data.slice(1,data.length-1)
		let users = []
		let companies = []
		let countU = 0;
		let countC = 0;
		for(let val of data){
			val = val.split(",")
			if(val[0] == "U"){
				users[countU++] = val.slice(1,val.length)
			}else {
				companies[countC++] = val.slice(1,val.length)
			}
		}
		let ids = await db.uploadUsersData(users)
		for(let userId of ids){
			const qrcode_ = await toDataURL(`${url}/validate/${userId}`)
			await db.updateUserQrCodeData(userId, qrcode_)
		}
		return await db.uploadCompaniesData(companies)
	}

	const uploadQuotas = async(file) => {
		let data = new Buffer.from(file).toString().split("\r\n")
		data = data.slice(1,data.length-1)
		let count = 0
		for(let val of data){
			val = val.split(",")
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

	const uploadSports = async(file) => {
		let data = new Buffer.from(file).toString().split("\r\n")
		data = data.slice(1,data.length-1)
		let count = 0
		for(let val of data){
			val = val.split(",")
			val[0] = `'${val[0]}'`
			val.push(false)
			data[count++] = val
		}
		console.log(data)
		return await db.uploadSportsData(data)
	}

	const uploadSportTypes = async(file) => {
		let data = new Buffer.from(file).toString().split("\r\n")
		data = data.slice(1,data.length-1)
		let count = 0
		for(let val of data){
			val = val.split(",")
			val[0] = `'${val[0]}'`
			data[count++] = val
		}
		console.log(data)
		return await db.uploadSportTypesData(data)
	}

	const uploadUsersSports = async(file) => {
		let data = new Buffer.from(file).toString().split("\r\n")
		data = data.slice(1,data.length-1)
		let count = 0
		for(let val of data){
			val = val.split(",")
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