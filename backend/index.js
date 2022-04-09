'use strict'

import express from 'express'

import dotenv from 'dotenv'

import data from './data/__mock__/mock.js'
//import data from './data/__db__/db.js'

import server from './server.js'

dotenv.config()

const app = express()

server(app, data)

const PORT = process.env.PORT_NUMBER || 8080
	
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})