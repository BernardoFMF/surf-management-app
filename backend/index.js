'use strict'

import express from 'express'

import dotenv from 'dotenv'

import server from './server.js'

dotenv.config()

import data from './data/__mock__/mockDataAccess.js'
//import db from './data/__db__/dbDataAccess.js'
//const data = db(process.env.PG_USER, process.env.PG_PASSWORD, process.env.PG_HOST, process.env.PG_PORT, process.env.PG_DB, process.env.NODE_ENV)

const app = express()

server(app, data)

const PORT = process.env.PORT || 8080
	
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})