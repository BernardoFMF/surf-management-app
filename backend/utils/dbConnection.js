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
	const connector = new pg.Pool(creds)

	return async (transactionHandler) => {
		const client = await connector.connect()
		try {
			await client.query('Begin')
			const result = await transactionHandler(client)
			await client.query('Commit')
			return result
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}
}
	

export default pool