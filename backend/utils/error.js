'use strict'

const error = (status, message) => {
	const err = new Error(message)
	err.status = status
	return err
}

export default error