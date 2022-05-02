'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import yaml from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import passport from 'passport'
import localStrategy from 'passport-local'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import crypto from './utils/crypto.js'
import errorHandler from './middlewares/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import sportRoutes from './routes/sportRoutes.js'
import candidateRoutes from './routes/candidateRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import quotaRoutes from './routes/quotaRoutes.js'
import authRoutes from './routes/authRoutes.js'
import error from './utils/error.js'


const router = (app, data) => {
	const openapi = yaml.load(process.cwd() + '/backend/openApi.yaml')
	
	const LocalStrategy = localStrategy.Strategy

	//app.use(express.json())
	app.use(bodyParser.json({limit: "50mb"}))
	
	app.use(express.urlencoded({ extended: true, limit: "50mb" }))
	app.use(express.static('public'))
	app.use(cookieParser())
	app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
	app.use(passport.initialize())
	app.use(passport.session())

	passport.serializeUser((user, done) => {
		done(null, user.username_)
	})

	passport.deserializeUser(async (username, done) => {
		try {
			const member = await data.getMemberByUsernameData(username)
			if(!member) {
				done(null, false)
			} else {
				if (member.member_type_ != 'corporate') {
					const user = await data.getUserByIdData(member.id_)
					member.is_admin_ = user.is_admin_
				}
				done(null, member)
			}
		} catch (err) {
			done(err, false)
		}
	})

	passport.use(new LocalStrategy(
		async (username, password, done) => {
			try {
				const member = await data.getMemberByUsernameData(username)
				if(!member) {
					done(error(401, 'Incorrect username', 'MESSAGE_CODE_1'), false, null)
				} else {
					if(await crypto.comparepassword(password, member.pword_)) {
						done(null, member)
					} else {
						done(error(401, 'Incorrect password', 'MESSAGE_CODE_1'), false, null)
					}
				}
			} catch (err) {
				console.log(err)
				done(err, false)
			}
		}
	))
	
	app.use('/api/users', userRoutes(data))
	app.use('/api/sports', sportRoutes(data))
	app.use('/api/candidates', candidateRoutes(data))
	app.use('/api/companies', companyRoutes(data))
	app.use('/api/events', eventRoutes(data))
	app.use('/api/quotas', quotaRoutes(data))
	app.use('/api/members', authRoutes(data))
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi))

	app.use(errorHandler)
}

export default router