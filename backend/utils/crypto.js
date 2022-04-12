'use strict'

import bcrypt from 'bcrypt'

const comparepassword = async (clearpassword, password) => {
	return await bcrypt.compare(clearpassword, password)
}

const hashpassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	const pword =  await bcrypt.hash(password, salt)
	return pword
}

export default {
	hashpassword, 
	comparepassword
}