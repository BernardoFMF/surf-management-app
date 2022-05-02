'use strict'

const errorHandler = (err, req, res, next) => {
	const status = err.status
	res.status(status || 500)
	res.json({message : err.message, message_code: err.message_code})
}

export default errorHandler