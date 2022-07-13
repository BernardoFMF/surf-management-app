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
		let queryCount = ''
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
		queryCount = query
		query = query + ` order by id_ offset ${offset}`
		if (limit !== '-1') query = query + ` FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			let candidates = await client.query(query)
			const number_of_candidates = await client.query(queryCount)
			candidates.rows = candidates.rows.map(candidate => {
				candidate.birth_date_ = formatDate(candidate.birth_date_)
				return candidate
			})
			const result = {candidates:candidates.rows, number_of_candidates: number_of_candidates.rowCount}
			return result
		}

		return await pool(handler)
	}
	
	const getCandidateByIdData = async (id_) => {
		const handler = async (client) => {
			const candidates = await client.query(queries.QUERY_GET_CANDIDATE_BY_ID, [id_])
			candidates.rows = candidates.rows.map(candidate => {
				candidate.birth_date_ = formatDate(candidate.birth_date_)
				return candidate
			})
			return candidates.rows[0]
		}

		return await pool(handler)
	}

	const postCandidateData = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_, iban_) => {
		const handler = async (client) => {
			const candidate = await client.query(queries.QUERY_POST_CANDIDATE, [nif_, cc_, full_name_, nationality_, birth_date_, location_, address_, postal_code_, email_, phone_number_, pword_, username_, img_, gender_, iban_])
			return candidate.rows[0].id_
		}

		return await pool(handler)
	}

	const deleteCandidateData = async (id_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_DELETE_CANDIDATE, [id_])
			return id_
		}

		return await pool(handler)
	}

	const approveCandidateData = async (id_, type_, paid_enrollment_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_APPROVE_CANDIDATE, [id_, type_, paid_enrollment_, 0])
			return result.rows[0].new_id
		}

		return await pool(handler)
	}

	const getCandidateByUsernameData = async (username_) => {
		const handler = async (client) => {
			const candidate = await client.query(queries.QUERY_GET_CANDIDATE_BY_USERNAME, [username_])
			return candidate.rows[0]
		}

		return await pool(handler)
	}

	const getCandidateByCCData = async (cc_) => {
		const handler = async (client) => {
			const candidate = await client.query(queries.QUERY_GET_CANDIDATE_BY_CC, [cc_])
			return candidate.rows[0]
		}

		return await pool(handler)
	}

	const getCandidateByNifData = async (nif_) => {
		const handler = async (client) => {
			const candidate = await client.query(queries.QUERY_GET_CANDIDATE_BY_NIF, [nif_])
			return candidate.rows[0]
		}

		return await pool(handler)
	}

	const getCandidateByEmailData = async (email_) => {
		const handler = async (client) => {
			const candidate = await client.query(queries.QUERY_GET_CANDIDATE_BY_EMAIL, [email_])
			return candidate.rows[0]
		}

		return await pool(handler)
	}

	const getCandidateByIbanData = async (iban_) => {
		const handler = async (client) => {
			const candidate = await client.query(queries.QUERY_GET_CANDIDATE_BY_IBAN, [iban_])
			return candidate.rows[0]
		}

		return await pool(handler)
	}

	/**
	 * Companies
	 */

	const getCompaniesData = async (username_filter,name_filter,email_filter, debt_filter,offset,limit) => {
		let query = queries.QUERY_GET_COMPANIES
		let queryCounter = ''
		let count = 0
		if(username_filter || name_filter || email_filter || debt_filter){
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
		if(debt_filter != undefined){
			if(count > 0) query = query + " and "
			query = query + ` has_debt_ = ${debt_filter}`
			count++
		}
		queryCounter = query
		query = query + ` order by c.member_id_ offset ${offset}`
		if (limit !== '-1') query = query + ` FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			const companies = await client.query(query)
			const number_of_companies = await client.query(queryCounter)
			const result = {companies:companies.rows, number_of_companies: number_of_companies.rowCount}
			return result
		}

		return await pool(handler)
	}

	const getCompanyByIdData = async (id_) => {
		const handler = async (client) => {
			const company = await client.query(queries.QUERY_GET_COMPANY_BY_ID, [id_])
			return company.rows[0]
		}

		return await pool(handler)
	}

	const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, type_, img_, iban_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_POST_COMPANY, [name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, type_, img_, iban_, 0])
			return result.rows[0].new_id_
		}

		return await pool(handler)
	}

	const updateCompanyData = async (cid_, nif_, type_, name_, phone_number_, postal_code_, address_, location_, img_, is_deleted_, iban_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_COMPANY, [cid_, nif_, type_, name_, phone_number_, postal_code_, address_, location_, img_, is_deleted_, iban_])
			return cid_
		}

		return await pool(handler)
	}

	const deleteCompanyData = async (id_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_DELETE_COMPANY, [id_])
			return id_
		}

		return await pool(handler)
	}

	/**
	 * Sports
	 */

	const getSportsData = async () => {
		const handler = async (client) => {
			let sports = await client.query(queries.QUERY_GET_SPORTS)
			sports = sports.rows.map(sport => {
				sport.practitioners_ = parseInt(sport.practitioners_)
				return sport
			})
			return sports
		}

		return await pool(handler)
	}

	const getSportByIdData = async (sid_) => {
		const handler = async (client) => {
			const sport = await client.query(queries.QUERY_GET_SPORT_BY_ID, [sid_])
			return sport.rows[0]
		}

		return await pool(handler)
	}

	const postSportData = async (name_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_POST_SPORT, [name_])
			return result.rows[0].id_
		}

		return await pool(handler)
	}

	const updateSportData = async (id_, is_deleted_, name_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_SPORT, [id_, is_deleted_, name_])
			return parseInt(id_)
		}

		return await pool(handler)
	}

	const deleteSportData = async (sid_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_DELETE_SPORT, [sid_])
			return sid_
		}

		return await pool(handler)
	}

	/**
	 * Events
	 */

	const getEventsData = async (name_filter,initialDate_filter,endDate_filter,offset,limit) => {
		let query = queries.QUERY_GET_EVENTS
		let queryCount = ''
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
		queryCount = query
		query = query + ` order by id_ offset ${offset} FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			let eventsResult = await client.query(query)
			const number_of_events =  await client.query(queryCount)

			let date_today = formatDate(new Date())
			eventsResult.rows = eventsResult.rows.map(event => {
				event.initial_date_ = formatDate(event.initial_date_)
				event.end_date_ = formatDate(event.end_date_)
				let formattedEvent = { ...event }
				if(date_today < event.initial_date_ && date_today < event.end_date_){
					formattedEvent.status = "status_not_started"
				} else {
					if(date_today > event.initial_date_ && date_today > event.end_date_){
						formattedEvent.status = "status_event_ended"
					} else {
						formattedEvent.status = "status_event_occurring"
					}
				}
				return formattedEvent
			})
			const result = {events: eventsResult.rows, number_of_events: number_of_events.rowCount}
			return result
		}

		return await pool(handler)
	}

	const getEventByIdData = async (id_) => {
		const handler = async (client) => {
			let eventResult = await client.query(queries.QUERY_GET_EVENT_BY_ID, [id_])

			let date_today = formatDate(new Date())
			eventResult.rows = eventResult.rows.map(event => {
				event.initial_date_ = formatDate(event.initial_date_)
				event.end_date_ = formatDate(event.end_date_)
				let formattedEvent = { ...event }
				if(date_today < event.initial_date_ && date_today < event.end_date_){
					formattedEvent.status = "status_not_started"
				} else {
					if(date_today > event.initial_date_ && date_today > event.end_date_){
						formattedEvent.status = "status_event_ended"
					} else {
						formattedEvent.status = "status_event_occurring"
					}
				}
				return formattedEvent
			})
			return eventResult.rows[0]
		}

		return await pool(handler)
	}

	const postEventData = async (name_, initial_date_, end_date_, groups_) => {
		const handler = async (client) => {
			const eventResult = await client.query(queries.QUERY_POST_EVENT, [name_,initial_date_,end_date_,groups_,0])
			return eventResult.rows[0].new_id_
		}

		return await pool(handler)
	}

	const updateEventData = async (id_, name_, initial_date_, end_date_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_EVENT, [name_,initial_date_,end_date_, id_])
			return parseInt(id_)
		}

		return await pool(handler)
	}

	const deleteEventData = async (id_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_DELETE_EVENT, [id_])
			return id_
		}

		return await pool(handler)
	}

	const updateMemberAttendanceData = async (eid_, id_, state_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_ATTENDANCE,[eid_, id_, state_ ])
			return { eid_: parseInt(eid_), id_ }
		}

		return await pool(handler)
	}

	const getEventByIdAttendanceData = async (eid_, offset, limit) => {
		let query = queries.QUERY_GET_ATTENDANCE
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			const attendance = await client.query(query, [eid_])
			const number_of_attendance = await client.query(queries.QUERY_NUMBER_OF_ATTENDANCE, [eid_])

			const result = {attendance: attendance.rows, number_of_attendance : parseInt(number_of_attendance.rows[0].count) }
			return result
		}

		return await pool(handler)
	}

	const getEventMemberByIdAttendanceData = async (id_,name_filter,state_filter,date_filter,offset,limit) => {
		let query = queries.QUERY_GET_MEMBER_ATTENDANCE
		let queryCount = ''
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
		queryCount = query
		query = query + ` order by a.event_id_ offset ${offset} FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			let events = await client.query(query, [id_])
			const number_of_events = await client.query(queryCount,[id_])
			events.rows = events.rows.map(event => {
				event.initial_date_ = formatDate(event.initial_date_)
				event.end_date_ = formatDate(event.end_date_)
				return event
			})
			const result = {events:events.rows,number_of_events: number_of_events.rowCount}
			return result
		}

		return await pool(handler)
	}

	/**
	 * Users
	 */
	const getUsersData = async (username_filter,name_filter,email_filter,debt_filter,offset,limit) => {
		let query = queries.QUERY_GET_USERS
		let queryCount = ''
		let count = 0
		if(username_filter || name_filter || email_filter || debt_filter){
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
		if(debt_filter != undefined){
			if(count > 0) query = query + " and "
			query = query + ` has_debt_ = ${debt_filter}`
			count++
		}
		queryCount = query
		query = query + ` order by u.member_id_ offset ${offset}`
		if (limit !== '-1') query = query + ` FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			let users = await client.query(query)
			const number_of_users = await client.query(queryCount)
			users.rows = users.rows.map(user => {
				user.birth_date_ = formatDate(user.birth_date_)
				user.enrollment_date_ = formatDate(user.enrollment_date_)
				return user
			})
			const result = { users: users.rows,	number_of_users: number_of_users.rowCount }
			return result
		}

		return await pool(handler)
	}

	const getUserByIdData = async (id_) => {
		const handler = async (client) => {
			let user = await client.query(queries.QUERY_GET_USER_BY_ID, [id_])
			user.rows = user.rows.map(user => {
				user.birth_date_ = formatDate(user.birth_date_)
				user.enrollment_date_ = formatDate(user.enrollment_date_)
				return user
			})
			return user.rows[0]
		}

		return await pool(handler)
	}

	const postUserData = async (cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_, iban_, img_, enrollment_date_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_POST_USER, [cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_, iban_ ,img_, enrollment_date_, 0])
			return result.rows[0].new_id_
		}

		return await pool(handler)
	}

	const updateUserData = async (id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_, iban_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_USER, [id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, is_admin_, paid_enrollment_, is_deleted_, gender_, iban_])
			return id_
		}

		return await pool(handler)
	}

	const deleteUserData = async (id_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_DELETE_USER, [id_])
			return id_
		}

		return await pool(handler)
	}

	const getUsersSportsData = async () => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_USERS_SPORTS)
			return result.rows
		}

		return await pool(handler)
	}

	const getUsersSportData = async (id_, offset, limit, is_candidate_, username_) => {
		let query = queries.QUERY_GET_USERS_SPORT
		let queryCount = ''
		if (username_)
			query += ` and position('${username_}' in username_) > 0`
		queryCount = query
		query = query + ` order by sport_id_ offset ${offset} FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			const sport = await client.query(queries.QUERY_GET_SPORT_BY_ID, [id_])
			const sports = await client.query(query, [id_, is_candidate_])
			const number_of_sports = await client.query(queryCount, [id_, is_candidate_])
			const result = { users: sports.rows, number_of_users: number_of_sports.rowCount, sport: sport.rows[0] }
			return result
		}

		return await pool(handler)
	}

	const getUserSportsByIdData = async (id_, offset, limit) => {
		let query = queries.QUERY_GET_USER_SPORTS_BY_ID
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			const sports = await client.query(query, [id_])
			const number_of_sports = await client.query(queries.QUERY_NUMBER_OF_USER_SPORTS, [id_])
			const result = { sports: sports.rows, number_of_sports: parseInt(number_of_sports.rows[0].count) }
			return result
		}

		return await pool(handler)
	}

	const getUserSportByIdAndUserData = async (id_, sid_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_USER_SPORT_SPECIFIC, [id_, sid_])
			return result.rows[0]
		}

		return await pool(handler)
	}

	const postUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_candidate_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_POST_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_candidate_])
			return {id_, sid_}
		}

		return await pool(handler)
	}

	const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_, is_candidate_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_USER_SPORT, [id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_, is_candidate_])
			return {id_, sid_}
		}

		return await pool(handler)
	}

	const deleteUserSportData = async (id_, sid_, is_candidate_) => {
		const query = is_candidate_ ? queries.QUERY_DELETE_USER_SPORT_CANDIDATE : queries.QUERY_DELETE_USER_SPORT 

		const handler = async (client) => {
			await client.query(query, [id_, sid_])
			return {id_, sid_}
		}

		return await pool(handler)
	}

	/**
	 * Quotas
	 */

	const getQuotasData = async (username_filter,email_filter,date_filter,offset,limit) => {
		let query = queries.QUERY_GET_QUOTAS
		let queryCount = ''
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
		queryCount = query
		query = query + ` offset ${offset}`
		if(limit !== -1) query +=  ` FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			let quotas = await client.query(query)
			const number_of_quotas = await client.query(queryCount)
			quotas.rows = quotas.rows.map(quota => {
				quota.date_ = formatDate(quota.date_)
				if(quota.payment_date_)quota.payment_date_ = formatDate(quota.payment_date_)
				return quota
			})
			const result = {quotas:quotas.rows,number_of_quotas:number_of_quotas.rowCount}
			return result
		}

		return await pool(handler)
	}
	
	const getQuotasByDateData = async (date) => {
		const handler = async (client) => {
			let result = await client.query(queries.QUERY_GET_QUOTAS_BY_DATE, [date])
			result.rows = result.rows.map(quota => {
				quota.date_ = formatDate(quota.date_)
				if(quota.payment_date_)quota.payment_date_ = formatDate(quota.payment_date_)
				return quota
			})
			return result.rows
		}

		return await pool(handler)
	}

	const getQuotasByEmailData = async (email) => {
		const handler = async (client) => {
			let result = await client.query(queries.QUERY_GET_QUOTAS_BY_EMAIL, [email])
			result.rows = result.rows.map(quota => {
				quota.date_ = formatDate(quota.date_)
				if(quota.payment_date_)quota.payment_date_ = formatDate(quota.payment_date_)
				return quota
			})
			return result.rows
		}

		return await pool(handler)
	}

	const getCompaniesQuotasData = async () => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_COMPANIES_QUOTAS)
			return result.rows
		}

		return await pool(handler)
	}

	const getUsersQuotasData = async () => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_USERS_QUOTAS)
			return result.rows
		}

		return await pool(handler)
	}

	const getMemberQuotasByIdData = async (id_,offset,limit) => {
		let query = queries.QUERY_GET_MEMBERS_QUOTAS_BY_ID
		query = query + ` offset ${offset} FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			const quotas = await client.query(query, [id_])
			const number_of_quotas = await client.query(queries.QUERY_NUMBER_OF_MEMBER_QUOTAS,[id_])
			const result = {quotas:quotas.rows,number_of_quotas:parseInt(number_of_quotas.rows[0].count)}
			return result
		}

		return await pool(handler)
	}

	const postQuotaData = async (date_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_POST_QUOTA, [date_, 0])
			return result.rows[0].count_date
		}

		return await pool(handler)
	}

	const deleteQuotaData = async (date_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_DELETE_QUOTA, [date_])
			return result
		}

		return await pool(handler)
	}

	const updateMemberQuotaData = async (qid_, payment_date_) => {
		const handler = async (client) => {
			let quotas = await client.query(queries.QUERY_UPDATE_MEMBER_QUOTA, [payment_date_, qid_])
			quotas.rows = quotas.rows.map(quota => {
				quota.payment_date_ = formatDate(quota.payment_date_)
				return quota
			})
			return parseInt(qid_)
		}

		return await pool(handler)
	}

	const getAllMembersData = async () => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_ALL_MEMBERS)
			return result.rows
		}

		return await pool(handler)
	}

	const getMemberByIdData = async (id_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_ID, [id_])
			return result.rows[0]
		}

		return await pool(handler)
	}

	const getMemberByUsernameData = async (username_) => {
		const handler = async (client) => {
			const member = await client.query(queries.QUERY_GET_MEMBER_BY_USERNAME, [username_])
			return member.rows[0]
		}

		return await pool(handler)
	}

	const getMemberByCCData = async (cc_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_CC, [cc_])
			return result.rows[0]
		}

		return await pool(handler)
	}

	const getMemberByNifData = async (nif_) => {
		const handler = async (client) => {
			const result_user = await client.query(queries.QUERY_GET_USER_BY_NIF, [nif_])
			const result_company = await client.query(queries.QUERY_GET_COMPANY_BY_NIF, [nif_])
			if (result_user.rows.length != 0)
				return result_user.rows[0]
			return result_company.rows[0]
		}

		return await pool(handler)
	}

	const getMemberByEmailData = async (email_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_EMAIL, [email_])
			return result.rows[0]
		}

		return await pool(handler)
	}

	const getMemberByIbanData = async (iban_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_MEMBER_BY_IBAN, [iban_])
			return result.rows[0]
		}

		return await pool(handler)
	}

	const getQuotaByIdData = async (qid_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_QUOTA_BY_ID, [qid_])
			return result.rows[0]
		}

		return await pool(handler)
	}

	const getEmails = async () => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_EMAILS)
			return result.rows
		}

		return await pool(handler)
	}

	const getUserEmailByIdData = async (id_) => {
		const handler = async (client) => {
			const email = await client.query(queries.QUERY_GET_USER_EMAIL,[id_])
			return email.rows[0]
		}

		return await pool(handler)
	}

	const getEmailByGroupIdData = async (ids_) => {
		let query = queries.QUERY_GET_USER_EMAIL_BY_GROUP
		let count = 0
		ids_.forEach(group_id => {
			if (count === 0) query += ` where gm.group_id_ = ${group_id}`
			else query += ` or gm.group_id_ = ${group_id}`
			++count
		})

		const handler = async (client) => {
			const emails = await client.query(query)			
			return emails.rows
		}

		return await pool(handler)
	}

	const updateUserQrCodeData = async (id_, qrcode_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_QRCODE, [id_, qrcode_])
			return id_
		}

		return await pool(handler)
	}

	const postNewTokenData = async(user_id_, token) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_POST_NEW_TOKEN, [user_id_, token])
			return user_id_
		}

		return await pool(handler)
	}

	const getMemberTokenByIdData = async(id_) => {
		const handler = async (client) => {
			const result = await client.query(queries.QUERY_GET_MEMBER_TOKEN, [id_])
			return result.rows[0]
		}

		return await pool(handler)
	}

	const deleteMemberTokenData = async(id_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_DELETE_MEMBER_TOKEN, [id_])
			return id_
		}

		return await pool(handler)
	}

	const updateMemberTokenData = async(id_, new_token) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_MEMBER_TOKEN, [id_, new_token])
			return id_
		}

		return await pool(handler)
	}

	const getManagementQuotas = async(category_) => {
		let query = queries.QUERY_GET_MANAGEMENT_QUOTAS
		if(category_) {
			query += ` where category_ = '${category_}'`
		}

		const handler = async (client) => {
			const allMemberQuotas = await client.query(query)
			return allMemberQuotas.rows
		}

		return await pool(handler)
	}

	const updateManagementQuotaByType = async(type_, quota_value_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_UPDATE_MANAGEMENT_QUOTAS, [quota_value_, type_])
			return type_
		}

		return await pool(handler)
	}

	const postManagementQuota = async(type_, quota_value_, category_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_POST_MEMBER_TYPE, [type_, quota_value_, category_])
			return type_
		}

		return await pool(handler)
	}

	const getManagementQuotaByType = async(type_) => {
		const handler = async (client) => {
			const allMemberQuotas = await client.query(queries.QUERY_GET_MANAGEMENT_QUOTA_BY_TYPE, [type_])
			return allMemberQuotas.rows[0]
		}

		return await pool(handler)
	}

	const getMemberValidationData = async(id_) => {
		const handler = async (client) => {
			const member = await client.query(queries.QUERY_GET_MEMBER_VALIDATE, [id_])
			return member.rows[0]
		}

		return await pool(handler)
	}

	const getGroupsData = async (name_filter, group_type_filter, types_filter, offset, limit) => {
		let query = queries.QUERY_GET_GROUPS
		let queryCount = ''
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
		queryCount = query
		query = query + ` order by g.group_id_ offset ${offset}`
		if(limit !== '-1') query = query + ` FETCH FIRST ${limit} ROWS only`

		const handler = async (client) => {
			const groups = await client.query(query)
			const number_of_groups = await client.query(queryCount)
			const result = { groups: groups.rows, number_of_groups: number_of_groups.rowCount }
			return result
		}

		return await pool(handler)
	}

	const getGroupByIdData = async (id_) => {
		const handler = async (client) => {
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
			let result = group.rows[0]
			if (!result) return result
			result.types_ = group_types
			return result
		}

		return await pool(handler)
	}

	const getGroupByNameData = async (name_) => {
		const handler = async (client) => {
			const group = await client.query(queries.QUERY_GET_GROUP_BY_NAME, [name_])
			return group.rows[0]
		}

		return await pool(handler)
	}

	const postGroupData = async (name_, description_, group_type_, types_, sports_) => {
		const handler = async (client) => {
			const group = await client.query(queries.QUERY_POST_GROUP, [name_, description_, types_, group_type_, sports_, 0])
			return group.rows[0].new_id_
		}

		return await pool(handler)
	}

	const deleteGroupData = async (id_) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_DELETE_GROUP, [id_])
			return id_
		}

		return await pool(handler)
	}

	const getMemberGroupsData = async (id_, name_filter, group_type_filter, types_filter, offset_, limit_) => {
		let query = queries.QUERY_GET_MEMBER_GROUPS
		let queryCount = ''
		let count = 0
		if (types_filter.length > 0) {
			query = query + ` join ${group_type_filter == 'member_type' ? 
				'Group_Member_Types_ gmt on g.group_id_ = gmt.group_id_' : 
				`Group_Sports_ gs on g.group_id_ = gs.group_id_`
			}`
		}
		query = query + " where gm.member_id_ = $1"
		count++
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
		queryCount = query
		query = query + ` offset ${offset_} FETCH FIRST ${limit_} ROWS only`

		const handler = async (client) => {
			const groups = await client.query(query, [id_])
			const number_of_groups = await client.query(queryCount, [id_])
			const result = {groups:groups.rows, number_of_groups: number_of_groups.rowCount}
			return result
		}

		return await pool(handler)
	}

	const getGroupByIdMembersData = async (id_, username_filter_, offset_, limit_) => {
		let query = queries.QUERY_GET_GROUP_MEMBERS
		let queryCount = ''
		if (username_filter_) {
			query = query + ` and position('${username_filter_}' in username_) > 0`
		}
		queryCount = query
		query = query + ' order by id_'
		query = query + ` offset ${offset_} FETCH FIRST ${limit_} ROWS only`

		const handler = async (client) => {
			const members = await client.query(query, [id_])
			const number_of_members = await client.query(queryCount, [id_])
			return { members: members.rows, number_of_members: number_of_members.rowCount }
		}

		return await pool(handler)
	}

	const getUserSportTypesData = async () => {
		const handler = async (client) => {
			const types = await client.query(queries.QUERY_GET_USER_SPORT_TYPES)
			let result = types.rows.map(row => {
				let newRow ={
					name: row.type_,
					label: row.type_
				}
				return newRow
			})
			return result
		}

		return await pool(handler)
	}

	const uploadMemberTypesData = async(values) => {
		let query = queries.QUERY_INSERT_MEMBER_TYPES
		let count = 0
		for(let value in values){
			count++
			query += `(${values[value]})`
			if(count < values.length) {query += ','}
			else {query += ';'}
		}

		const handler = async (client) => {
			const types = await client.query(query)
			return types
		}

		return await pool(handler)
	}
	
	const uploadUsersData = async(values) => {
		const handler = async (client) => {
			let ids = []
			for(let value in values){
				await client.query('begin')
				let result = await client.query(queries.QUERY_POST_USER, [values[value][3],values[value][2],values[value][0],values[value][6],values[value][5],values[value][4],values[value][14],values[value][13],values[value][12],values[value][11],values[value][10],null,null,values[value][8],values[value][9],values[value][1],null,values[value][7],0])
				await client.query('commit')
				ids.push(result.rows[0].new_id_)
			}
			return ids
		}

		return await pool(handler)
	}

	const uploadCompaniesData = async(values) => {
		const handler = async (client) => {
			let ids = []
			for(let value in values){
				await client.query('begin')
				let result = await client.query(queries.QUERY_POST_COMPANY, [values[value][4],values[value][2],values[value][14],values[value][13],values[value][12],values[value][11],values[value][10],null,null,values[value][0],null,values[value][1],0])
				await client.query('commit')
				ids.push(result.rows[0].new_id_)
			}
			return ids
		}

		return await pool(handler)
	}

	const uploadQuotasData = async(values) => {
		let query = queries.QUERY_INSERT_QUOTAS
		let count = 0
		for(let value in values){
			count++
			query += `(${values[value]})`
			if(count < values.length) {query += ','}
			else {query += ';'}
		}

		const handler = async (client) => {
			const quotas = await client.query(query)
			return quotas	
		}

		return await pool(handler)
	}

	const uploadSportsData = async(values) => {
		let query = queries.QUERY_INSERT_SPORTS
		let count = 0
		for(let value in values){
			count++
			query += `(${values[value]})`
			if(count < values.length) {query += ','}
			else {query += ';'}
		}

		const handler = async (client) => {
			const sports = await client.query(query)
			return sports
		}

		return await pool(handler)
	}

	const uploadSportTypesData = async(values) => {
		let query = queries.QUERY_INSERT_SPORT_TYPES
		let count = 0
		for(let value in values){
			count++
			query += `(${values[value]})`
			if(count < values.length) {query += ','}
			else {query += ';'}
		}

		const handler = async (client) => {
			const types = await client.query(query)
			return types
		}

		return await pool(handler)
	}

	const getStatisticsData = async() => {
		const users = await getUsersStatistics()
		const companies = await getCompaniesStatistics()
		const candidates = await getCandidatesStatistics()
		const sports = await getSportsStatistics()
		const upcoming_events = await getUpcomingEventsStatistics()
		const members = await getMemberGrowthStatistics()
		const quotas = await getQuotasStatistics()

		return {
			quotas,
			members,
			users,
			companies,
			candidates,
			sports,
			upcoming_events
		}	
	}

	const getUsersStatistics = async() => {
		const handler = async (client) => {
			const distribution = await client.query(queries.QUERY_USERS_STATISTICS)
			return distribution.rows
		}

		return await pool(handler)
	}

	const getCompaniesStatistics = async() => {
		const handler = async (client) => {
			const distribution = await client.query(queries.QUERY_COMPANIES_STATISTICS)
			return distribution.rows
		}

		return await pool(handler)
	}

	const uploadUsersSportsData = async(values) => {
		const handler = async (client) => {
			let results = []
			for(let value in values){
				await client.query(queries.QUERY_POST_USER_SPORT, [values[value][0],values[value][1],values[value][4],values[value][3],values[value][5],values[value][2],values[value][6],false])
				results.push({ id_: values[value][0], sid_: values[value][1]})
			}
			return results
		}

		return await pool(handler)
	}
	
	const getCandidatesStatistics = async() => {
		const handler = async (client) => {
			const distribution = await client.query(queries.QUERY_CANDIDATES_STATISTICS)
			return distribution.rows
		}

		return await pool(handler)
	}

	const getSportsStatistics = async() => {
		const handler = async (client) => {
			const distribution = await client.query(queries.QUERY_SPORTS_STATISTICS)
			return distribution.rows
		}

		return await pool(handler)
	}

	const getUpcomingEventsStatistics = async() => {
		const handler = async (client) => {
			const distribution = await client.query(queries.QUERY_EVENTS_STATISTICS)
			return distribution.rows
		}

		return await pool(handler)
	}

	const getMemberGrowthStatistics = async() => {
		const handler = async (client) => {
			const distribution = await client.query(queries.QUERY_MEMBER_DISTRIBUTION_STATISTICS)
			const growth = await client.query(queries.QUERY_MEMBER_GROWTH_STATISTICS)
			const years = await client.query(queries.QUERY_MEMBER_YEARS_STATISTICS)
			let member_growth = []
			for (let i = 1; i < growth.rows.length; i++) {
				member_growth[i-1] = ((parseInt(growth.rows[i-1].count) - parseInt(growth.rows[i].count)) / parseInt(growth.rows[i].count)) * 100
			}
			member_growth[growth.rows.length-1] = 0

			const years_ = years.rows.map(row => parseInt(row.years))
			const res = {
				"years": years_,
				"member_growth": member_growth,
				"data": distribution.rows
			}
			return res
		}

		return await pool(handler)
	}

	const getQuotasStatistics = async() => {
		const handler = async (client) => {
			const distribution = await client.query(queries.QUERY_QUOTAS_DISTRIBUTION_STATISTICS)
			const amountPaid = await client.query(queries.QUERY_QUOTAS_AMOUNT_STATISTICS)
			const totalAmount = await client.query(queries.QUERY_QUOTAS_TOTALAMOUNT_STATISTICS)
			const years = await client.query(queries.QUERY_QUOTAS_YEARS_STATISTICS)
			await client.query('commit')

			const years_ = years.rows.map(row => parseInt(row.years))
			const amountPaid_ = amountPaid.rows.map(row => parseInt(row.sum))
			const totalAmount_ = totalAmount.rows.map(row => parseInt(row.sum))

			const res = {
				"years": years_,
				"amounts" : amountPaid_,
				"total_amount": totalAmount_,
				"data": distribution.rows
			}
			return res
		}

		return await pool(handler)
	}

	const changePassword = async (id, hash) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_CHANGE_PASSWORD, [id, hash])
			return id
		}

		return await pool(handler)
	}

	const changeCredentials = async (id, username, hash) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_CHANGE_CREDENTIALS, [id, username, hash])
			return id
		}

		return await pool(handler)
	}

	const postNewCredentialsTokenData = async (id, hash) => {
		const handler = async (client) => {
			await client.query(queries.QUERY_POST_NEW_TOKEN_CREDENTIALS, [id, hash])
			return id
		}

		return await pool(handler)
	}
	
	return { 
		postNewCredentialsTokenData,
		changePassword,
		changeCredentials,
		getQuotasByDateData,
		getUserSportByIdAndUserData,
		getGroupsData, 
		getGroupByIdData, 
		getGroupByNameData,
		postGroupData,
		deleteGroupData,
		getMemberGroupsData,
		getGroupByIdMembersData,
		getCandidateByIbanData,
		getMemberByIbanData,
		getAllMembersData, 
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
		deleteQuotaData,
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
		getUserSportTypesData, 
		getEmailByGroupIdData,
		getUserEmailByIdData,
		postNewTokenData,
		getMemberTokenByIdData,
		deleteMemberTokenData,
		updateMemberTokenData,
		uploadMemberTypesData,
		uploadCompaniesData,
		uploadQuotasData,
		uploadSportsData,
		uploadSportTypesData,
		uploadUsersSportsData,
		uploadUsersData,
		getStatisticsData,
		getQuotasByEmailData,
		pool 
	}

}

export default db