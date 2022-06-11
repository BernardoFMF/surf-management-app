'use strict'

import asyncHandler from 'express-async-handler'

import uploadServices from '../services/uploadServices.js'

const uploadController = (data) => {
	const services = uploadServices(data)

	const uploadFile = asyncHandler(async (req, res) => {
		console.log(new Buffer.from(req.files.file.data).toString());
		const response = await services.uploadFileServices(req.files.file)
		res.json(response)
	})

	return {
		uploadFile
	}
}
export default uploadController