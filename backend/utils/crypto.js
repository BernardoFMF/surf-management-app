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

const generatePin = (length) => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export default {
	hashpassword, 
	comparepassword,
	generatePin
}