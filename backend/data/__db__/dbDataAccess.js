import dotenv from 'dotenv'

dotenv.config()

import pl from '../../utils/dbConnection.js'
import error from '../../utils/error.js'
import queries from './dbQueries.js'

const db = (PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DB) => {

	const pool = pl(PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DB)
	/**
	 * Candidates
	 */

	const getCandidatesData = async () => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(queries.QUERY_GET_CANDIDATES)
			await client.query('Commit')
			return candidates.rows
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getCandidateByIdData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(queries.QUERY_GET_CANDIDATE_BY_ID, [id_])
			await client.query('Commit')
			return candidates.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postCandidateData = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidate = await client.query(queries.QUERY_POST_CANDIDATE, [nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_, img_, gender_])
			await client.query('Commit')
			return candidate.rows[0].id_
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const deleteCandidateData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			await client.query(queries.QUERY_DELETE_CANDIDATE, [id_])
			await client.query('Commit')
			return id_
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const approveCandidateData = async (id_, type_, quota_value_, paid_enrollment_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const result = await client.query(queries.QUERY_APPROVE_CANDIDATE, [id_, type_, quota_value_, paid_enrollment_, 0])
			await client.query('Commit')
			return result.rows[0].new_id
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getCandidateByUsernameData = async (username_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(queries.QUERY_GET_CANDIDATE_BY_USERNAME, [username_])
			await client.query('Commit')
			return candidates.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	/**
	 * Companies
	 */

	const getCompaniesData = async () => {
		const company = await pool.connect()
		try {
			await company.query('Begin')
			const candidates = await company.query(queries.QUERY_GET_COMPANIES)
			await company.query('Commit')
			return candidates.rows
		} catch(e) {
			await company.query('Rollback')
			throw e
		} finally {
			company.release()
		}
	}

	const getCompanyByIdData = async (id_) => {
		const company = await pool.connect()
		try {
			await company.query('Begin')
			const candidates = await company.query(queries.QUERY_GET_COMPANY_BY_ID, [id_])
			await company.query('Commit')
			return candidates.rows[0]
		} catch(e) {
			await company.query('Rollback')
			throw e
		} finally {
			company.release()
		}
	}

	const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_) => {
		const company = await pool.connect()
		try {
			await company.query('Begin')
			const result = await company.query(queries.QUERY_POST_COMPANY, [name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, 0])
			await company.query('Commit')
			return result.rows[0].new_id_
		} catch(e) {
			await company.query('Rollback')
			throw e
		} finally {
			company.release()
		}
	}

	const updateCompanyData = async (cid_, name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
		const company = await pool.connect()
		try {
			await company.query('Begin')
			await company.query(queries.QUERY_UPDATE_COMPANY, [cid_, name_, nif_, phone_number_, email_, postal_code_, address_, location_])
			await company.query('Commit')
			return cid_
		} catch(e) {
			await company.query('Rollback')
			throw error(500,'Internal server error')
		} finally {
			company.release()
		}
	}

	const deleteCompanyData = async (id_) => {
		const company = await pool.connect()
		try {
			await company.query('Begin')
			await company.query(queries.QUERY_DELETE_COMPANY, [id_])
			await company.query('Commit')
			return id_
		} catch(e) {
			await company.query('Rollback')
			throw error(500,'Internal server error')
		} finally {
			company.release()
		}
	}

	/**
	 * Sports
	 */

	const getSportsData = async () => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const sports = await client.query(queries.QUERY_GET_SPORTS)
			await client.query('Commit')
			return sports.rows
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getSportByIdData = async (sid_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const sports = await client.query(queries.QUERY_GET_SPORT_BY_ID, [sid_])
			await client.query('Commit')
			return sports.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postSportData = async (name_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const sports = await client.query(queries.QUERY_POST_SPORT, [name_])
			await client.query('Commit')
			return sports.rows[0].id_
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const deleteSportData = async (sid_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			await client.query(queries.QUERY_DELETE_SPORT, [sid_])
			await client.query('Commit')
			return sid_
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	/**
	 * Events
	 */

	const getEventsData = async () => {
		const events = await pool.connect()
		try {
			await events.query('Begin')
			const eventsResult = await events.query(queries.QUERY_GET_EVENTS)
			await events.query('Commit')
			return eventsResult.rows
		} catch(e) {
			await events.query('Rollback')
			throw error(500,'Internal server error')
		} finally {
			events.release()
		}
	}

	const getEventByIdData = async (id_) => {
		const events = await pool.connect()
		try {
			await events.query('Begin')
			const eventResult = await events.query(queries.QUERY_GET_EVENT_BY_ID, [id_])
			await events.query('Commit')
			return eventResult.rows[0]
		} catch(e) {
			await events.query('Rollback')
			throw error(500,'Internal server error')
		} finally {
			events.release()
		}
	}

	const postEventData = async (name_,initial_date_,end_date_) => {
		const events = await pool.connect()
		try {
			await events.query('Begin')
			const eventResult = await events.query(queries.QUERY_POST_EVENT, [name_,initial_date_,end_date_])
			await events.query('Commit')
			return eventResult.rows[0].id_
		} catch(e) {
			await events.query('Rollback')
			throw error(500,'Internal server error')
		} finally {
			events.release()
		}
	}

	const updateEventData = async (id_, name_, initial_date_, end_date_) => {
		const events = await pool.connect()
		try {
			await events.query('Begin')
			await events.query(queries.QUERY_UPDATE_EVENT, [name_,initial_date_,end_date_, id_])
			await events.query('Commit')
			return id_
		} catch(e) {
			await events.query('Rollback')
			throw error(500,'Internal server error')
		} finally {
			events.release()
		}
	}

	const deleteEventData = async (id_) => {
		const events = await pool.connect()
		try {
			await events.query('Begin')
			await events.query(queries.QUERY_DELETE_EVENT, [id_])
			await events.query('Commit')
			return id_
		} catch(e) {
			await events.query('Rollback')
			throw error(500,'Internal server error')
		} finally {
			events.release()
		}
	}

	const postMemberAttendanceData = async (eid_, id_, state_ ) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			await client.query(queries.QUERY_POST_ATTENDANCE,[id_, eid_, state_ ])
			await client.query('Commit')
			return {eid_, id_}
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateMemberAttendanceData = async (eid_, id_, state_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			await client.query(queries.QUERY_UPDATE_ATTENDANCE,[eid_, id_, state_ ])
			await client.query('Commit')
			return {eid_, id_}
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getEventByIdAttendanceData = async (eid_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const result = await client.query(queries.QUERY_GET_ATTENDANCE,[eid_])
			await client.query('Commit')
			return result.rows
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	/**
	 * Users
	 */

	const getUsersData = async () => {
		const client = await pool.connect()
		try {
			const result = await client.query(queries.QUERY_GET_USERS)
			return result.rows
		} finally {
			client.release()
		}
	}

	const getUserByIdData = async (id_) => {
		const client = await pool.connect()
		try {
			const result = await client.query(queries.QUERY_GET_USER_BY_ID, [id_])
			return result.rows[0]
		} finally {
			client.release()
		}
	}

	const postUserData = async (cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_POST_USER, [cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_, 0])
			await client.query('commit')
			return result.rows[0].new_id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateUserData = async (id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_USER, [id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, is_admin_, paid_enrollment_, is_deleted_, gender_])
			await client.query('commit')
			return id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const deleteUserData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_DELETE_USER, [id_])
			await client.query('commit')
			return id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getUsersSportsData = async () => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_USERS_SPORTS)
			await client.query('commit')
			return result.rows
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getUsersSportData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_USERS_SPORT, [id_])
			await client.query('commit')
			return result.rows
		} catch (e) {
			await client.query('rollback')
			throw e
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
			throw e
		} finally {
			client.release()
		}
	}

	const postUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_POST_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_])
			await client.query('commit')
			return {id_, sid_}
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_])
			await client.query('commit')
			return {id_, sid_}
		} catch (e) {
			await client.query('rollback')
			throw e
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
			throw e
		} finally {
			client.release()
		}
	}

	/**
	 * Quotas
	 */
	const getQuotasData = async () => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_QUOTAS)
			await client.query('commit')
			return result.rows
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getCompaniesQuotasData = async () => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_COMPANIES_QUOTAS)
			await client.query('commit')
			return result.rows
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getUsersQuotasData = async () => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_USERS_QUOTAS)
			await client.query('commit')
			return result.rows
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}    
	}

	const getMemberQuotasByIdData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_MEMBERS_QUOTAS_BY_ID, [id_])
			await client.query('commit')
			return result.rows
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postQuotaData = async (date_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_POST_QUOTA, [date_, 0])
			await client.query('commit')
			return result.rows[0].count_date
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateMemberQuotaData = async (qid_, payment_date_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_MEMBER_QUOTA, [payment_date_, qid_])
			await client.query('commit')
			return qid_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberByIdData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_ID, [id_])
			await client.query('commit')
			return result.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberByUsernameData = async (username_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_USERNAME, [username_])
			await client.query('commit')
			return result.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getQuotaByIdData = async (qid_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_QUOTA_BY_ID, [qid_])
			await client.query('commit')
			return result.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	// Not tested - 15/04
	const getEmails = async () => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_EMAILS)
			await client.query('commit')
			return result.rows
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getUserEmailByIdData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const email = await client.query(queries.QUERY_GET_USER_EMAIL,[id_])
			await client.query('commit')
			return email
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateUserQrCodeData = async (id_, qrcode_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_QRCODE, [id_, qrcode_])
			await client.query('commit')
			return id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postNewTokenData = async(user_id_, token) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_POST_NEW_TOKEN, [user_id_, token])
			await client.query('commit')
			return user_id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberTokenByIdData = async(id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_MEMBER_TOKEN, [id_])
			await client.query('commit')
			return result
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const deleteMemberTokenData = async(id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_DELETE_MEMBER_TOKEN, [id_])
			await client.query('commit')
			return id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateMemberTokenData = async(id_, new_token) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_MEMBER_TOKEN, [id_, new_token])
			await client.query('commit')
			return id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	return { getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCandidateByUsernameData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getSportsData, getSportByIdData, postSportData, deleteSportData, getUsersData, getUserByIdData, postUserData, updateUserData, deleteUserData, getUsersSportsData, getUsersSportData, getUserSportsByIdData, postUserSportData, updateUserSportData, deleteUserSportData, getQuotasData, getCompaniesQuotasData, getUsersQuotasData, getMemberQuotasByIdData, postQuotaData, updateMemberQuotaData, getMemberByIdData, getMemberByUsernameData, getQuotaByIdData, getEmails,getUserEmailByIdData, updateUserQrCodeData, getMemberTokenByIdData, deleteMemberTokenData, updateMemberTokenData, postNewTokenData, pool }

}

export default db