import pg from 'pg'

const pool = (PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DB, mode) => {
	const creds = {
		user: PG_USER,
		password: PG_PASSWORD,
		host: PG_HOST,
		port: PG_PORT,
		database: PG_DB,
	}
	if (mode == 'production') {
		creds.ssl = {
			rejectUnauthorized: false
		}
	}
	return new pg.Pool(creds)
}
	

export default pool