'use strict'

import error from '../utils/error.js'
import uploadData from '../data/uploadData.js'

const uploadServices = (db) => {
	const data = uploadData(db)

	const uploadFileServices = async (file,type,url) => {
		if(!file) throw error(400, 'Parameter not found: file', 'MESSAGE_CODE_14')
		if(!type) throw error(400, 'Parameter not found: type', 'MESSAGE_CODE_14')
		return await data.upload(file,type,url)
	}

    return {
		uploadFileServices, 
	}
}

export default uploadServices