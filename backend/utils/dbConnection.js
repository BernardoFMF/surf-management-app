import pg from 'pg'

const pool = (PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DB) => 
	new pg.Pool({
		user: PG_USER,
		password: PG_PASSWORD,
		host: PG_HOST,
		port: PG_PORT,
		database: PG_DB,
		ssl: {
			rejectUnauthorized: false
		}
	})

export default pool