'use strict'

const error = (status, message, message_code) => {
	const err = new Error(message)
	err.status = status || 500
	err.message_code = message_code || "MESSAGE_CODE_2"
	return err
}

export default error