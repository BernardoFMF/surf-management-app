import pool from '../../utils/dbConnection.js'


/**
 * Candidates
 */

const getCandidatesData = async () => {
	try {
		await pool.query('Begin')
		const candidates = await pool.query('select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_;')
		await pool.query('Commit')
		return candidates.rows
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const getCandidateByIdData = async (id_) => {
	try {
		await pool.query('Begin')
		const candidates = await pool.query('select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where id_ = $1;', [id_])
		await pool.query('Commit')
		return candidates.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const postCandidateData = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_) => {
    try {
		await pool.query('Begin')
		const candidate = await pool.query('insert into candidate_(nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning id_;', [nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_])
		await pool.query('Commit')
		return candidate.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const deleteCandidateData = async (id_) => {
    try {
		await pool.query('Begin')
		await pool.query('delete from candidate_ where id_ = $1;', [id_])
		await pool.query('Commit')
		return id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const approveCandidateData = async (id_, type_, quota_value_, qrcode_, paid_enrollment_) => {
	try {
		await pool.query('Begin')
		const result = await pool.query('call aproove_candidate($1, $2, $3, $4, $5, $6)', [id_, type_, quota_value_, qrcode_, paid_enrollment_, 0])
		await pool.query('Commit')
		return result.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const getCandidateByUsernameData = async (username_) => {
    try {
		await pool.query('Begin')
		const candidates = await pool.query('select id_, nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, username_ from candidate_ where username_ = $1;', [username_])
		await pool.query('Commit')
		return candidates.rows
	} catch(e) {
		await pool.query('Rollback')
		throw e
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
		const candidates = await pool.query('select member_id_, nif_, name_, username_, has_debt_, member_type_ from company_ c join member_ m on (c.member_id_ = m.id_) where is_deleted_ = false;')
		await pool.query('Commit')
		return candidates.rows
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const getCompanyByIdData = async (id_) => {
    try {
		await pool.query('Begin')
		const candidates = await pool.query('select member_id_, nif_, name_ from company_ where member_id_ = $1;', [id_])
		await pool.query('Commit')
		return candidates.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_) => {
	try {
		await pool.query('Begin')
		const result = await pool.query('call post_company($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, 0])
		await pool.query('Commit')
		return result.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const updateCompanyData = async (cid_, name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
    try {
		await pool.query('Begin')
		const result = await pool.query('call put_company($1, $2, $3, $4, $5, $6, $7, $8, $9)', [cid_, name_, nif_, phone_number_, email_, postal_code_, address_, location_, 0])
		await pool.query('Commit')
		return result.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const deleteCompanyData = async (id_) => {
    try {
		await pool.query('Begin')
		await pool.query('update member_ set is_deleted_ = true where id_ = $1;', [id_])
		await pool.query('Commit')
		return id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
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
		const sports = await pool.query('select id_, name_ from Sport_ where is_deleted = false;')
		await pool.query('Commit')
		return sports.rows
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const getSportByIdData = async (sid_) => {
    try {
		await pool.query('Begin')
		const sports = await pool.query('select id_, name_ from Sport_ where is_deleted = false and id_ = $1;', [sid_])
		await pool.query('Commit')
		return sports.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const postSportData = async (name_) => {
    try {
		await pool.query('Begin')
		const sports = await pool.query('insert into Sport_ (name_) values ($1) returning id_;', [name_])
		await pool.query('Commit')
		return sports.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const deleteSportData = async (sid_) => {
    try {
		await pool.query('Begin')
		await pool.query('update sport_ set is_deleted_ = true where id_ = $1;', [sid_])
		await pool.query('Commit')
		return sid_
	} catch(e) {
		await pool.query('Rollback')
		throw e
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
		const events = await pool.query('select id_, name_, initial_date_, end_date_ from Event')
		await pool.query('Commit')
		return events.rows
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const getEventByIdData = async (id_) => {
    try {
		await pool.query('Begin')
		const event = await pool.query('select id_, name_, initial_date_, end_date_ from Event where id_ = $1', [id_])
		await pool.query('Commit')
		return event.rows[0]
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const postEventData = async (name_,initial_date_,end_date_) => {
    try {
		await pool.query('Begin')
		const event = await pool.query('insert into Event_ (name_,initial_date_,end_date_) values ($1, $2, $3) returning id_;', [name_,initial_date_,end_date_])
		await pool.query('Commit')
		return event.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const updateEventData = async (id_, name_, initial_date_, end_date_) => {
    try {
		await pool.query('Begin')
		const event = await pool.query('update Event_ set name_ = $1, initial_date_ = $2, end_date_ = $3 where id_ = $4;', [name_,initial_date_,end_date_, id_])
		await pool.query('Commit')
		return event.rows[0].id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const deleteEventData = async (id_) => {
    try {
		await pool.query('Begin')
		await pool.query('call delete_event($1);', [id_])
		await pool.query('Commit')
		return id_
	} catch(e) {
		await pool.query('Rollback')
		throw e
	} finally {
		pool.release()
	}
}

const postMemberAttendanceData = async () => {
    
}

const updateMemberAttendanceData = async () => {
    
}

const getEventByIdAttendanceData = async () => {
    
}

/**
 * Users
 */

const getUsersData = async () => {
	const users = await pool.query('SELECT * FROM user_')
	return users.rows
}

const getUserByIdData = async () => {
    
}

const postUserData = async () => {
    
}

const updateUserData = async () => {
    
}

const deleteUserData = async () => {
    
}

const getUsersSportsData = async () => {
    
}

const getUsersSportData = async () => {
    
}

const getUserSportsByIdData = async () => {
    
}

const postUserSportData = async () => {
    
}

const updateUserSportData = async () => {
    
}

const deleteUserSportData = async () => {
    
}

const getQuotasData = async () => {
    
}

const getCompaniesQuotasData = async () => {
    
}

const getUsersQuotasData = async () => {
    
}

const getMemberQuotasByIdData = async () => {
    
}

const postQuotaData = async () => {
    
}

const updateMemberQuotaData = async () => {
    
}

const getMemberByIdData = async () => {
    
}

const getMemberByUsernameData = async () => {
    
}

const getQuotaByIdData = async () => {
    
}

const getEmails = async () => {
    
}

const updateUserQrCodeData = async () => {
    
}

const db_data = { getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCandidateByUsernameData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getSportsData, getSportByIdData, postSportData, deleteSportData, getUsersData, getUserByIdData, postUserData, updateUserData, deleteUserData, getUsersSportsData, getUsersSportData, getUserSportsByIdData, postUserSportData, updateUserSportData, deleteUserSportData, getQuotasData, getCompaniesQuotasData, getUsersQuotasData, getMemberQuotasByIdData, postQuotaData, updateMemberQuotaData, getMemberByIdData, getMemberByUsernameData, getQuotaByIdData, getEmails, updateUserQrCodeData }

export default db_data