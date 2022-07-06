'use strict'

import asyncHandler from 'express-async-handler'

import uploadServices from '../services/uploadServices.js'

const uploadController = (data) => {
	const services = uploadServices(data)

	const uploadFile = asyncHandler(async (req, res) => {
		console.log(req.body.type)
		console.log(new Buffer.from(req.files.file.data).toString());
		const url = req.protocol + '://' + req.get('host')
		const response = await services.uploadFileServices(req.files.file.data,req.body.type,url)
		if (response) {
			res.status(201)
			res.json(user)
		}
	})

	return {
		uploadFile
	}
}
export default uploadController