import dotenv from 'dotenv'

dotenv.config()

import pl from '../../utils/dbConnection.js'
import error from '../../utils/error.js'
import queries from './dbQueries.js'

const db = (PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DB, mode) => {

	const pool = pl(PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DB, mode)
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}
	/**
	 * Candidates
	 */

	const getCandidatesData = async (username_filter,name_filter,email_filter,offset,limit) => {
		let query = queries.QUERY_GET_CANDIDATES
		let count = 0
		if(username_filter || name_filter || email_filter){
			query = query + " where "
		}
		if(username_filter){
			count++
			query = query + ` position('${username_filter}' in username_) > 0`
		}
		if(name_filter){
			if(count > 0) query = query + " and "
			query = query + ` position('${name_filter}' in full_name_) > 0`
			count++
		}
		if(email_filter){
			if(count > 0) query = query + " and "
			query = query + ` position('${email_filter}' in email_) > 0`
			count++
		}
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(query)
			const number_of_candidates = await client.query(queries.QUERY_NUMBER_OF_CANDIDATES)
			await client.query('Commit')
			candidates.rows = candidates.rows.map(candidate => {
				candidate.birth_date_ = formatDate(candidate.birth_date_)
				return candidate
			})
			const result = {candidates:candidates.rows,number_of_candidates:username_filter || name_filter || email_filter ? candidates.rows.length : parseInt(number_of_candidates.rows[0].count)}
			return result
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
			candidates.rows = candidates.rows.map(candidate => {
				candidate.birth_date_ = formatDate(candidate.birth_date_)
				return candidate
			})
			return candidates.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postCandidateData = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_, iban_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidate = await client.query(queries.QUERY_POST_CANDIDATE, [nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_, img_, gender_, iban_])
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

	const approveCandidateData = async (id_, type_, paid_enrollment_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const result = await client.query(queries.QUERY_APPROVE_CANDIDATE, [id_, type_, paid_enrollment_, 0])
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

	const getCandidateByCCData = async (cc_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(queries.QUERY_GET_CANDIDATE_BY_CC, [cc_])
			await client.query('Commit')
			return candidates.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getCandidateByNifData = async (nif_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(queries.QUERY_GET_CANDIDATE_BY_NIF, [nif_])
			await client.query('Commit')
			return candidates.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getCandidateByEmailData = async (email_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(queries.QUERY_GET_CANDIDATE_BY_EMAIL, [email_])
			await client.query('Commit')
			return candidates.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getCandidateByIbanData = async (iban_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const candidates = await client.query(queries.QUERY_GET_CANDIDATE_BY_IBAN, [iban_])
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

	const getCompaniesData = async (username_filter,name_filter,email_filter,offset,limit) => {
		let query = queries.QUERY_GET_COMPANIES
		let count = 0
		if(username_filter || name_filter || email_filter){
			query = query + " where "
		}
		if(username_filter){
			count++
			query = query + ` position('${username_filter}' in username_) > 0`
		}
		if(name_filter){
			if(count > 0) query = query + " and "
			query = query + ` position('${name_filter}' in name_) > 0`
			count++
		}
		if(email_filter){
			if(count > 0) query = query + " and "
			query = query + ` position('${email_filter}' in email_) > 0`
			count++
		}
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const company = await pool.connect()
		try {
			await company.query('Begin')
			const companies = await company.query(query)
			const number_of_companies = await company.query(queries.QUERY_NUMBER_OF_COMPANIES)
			await company.query('Commit')
			const result = {companies:companies.rows,number_of_companies:username_filter || name_filter || email_filter ? companies.rows.length : parseInt(number_of_companies.rows[0].count)}
			return result
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

	const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, type_, img_, iban_) => {
		const company = await pool.connect()
		try {
			await company.query('Begin')
			const result = await company.query(queries.QUERY_POST_COMPANY, [name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, type_, img_, iban_, 0])
			await company.query('Commit')
			return result.rows[0].new_id_
		} catch(e) {
			await company.query('Rollback')
			throw e
		} finally {
			company.release()
		}
	}

	const updateCompanyData = async (cid_, nif_, type_, name_, phone_number_, postal_code_, address_, location_, img_, is_deleted_, iban_) => {
		const company = await pool.connect()
		try {
			await company.query('Begin')
			await company.query(queries.QUERY_UPDATE_COMPANY, [cid_, nif_, type_, name_, phone_number_, postal_code_, address_, location_, img_, is_deleted_, iban_])
			await company.query('Commit')
			return cid_
		} catch(e) {
			await company.query('Rollback')
			console.log(e);
			throw e
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
			throw e
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
			let sports = await client.query(queries.QUERY_GET_SPORTS)
			await client.query('Commit')
			sports = sports.rows.map(sport => {
				sport.practitioners_ = parseInt(sport.practitioners_)
				return sport
			})
			return sports
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

	const updateSportData = async (id_, is_deleted_, name_) => {
		const client = await pool.connect()
		try {
			await client.query('Begin')
			await client.query(queries.QUERY_UPDATE_SPORT, [id_, is_deleted_, name_])
			await client.query('Commit')
			return parseInt(id_)
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

	const getEventsData = async (name_filter,initialDate_filter,endDate_filter,offset,limit) => {
		let query = queries.QUERY_GET_EVENTS
		let count = 0
		if(name_filter || initialDate_filter || endDate_filter){
			query = query + " where "
		}
		if(name_filter){
			count++
			query = query + ` position('${name_filter}' in name_) > 0`
		}
		if(initialDate_filter){
			if(count > 0) query = query + " and "
			query = query + ` initial_date_ ='${initialDate_filter}'`
			count++
		}
		if(endDate_filter){
			if(count > 0) query = query + " and "
			query = query + ` end_date_ ='${endDate_filter}'`
			count++
		}
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const events = await pool.connect()
		try {
			await events.query('Begin')
			const eventsResult = await events.query(query)
			const number_of_events =  await events.query(queries.QUERY_NUMBER_OF_EVENTS)
			await events.query('Commit')
			let date_today = formatDate(new Date())
			eventsResult.rows = eventsResult.rows.map(event => {
				event.initial_date_ = formatDate(event.initial_date_)
				event.end_date_ = formatDate(event.end_date_)
				if(date_today < event.initial_date_ && date_today < event.end_date_){
					let x = {
						...event, status: "status_not_started"
					}
					return x
				}else{
					if(date_today > event.initial_date_ && date_today > event.end_date_){
						let x = {
							...event, status: "status_event_ended"
						}
						return x
					}
					else{
						let x = {
							...event, status: "status_event_occurring"
						}
						return x
					}
				}
			})
			const result = {events: eventsResult.rows, number_of_events: name_filter || initialDate_filter || endDate_filter ? eventsResult.rows.length : parseInt(number_of_events.rows[0].count)}
			return result
		} catch(e) {
			await events.query('Rollback')
			throw e
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
			let date_today = formatDate(new Date())
			eventResult.rows = eventResult.rows.map(event => {
				event.initial_date_ = formatDate(event.initial_date_)
				event.end_date_ = formatDate(event.end_date_)
				if(date_today < event.initial_date_ && date_today < event.end_date_){
					let x = {
						...event, status: "status_not_started"
					}
					return x
				}else{
					if(date_today > event.initial_date_ && date_today > event.end_date_){
						let x = {
							...event, status: "status_event_ended"
						}
						return x
					}
					else{
						let x = {
							...event, status: "status_event_occurring"
						}
						return x
					}
				}
			})
			return eventResult.rows[0]
		} catch(e) {
			await events.query('Rollback')
			throw e
		} finally {
			events.release()
		}
	}

	const postEventData = async (name_,initial_date_,end_date_, groups_) => {
		const events = await pool.connect()
		try {
			await events.query('Begin')
			const eventResult = await events.query(queries.QUERY_POST_EVENT, [name_,initial_date_,end_date_,groups_,0])
			await events.query('Commit')
			return eventResult.rows[0].new_id_
		} catch(e) {
			await events.query('Rollback')
			throw e
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
			throw e
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
			throw e
		} finally {
			events.release()
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

	const getEventByIdAttendanceData = async (eid_, offset, limit) => {
		let query = queries.QUERY_GET_ATTENDANCE
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const result1 = await client.query(query, [eid_])
			const number_of_attendance = await client.query(queries.QUERY_NUMBER_OF_ATTENDANCE, [eid_])
			await client.query('Commit')
			const result = {attendance: result1.rows, number_of_attendance : parseInt(number_of_attendance.rows[0].count) }
			return result
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getEventMemberByIdAttendanceData = async (id_,name_filter,state_filter,date_filter,offset,limit) => {
		let query = queries.QUERY_GET_MEMBER_ATTENDANCE
		query = query +  ` where member_id_ = ${id_}`
		let count = 0
		if(name_filter || state_filter || date_filter){
			query = query + " and "
		}
		if(name_filter){
			count++
			query = query + ` position('${name_filter}' in name_) > 0`
		}
		if(state_filter){
			if(count > 0) query = query + " and "
			query = query + ` state_ ='${state_filter}'`
			count++
		}
		if(date_filter){
			if(count > 0) query = query + " and "
			query = query + ` initial_date_ ='${date_filter}'`
			count++
		}
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('Begin')
			const events = await client.query(query)
			const number_of_events = await client.query(queries.QUERY_MY_NUMBER_OF_EVENTS,[id_])
			await client.query('Commit')
			events.rows = events.rows.map(event => {
				event.initial_date_ = formatDate(event.initial_date_)
				event.end_date_ = formatDate(event.end_date_)
				return event
			})
			const result = {events:events.rows,number_of_events:name_filter || state_filter || date_filter ? events.rows.length : parseInt(number_of_events.rows[0].count)}
			return result
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
	const getUsersData = async (username_filter,name_filter,email_filter,offset,limit) => {
		let query = queries.QUERY_GET_USERS
		let count = 0
		if(username_filter || name_filter || email_filter){
			query = query + " where "
		}
		if(username_filter){
			count++
			query = query + ` position('${username_filter}' in username_) > 0`
		}
		if(name_filter){
			if(count > 0) query = query + " and "
			query = query + ` position('${name_filter}' in full_name_) > 0`
			count++
		}
		if(email_filter){
			if(count > 0) query = query + " and "
			query = query + ` position('${email_filter}' in email_) > 0`
			count++
		}
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`

		const client = await pool.connect()
		try {
			await client.query('Begin')
			const users = await client.query(query)
			const number_of_users = await client.query(queries.QUERY_NUMBER_OF_USERS)
			await client.query('Commit')
			users.rows = users.rows.map(user => {
				user.birth_date_ = formatDate(user.birth_date_)
				user.enrollment_date_ = formatDate(user.enrollment_date_)
				return user
			})
			const result = {
				users: users.rows,
				number_of_users: username_filter || name_filter || email_filter ? users.rows.length : parseInt(number_of_users.rows[0].count)
			}
			return result
		} catch(e) {
			await client.query('Rollback')
			throw e
		}finally {
			client.release()
		}
	}

	const getUserByIdData = async (id_) => {
		const client = await pool.connect()
		try {
			const result = await client.query(queries.QUERY_GET_USER_BY_ID, [id_])
			result.rows = result.rows.map(user => {
				user.birth_date_ = formatDate(user.birth_date_)
				user.enrollment_date_ = formatDate(user.enrollment_date_)
				return user
			})
			return result.rows[0]
		} catch(e) {
			await client.query('Rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postUserData = async (cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_, iban_, img_, enrollment_date_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_POST_USER, [cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_, iban_ ,img_, enrollment_date_, 0])
			await client.query('commit')
			return result.rows[0].new_id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateUserData = async (id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_, iban_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_USER, [id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, is_admin_, paid_enrollment_, is_deleted_, gender_, iban_])
			await client.query('commit')
			return id_
		} catch (e) {
			await client.query('rollback')
			console.log(e);
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

	const getUsersSportData = async (id_, offset, limit, is_candidate_, username_) => {
		let query = queries.QUERY_GET_USERS_SPORT
		if (username_)
			query += ` and username_ = '${username_}'`
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('begin')
			const sport = await client.query(queries.QUERY_GET_SPORT_BY_ID, [id_])
			const sports = await client.query(query, [id_, is_candidate_])
			const number_of_sports = await client.query(queries.QUERY_NUMBER_OF_SPORT_USERS, [id_, is_candidate_])
			await client.query('commit')
			const result = { users: sports.rows, number_of_users: parseInt(number_of_sports.rows[0].count),  sport : sport.rows[0] }
			return result
		} catch (e) {
			await client.query('rollback')
			console.log(e);
			throw e
		} finally {
			client.release()
		}
	}

	const getUserSportsByIdData = async (id_, offset, limit) => {
		let query = queries.QUERY_GET_USER_SPORTS_BY_ID
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('begin')
			const sports = await pool.query(query, [id_])
			const number_of_sports = await client.query(queries.QUERY_NUMBER_OF_USER_SPORTS, [id_])
			await client.query('commit')
			const result = { sports: sports.rows, number_of_sports: parseInt(number_of_sports.rows[0].count) }
			return result
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_candidate_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_POST_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_candidate_])
			await client.query('commit')
			return {id_, sid_}
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_, is_candidate_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_, is_candidate_])
			await client.query('commit')
			return {id_, sid_}
		} catch (e) {
			await client.query('rollback')
			console.log(e)
			throw e
		} finally {
			client.release()
		}
	}

	const deleteUserSportData = async (id_, sid_, is_candidate_) => {
		const query = is_candidate_ ? queries.QUERY_DELETE_USER_SPORT_CANDIDATE : queries.QUERY_DELETE_USER_SPORT 
		const client = await pool.connect()
		try {
			await client.query('begin')
			await pool.query(query, [id_, sid_])
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
	const getQuotasData = async (username_filter,email_filter,date_filter,offset,limit) => {
		let query = queries.QUERY_GET_QUOTAS
		let count = 0
		if(username_filter || email_filter || date_filter){
			query = query + " where "
		}
		if(username_filter){
			count++
			query = query + ` position('${username_filter}' in username_) > 0`
		}
		if(email_filter){
			if(count > 0) query = query + " and "
			query = query + ` position('${email_filter}' in email_) > 0`
			count++
		}
		if(date_filter){
			if(count > 0) query = query + " and "
			query = query + ` date_ ='${date_filter}'`
			count++
		}
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('begin')
			const quotas = await client.query(query)
			const number_of_quotas = await client.query(queries.QUERY_NUMBER_OF_QUOTAS)
			await client.query('commit')
			quotas.rows = quotas.rows.map(quota => {
				quota.date_ = formatDate(quota.date_)
				if(quota.payment_date_)quota.payment_date_ = formatDate(quota.payment_date_)
				return quota
			})
			const result = {quotas:quotas.rows,number_of_quotas:username_filter || email_filter || date_filter ? quotas.rows.length : parseInt(number_of_quotas.rows[0].count)}
			return result
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

	const getMemberQuotasByIdData = async (id_,offset,limit) => {
		let query = queries.QUERY_GET_MEMBERS_QUOTAS_BY_ID
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('begin')
			const quotas = await client.query(query, [id_])
			const number_of_quotas = await client.query(queries.QUERY_NUMBER_OF_MEMBER_QUOTAS,[id_])
			await client.query('commit')
			const result = {quotas:quotas.rows,number_of_quotas:parseInt(number_of_quotas.rows[0].count)}
			return result
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
			let quotas = await client.query(queries.QUERY_UPDATE_MEMBER_QUOTA, [payment_date_, qid_])
			await client.query('commit')
			quotas.rows = quotas.rows.map(quota => {
				quota.payment_date_ = formatDate(quota.payment_date_)
				return quota
			})
			return parseInt(qid_)
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

	const getMemberByCCData = async (cc_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_CC, [cc_])
			await client.query('commit')
			return result.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberByNifData = async (nif_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result_user = await client.query(queries.QUERY_GET_USER_BY_NIF, [nif_])
			const result_company = await client.query(queries.QUERY_GET_COMPANY_BY_NIF, [nif_])
			await client.query('commit')
			if (result_user.rows.length != 0)
				return result_user.rows[0]
			return result_company.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberByEmailData = async (email_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_EMAIL, [email_])
			await client.query('commit')
			return result.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberByIbanData = async (iban_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_IBAN, [iban_])
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
			return email.rows[0]
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
			return result.rows[0]
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

	const getManagementQuotas = async(category_) => {
		let query = queries.QUERY_GET_MANAGEMENT_QUOTAS
		if(category_) {
			query += ` where category_ = '${category_}'`
		}
		const client = await pool.connect()
		try {
			await client.query('begin')
			const allMemberQuotas = await client.query(query)
			await client.query('commit')
			return allMemberQuotas.rows
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const updateManagementQuotaByType = async(type_, quota_value_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_UPDATE_MANAGEMENT_QUOTAS, [quota_value_, type_])
			await client.query('commit')
			return type_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postManagementQuota = async(type_, quota_value_, category_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_POST_MEMBER_TYPE, [type_, quota_value_, category_])
			await client.query('commit')
			return type_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getManagementQuotaByType = async(type_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const allMemberQuotas = await client.query(queries.QUERY_GET_MANAGEMENT_QUOTA_BY_TYPE, [type_])
			await client.query('commit')
			return allMemberQuotas.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberValidationData = async(id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const member = await client.query(queries.QUERY_GET_MEMBER_VALIDATE, [id_])
			await client.query('commit')
			return member.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getGroupsData = async (name_filter, group_type_filter, types_filter, offset, limit) => {
		let query = queries.QUERY_GET_GROUPS
		let count = 0
		if (types_filter.length > 0) {
			query = query + ` join ${group_type_filter == 'member_type' ? 
				'Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_' : 
				`Group_Sports_ gs on g.group_id_ = gs.group_id_`
			}`
		}
		if(name_filter || group_type_filter){
			query = query + " where "
		}
		if (group_type_filter) {
			query = query + ` group_type_ = '${group_type_filter}'`
			if (types_filter.length > 0) {
				let types = types_filter.map(type => `'${type}'`)
				types = types.join(',')
				query = query + ` and ${group_type_filter == 'member_type' ? 'member_type_' : 'sport_member_type_'} = any(array[${types}])`
			}
			count++
		}
		if(name_filter){
			if(count > 0) query = query + " and "
			query = query + `position('${name_filter}' in name_) > 0`
		}
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`
		console.log(query);
		const client = await pool.connect()
		try {
			await client.query('begin')
			const groups = await client.query(query)
			const number_of_groups = await client.query(queries.QUERY_NUMBER_OF_GROUPS)
			await client.query('commit')
			const result = {groups:groups.rows, number_of_groups:name_filter || group_type_filter ? groups.rows.length : parseInt(number_of_groups.rows[0].count)}
			return result
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getGroupByIdData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const group = await client.query(queries.QUERY_GET_GROUP_BY_ID, [id_])
			let group_types = null
			if (group.rows[0]) {
				if (group.rows[0].group_type_ == 'member_type') {
					group_types = await client.query(queries.QUERY_GET_GROUP_BY_ID_MEMBER_TYPES, [id_])
					group_types = group_types.rows.map(type => type.member_type_)
				} else {
					group_types = await client.query(queries.QUERY_GET_GROUP_BY_ID_SPORT_TYPES, [id_])
					group_types = group_types.rows.map(type => {
						let obj = {
							sport_: type.sport_id_,
							sport_name_: type.name_,
							type: type.sport_member_type_
						}
						return obj
					})
				}
			}
			await client.query('commit')
			let result = group.rows[0]
			if (!result) return result
			result.types_ = group_types
			return result
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getGroupByNameData = async (name_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const group = await client.query(queries.QUERY_GET_GROUP_BY_NAME, [name_])
			await client.query('commit')
			return group.rows[0]
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const postGroupData = async (name_, description_, group_type_, types_, sports_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const group = await client.query(queries.QUERY_POST_GROUP, [name_, description_, types_, group_type_, sports_, 0])
			await client.query('commit')
			return group.rows[0].new_id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const deleteGroupData = async (id_) => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			await client.query(queries.QUERY_DELETE_GROUP, [id_])
			await client.query('commit')
			return id_
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getMemberGroupsData = async (id_, name_filter, group_type_filter, types_filter, offset_, limit_) => {
		let query = queries.QUERY_GET_MEMBER_GROUPS
		let count = 0
		if (types_filter.length > 0) {
			query = query + ` join ${group_type_filter == 'member_type' ? 
				'Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_' : 
				`Group_Sports_ gs on g.group_id_ = gs.group_id_`
			}`
		}
		query = query + " where gm.member_id_ = $1"
		if (group_type_filter) {
			query = query + ` and group_type_ = '${group_type_filter}'`
			if (types_filter.length > 0) {
				let types = types_filter.map(type => `'${type}'`)
				types = types.join(',')
				query = query + ` and ${group_type_filter == 'member_type' ? 'member_type_' : 'sport_member_type_'} = any(array[${types}])`
			}
			count++
		}
		if(name_filter){
			if(count > 0) query = query + " and "
			query = query + `position('${name_filter}' in name_) > 0`
		}
		query = query + ` offset ${offset_} FETCH FIRST ${limit_} ROWS only`
		const client = await pool.connect()
		try {
			console.log(query);
			await client.query('begin')
			const groups = await client.query(query, [id_])
			const number_of_groups = await client.query(queries.QUERY_NUMBER_OF_MEMBER_GROUPS, [id_])
			await client.query('commit')
			const result = {groups:groups.rows, number_of_groups: parseInt(number_of_groups.rows[0].count)}
			return result
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const getGroupByIdMembersData = async (id_, username_filter_, offset_, limit_) => {
		let query = queries.QUERY_GET_GROUP_MEMBERS
		if (username_filter_) {
			query = query + ` and position('${username_filter_}' in username_) > 0`
		}
		query = query + ` offset ${offset_} FETCH FIRST ${limit_} ROWS only`
		const client = await pool.connect()
		try {
			await client.query('begin')
			const members = await client.query(query, [id_])
			const number_of_members = await client.query(queries.QUERY_NUMBER_OF_MEMBERS_IN_GROUP, [id_])
			await client.query('commit')
			console.log(members.rows);
			return { members: members.rows, number_of_members: parseInt(number_of_members.rows[0].count) }
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}
	}

	const GetUserSportTypesData = async () => {
		const client = await pool.connect()
		try {
			await client.query('begin')
			const types = await client.query(queries.QUERY_GET_USER_SPORT_TYPES)
			await client.query('commit')
			let result = types.rows.map(row => {
				let newRow ={
					name: row.type_,
					label: row.type_
				}
				return newRow
			})
			return result
		} catch (e) {
			await client.query('rollback')
			throw e
		} finally {
			client.release()
		}	
	}

	return { 
		getGroupsData, 
		getGroupByIdData, 
		getGroupByNameData,
		postGroupData,
		deleteGroupData,
		getMemberGroupsData,
		getGroupByIdMembersData,
		getCandidateByIbanData,
		getMemberByIbanData, 
		getManagementQuotas, 
		getManagementQuotaByType, 
		updateManagementQuotaByType,
		postManagementQuota,
		getEventMemberByIdAttendanceData,
		getCandidatesData,
		getCandidateByIdData,
		postCandidateData,
		deleteCandidateData,
		approveCandidateData,
		getCandidateByUsernameData,
		getCompaniesData,
		getCompanyByIdData,
		postCompanyData,
		updateCompanyData,
		deleteCompanyData,
		getEventsData,
		getEventByIdData,
		postEventData,
		updateEventData,
		deleteEventData,
		updateMemberAttendanceData,
		getEventByIdAttendanceData,
		getSportsData,
		getSportByIdData,
		postSportData,
		updateSportData,
		deleteSportData, 
		getUsersData, 
		getUserByIdData, 
		postUserData, 
		updateUserData, 
		deleteUserData, 
		getUsersSportsData, 
		getUsersSportData, 
		getUserSportsByIdData, 
		postUserSportData, 
		updateUserSportData, 
		deleteUserSportData, 
		getQuotasData, 
		getCompaniesQuotasData, 
		getUsersQuotasData, 
		getMemberQuotasByIdData, 
		postQuotaData, 
		updateMemberQuotaData, 
		getMemberByIdData, 
		getMemberByUsernameData, 
		getQuotaByIdData, 
		getEmails,
		getUserEmailByIdData,
		updateUserQrCodeData, 
		getMemberTokenByIdData, 
		deleteMemberTokenData, 
		updateMemberTokenData, 
		postNewTokenData, 
		getMemberByCCData,
		getMemberByNifData, 
		getMemberByEmailData, 
		getCandidateByNifData, 
		getCandidateByCCData, 
		getCandidateByEmailData, 
		getMemberValidationData,
		GetUserSportTypesData, 
		getEmails,
		getUserEmailByIdData,
		postNewTokenData,
		getMemberTokenByIdData,
		deleteMemberTokenData,
		updateMemberTokenData,
		pool 
	}

}

export default db