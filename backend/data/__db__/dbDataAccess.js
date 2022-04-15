import pool from '../../utils/dbConnection.js'
import error from '../../utils/error.js'
import queries from './dbQueries.js'


/**
 * Candidates
 */

const getCandidatesData = async () => {
	try {
		await pool.query('Begin')
		const candidates = await pool.query(queries.QUERY_GET_CANDIDATES)
		await pool.query('Commit')
		return candidates.rows
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const getCandidateByIdData = async (id_) => {
	try {
		await pool.query('Begin')
		const candidates = await pool.query(queries.QUERY_GET_CANDIDATE_BY_ID, [id_])
		await pool.query('Commit')
		return candidates.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const postCandidateData = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_) => {
	try {
		await pool.query('Begin')
		const candidate = await pool.query(queries.QUERY_POST_CANDIDATE, [nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_])
		await pool.query('Commit')
		return candidate.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const deleteCandidateData = async (id_) => {
	try {
		await pool.query('Begin')
		await pool.query(queries.QUERY_DELETE_CANDIDATE, [id_])
		await pool.query('Commit')
		return id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const approveCandidateData = async (id_, type_, quota_value_, qrcode_, paid_enrollment_) => {
	try {
		await pool.query('Begin')
		const result = await pool.query(queries.QUERY_APPROVE_CANDIDATE, [id_, type_, quota_value_, qrcode_, paid_enrollment_, 0])
		await pool.query('Commit')
		return result.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const getCandidateByUsernameData = async (username_) => {
	try {
		await pool.query('Begin')
		const candidates = await pool.query(queries.QUERY_GET_CANDIDATE_BY_USERNAME, [username_])
		await pool.query('Commit')
		return candidates.rows
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

/**
 * Companies
 */

const getCompaniesData = async () => {
	try {
		await pool.query('Begin')
		const candidates = await pool.query(queries.QUERY_GET_COMPANIES)
		await pool.query('Commit')
		return candidates.rows
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const getCompanyByIdData = async (id_) => {
	try {
		await pool.query('Begin')
		const candidates = await pool.query(queries.QUERY_GET_COMPANY_BY_ID, [id_])
		await pool.query('Commit')
		return candidates.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_) => {
	try {
		await pool.query('Begin')
		const result = await pool.query(queries.QUERY_POST_COMPANY, [name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, 0])
		await pool.query('Commit')
		return result.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const updateCompanyData = async (cid_, name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
	try {
		await pool.query('Begin')
		const result = await pool.query(queries.QUERY_UPDATE_COMPANY, [cid_, name_, nif_, phone_number_, email_, postal_code_, address_, location_, 0])
		await pool.query('Commit')
		return result.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const deleteCompanyData = async (id_) => {
	try {
		await pool.query('Begin')
		await pool.query(queries.QUERY_DELETE_COMPANY, [id_])
		await pool.query('Commit')
		return id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

/**
 * Sports
 */

const getSportsData = async () => {
	try {
		await pool.query('Begin')
		const sports = await pool.query(queries.QUERY_GET_SPORTS)
		await pool.query('Commit')
		return sports.rows
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const getSportByIdData = async (sid_) => {
	try {
		await pool.query('Begin')
		const sports = await pool.query(queries.QUERY_GET_SPORT_BY_ID, [sid_])
		await pool.query('Commit')
		return sports.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const postSportData = async (name_) => {
	try {
		await pool.query('Begin')
		const sports = await pool.query(queries.QUERY_POST_SPORT, [name_])
		await pool.query('Commit')
		return sports.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const deleteSportData = async (sid_) => {
	try {
		await pool.query('Begin')
		await pool.query(queries.QUERY_DELETE_SPORT, [sid_])
		await pool.query('Commit')
		return sid_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

/**
 * Events
 */

const getEventsData = async () => {
	try {
		await pool.query('Begin')
		const events = await pool.query(queries.QUERY_GET_EVENTS)
		await pool.query('Commit')
		return events.rows
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const getEventByIdData = async (id_) => {
	try {
		await pool.query('Begin')
		const event = await pool.query(queries.QUERY_GET_EVENT_BY_ID, [id_])
		await pool.query('Commit')
		return event.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const postEventData = async (name_,initial_date_,end_date_) => {
	try {
		await pool.query('Begin')
		const event = await pool.query(queries.QUERY_POST_EVENT, [name_,initial_date_,end_date_])
		await pool.query('Commit')
		return event.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const updateEventData = async (id_, name_, initial_date_, end_date_) => {
	try {
		await pool.query('Begin')
		const event = await pool.query(queries.QUERY_UPDATE_EVENT, [name_,initial_date_,end_date_, id_])
		await pool.query('Commit')
		return event.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const deleteEventData = async (id_) => {
	try {
		await pool.query('Begin')
		await pool.query(queries.QUERY_DELETE_EVENT, [id_])
		await pool.query('Commit')
		return id_
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const postMemberAttendanceData = async (eid_, id_, state_ ) => {
	try {
		await pool.query('Begin')
		await pool.query(queries.QUERY_POST_ATTENDANCE,[eid_, id_, state_ ])
		await pool.query('Commit')
		return {eid_, id_}
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const updateMemberAttendanceData = async (eid_, id_, state_) => {
	try {
		await pool.query('Begin')
		await pool.query(queries.QUERY_UPDATE_ATTENDANCE,[eid_, id_, state_ ])
		await pool.query('Commit')
		return {eid_, id_}
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

const getEventByIdAttendanceData = async (eid_) => {
	try {
		await pool.query('Begin')
		const result = await pool.query(queries.QUERY_GET_ATTENDANCE,[eid_])
		await pool.query('Commit')
		return result.rows
	} catch(e) {
		await pool.query('Rollback')
		throw error(500,'Internal server error')
	} finally {
		pool.release()
	}
}

/**
 * Users
 */

const getUsersData = async () => {
	const client = await pool.connect()
	try {
		const result = await pool.query(queries.QUERY_GET_USERS)
		return result.rows
	} catch (e) {
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getUserByIdData = async (id_) => {
	const client = await pool.connect()
	try {
		const result = await pool.query(queries.QUERY_GET_USER_BY_ID, [id_])
		return result.rows[0]
	} catch (e) {
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const postUserData = async (cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, qr_code_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_POST_USER, [cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, qr_code_, paid_enrollment_, 0])
		await client.query('commit')
		return result.rows.id
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const updateUserData = async (id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		await pool.query(queries.QUERY_UPDATE_USER, [id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, is_admin_, paid_enrollment_])
		await client.query('commit')
		return id_
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const deleteUserData = async (id_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		await pool.query(queries.QUERY_DELETE_USER, [id_])
		await client.query('commit')
		return id_
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getUsersSportsData = async (id_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_USERS_SPORTS, [id_])
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getUsersSportData = async (id_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_USERS_SPORT, [id_])
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getUserSportsByIdData = async (id_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_USER_SPORTS_BY_ID, [id_])
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const postUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		await pool.query(queries.QUERY_POST_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_])
		await client.query('commit')
		return {id_, sid_}
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	} 
}

const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		await pool.query(queries.QUERY_UPDATE_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_])
		await client.query('commit')
		return {id_, sid_}
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const deleteUserSportData = async (id_, sid_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		await pool.query(queries.QUERY_DELETE_USER_SPORT, [id_, sid_])
		await client.query('commit')
		return {id_, sid_}
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getQuotasData = async () => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_QUOTAS)
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getCompaniesQuotasData = async () => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_COMPANIES_QUOTAS)
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getUsersQuotasData = async () => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_USERS_QUOTAS)
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}    
}

const getMemberQuotasByIdData = async (id_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_MEMBERS_QUOTAS_BY_ID, [id_])
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const postQuotaData = async (date_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_POST_QUOTA, [date_])
		await client.query('commit')
		return result.rows[0].num_
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const updateMemberQuotaData = async (qid_, payment_date_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		await pool.query(queries.QUERY_UPDATE_MEMBER_QUOTA, [qid_, payment_date_])
		await client.query('commit')
		return qid_
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getMemberByIdData = async (id_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_MEMBER_BY_ID, [id_])
		await client.query('commit')
		return result.rows[0]
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getMemberByUsernameData = async (username_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_MEMBER_BY_USERNAME, [username_])
		await client.query('commit')
		return result.rows[0]
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getQuotaByIdData = async (qid_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_QUOTA_BY_ID, [qid_])
		await client.query('commit')
		return result.rows[0]
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const getEmails = async () => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(queries.QUERY_GET_EMAILS)
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const updateUserQrCodeData = async (id_, qrcode_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		await pool.query(queries.QUERY_UPDATE_QRCODE, [id_, qrcode_])
		await client.query('commit')
		return id_
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const db_data = { getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCandidateByUsernameData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getSportsData, getSportByIdData, postSportData, deleteSportData, getUsersData, getUserByIdData, postUserData, updateUserData, deleteUserData, getUsersSportsData, getUsersSportData, getUserSportsByIdData, postUserSportData, updateUserSportData, deleteUserSportData, getQuotasData, getCompaniesQuotasData, getUsersQuotasData, getMemberQuotasByIdData, postQuotaData, updateMemberQuotaData, getMemberByIdData, getMemberByUsernameData, getQuotaByIdData, getEmails, updateUserQrCodeData }

export default db_data