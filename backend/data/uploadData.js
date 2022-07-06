'use strict'

import error from '../utils/error.js'
import { toDataURL } from 'qrcode'

const uploadData = (db) => {
	const upload = async (file,type,url) => {
		if(type == "memberTypes") return await uploadMemberTypes(file)
		if(type == "usersCompanies") return await uploadUsersAndCompanies(file,url)
		if(type=="quotas") return await uploadQuotas(file)
		return file
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
		console.log(ids)
		for(let userId of ids){
			const qrcode_ = await toDataURL(`${url}/validate/${userId}`)
			console.log(qrcode_)
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
			val[2] = `'${val[2]}'`
			val[3] = `'${val[3]}'`
			data[count++] = val
		}
		return await db.uploadQuotasData(data)
	}

    return { 
		upload
	}

}

export default uploadData