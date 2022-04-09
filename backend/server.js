'use strict'

import express from 'express'
//import yaml from 'yamljs'
//import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'


import errorHandler from './middlewares/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import sportRoutes from './routes/sportRoutes.js'
//import candidateRoutes from './routes/candidateRoutes.js'
//import companyRoutes from './routes/companyRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import quotaRoutes from './routes/quotaRoutes.js'


const router = (app, data) => {
	//const openapi = yaml.load('./openapi.yaml')
	
	app.use(express.json())
	
	app.use(express.urlencoded({ extended: true }))
	app.use(express.static('public'))
	app.use(cookieParser())
	app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
	app.use(passport.initialize())
	app.use(passport.session())
	
	app.use('/api/users', userRoutes(data))
	app.use('/api/sports', sportRoutes(data))
	//app.use('/api/candidates', candidateRoutes(data))
	//app.use('/api/companies', companyRoutes(data))
	app.use('/api/events', eventRoutes(data))
	app.use('/api/quotas', quotaRoutes(data))
	
	app.use(errorHandler)
}

export default router