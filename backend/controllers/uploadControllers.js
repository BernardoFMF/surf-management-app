'use strict'

import asyncHandler from 'express-async-handler'

import uploadServices from '../services/uploadServices.js'

const uploadController = (data) => {
	const services = uploadServices(data)

	const uploadFile = asyncHandler(async (req, res) => {
		const url = req.protocol + '://' + req.get('host')
		const response = await services.uploadFileServices(req.files.file.data,req.body.type,url)
		if (response) {
			res.status(201)
			res.json(response)
		}
	})

	return {
		uploadFile
	}
}
export default uploadController