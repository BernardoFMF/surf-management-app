'use strict'

import asyncHandler from 'express-async-handler'

import uploadServices from '../services/uploadServices.js'

const uploadController = (data) => {
	const services = uploadServices(data)

	const uploadFile = asyncHandler(async (req, res) => {
		console.log(req.body.type)
		console.log(new Buffer.from(req.files.file.data).toString());
		console.log(req.body.type);
		const response = await services.uploadFileServices(req.files.file.data,req.body.type)
		res.json(response)
	})

	return {
		uploadFile
	}
}
export default uploadController