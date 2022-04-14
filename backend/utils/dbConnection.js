import pg from 'pg'

import dotenv from 'dotenv'

dotenv.config()

const pool = new pg.Pool({
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	database: process.env.PG_DB
})

export default pool