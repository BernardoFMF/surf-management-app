'use strict'

import error from '../utils/error.js'
import uploadData from '../data/uploadData.js'

const uploadServices = (db) => {
	const data = uploadData(db)

	const uploadFileServices = async (file,type) => {
		return await data.upload(file,type)
	}

    return {
		uploadFileServices, 
	}
}

export default uploadServices