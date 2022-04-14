import pool from '../../utils/dbConnection.js'
import error from '../../utils/error.js'
import {QUERY_GET_USERS, QUERY_GET_USER_BY_ID, QUERY_POST_USER, QUERY_UPDATE_USER, QUERY_DELETE_USER, QUERY_GET_USERS_SPORTS, QUERY_GET_USERS_SPORT, QUERY_GET_USER_SPORTS_BY_ID, QUERY_POST_USER_SPORT, QUERY_UPDATE_USER_SPORT, QUERY_DELETE_USER_SPORT, QUERY_GET_QUOTAS, QUERY_GET_COMPANIES_QUOTAS, QUERY_GET_USERS_QUOTAS, QUERY_GET_MEMBERS_QUOTAS_BY_ID, QUERY_POST_QUOTA, QUERY_UPDATE_MEMBER_QUOTA, QUERY_GET_MEMBER_BY_ID, QUERY_GET_MEMBER_BY_USERNAME, QUERY_QUOTA_BY_ID, QUERY_GET_EMAILS, QUERY_UPDATE_QRCODE} from './dbQueries.js'

const getCandidatesData = async () => {

}

const getCandidateByIdData = async () => {
    
}

const postCandidateData = async () => {
    
}

const deleteCandidateData = async () => {
    
}

const approveCandidateData = async () => {
    
}

const getCandidateByUsernameData = async () => {
    
}

const getCompaniesData = async () => {
    
}

const getCompanyByIdData = async () => {
    
}

const postCompanyData = async () => {
    
}

const updateCompanyData = async () => {
    
}

const deleteCompanyData = async () => {
    
}

const getEventsData = async () => {
    
}

const getEventByIdData = async () => {
    
}

const postEventData = async () => {
    
}

const updateEventData = async () => {
    
}

const deleteEventData = async () => {
    
}

const postMemberAttendanceData = async () => {
    
}

const updateMemberAttendanceData = async () => {
    
}

const getEventByIdAttendanceData = async () => {
    
}

const getSportsData = async () => {
    
}

const getSportByIdData = async () => {
    
}

const postSportData = async () => {
    
}

const deleteSportData = async () => {
    
}

const getUsersData = async () => {
	const client = await pool.connect()
	try {
		const result = await pool.query(QUERY_GET_USERS)
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
		const result = await pool.query(QUERY_GET_USER_BY_ID, [id_])
		return result.rows[0]
	} catch (e) {
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const postUserData = async (cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(QUERY_POST_USER, [cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, 0])
		await client.query('commit')
		return result.rows.id
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const updateUserData = async (id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, img_name_, paid_enrollment_, is_admin_) => {
	const client = await pool.connect()
	try {
		await client.query('begin')
		const result = await pool.query(QUERY_UPDATE_USER, [id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, img_name_, paid_enrollment_, is_admin_, 0])
		await client.query('commit')
		return result.rows[0].id_
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
		await pool.query(QUERY_DELETE_USER, [id_])
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
		const result = await pool.query(QUERY_GET_USERS_SPORTS, [id_])
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
		const result = await pool.query(QUERY_GET_USERS_SPORT, [id_])
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
		const result = await pool.query(QUERY_GET_USER_SPORTS_BY_ID, [id_])
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
		await pool.query(QUERY_POST_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_])
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
		await pool.query(QUERY_UPDATE_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_])
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
		await pool.query(QUERY_DELETE_USER_SPORT, [id_, sid_])
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
		const result = await pool.query(QUERY_GET_QUOTAS)
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
		const result = await pool.query(QUERY_GET_COMPANIES_QUOTAS)
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
		const result = await pool.query(QUERY_GET_USERS_QUOTAS)
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
		const result = await pool.query(QUERY_GET_MEMBERS_QUOTAS_BY_ID, [id_])
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
		const result = await pool.query(QUERY_POST_QUOTA, [date_])
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
		await pool.query(QUERY_UPDATE_MEMBER_QUOTA, [qid_, payment_date_])
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
		const result = await pool.query(QUERY_GET_MEMBER_BY_ID, [id_])
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
		const result = await pool.query(QUERY_GET_MEMBER_BY_USERNAME, [username_])
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
		const result = await pool.query(QUERY_QUOTA_BY_ID, [qid_])
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
		const result = await pool.query(QUERY_GET_EMAILS)
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
		const result = await pool.query(QUERY_UPDATE_QRCODE, [id_, qrcode_])
		await client.query('commit')
		return result.rows
	} catch (e) {
		await client.query('rollback')
		throw error(500, 'Internal server error')
	} finally {
		client.release()
	}
}

const db_data = { getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCandidateByUsernameData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getSportsData, getSportByIdData, postSportData, deleteSportData, getUsersData, getUserByIdData, postUserData, updateUserData, deleteUserData, getUsersSportsData, getUsersSportData, getUserSportsByIdData, postUserSportData, updateUserSportData, deleteUserSportData, getQuotasData, getCompaniesQuotasData, getUsersQuotasData, getMemberQuotasByIdData, postQuotaData, updateMemberQuotaData, getMemberByIdData, getMemberByUsernameData, getQuotaByIdData, getEmails, updateUserQrCodeData }

export default db_data