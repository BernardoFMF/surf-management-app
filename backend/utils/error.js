'use strict'

const error = (status, message, message_code) => {
	const err = new Error(message)
	err.status = status
	err.message_code = message_code
	return err
}

export default error