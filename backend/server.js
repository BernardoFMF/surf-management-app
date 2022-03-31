'use strict'

import express from 'express'
import yaml from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import dotenv from 'dotenv'

dotenv.config()
const openapi = yaml.load('./openapi.yaml')
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})