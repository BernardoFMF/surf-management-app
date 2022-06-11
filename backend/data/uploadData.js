'use strict'

import error from '../utils/error.js'

const uploadData = (db) => {
	const upload = async (file) => {
		console.log(file)
		return file
	}

    return { 
		upload
	}

}

export default uploadData