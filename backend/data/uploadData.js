'use strict'

import error from '../utils/error.js'

const uploadData = (db) => {
	const upload = async (file,type) => {
		if(type == "memberTypes") uploadMemberTypes(file)
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
		console.log(data)
		console.log('chegou')
		db.uploadMemberTypesData(data)
	}

    return { 
		upload
	}

}

export default uploadData