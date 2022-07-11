'use strict'

import e from "express"

let indexObj = {
	idxMember: 0,
	idxCandidates: 0,
	idxEvents: 0,
	idxSports: 0,
	idxQuotas: 0,
	idxGroups: 0

}

let members = [{
	id_: indexObj.idxMember,
	member_type_: 'founder',
	has_debt_: false,
	quota_value_: 0,
	pword_: '$2b$10$Q8swBKYlSvF7lzKgBrdZ2O0sahIXCCTtUkPobQ7BzBown1HDcVb0K',
	username_: 'senhorJoel',
	is_deleted_: false,
	iban_: "PT50111111111111111111111"
}]

let users = [{
	member_id_: indexObj.idxMember, 
	cc_: 987654321,
	nif_: 123456789,
	birth_date_: '01-01-1970',
	nationality_: 'Portuguesa',
	full_name_: 'Joel Joelho',
	enrollment_date_: '01-01-1970',
	paid_enrollment_: true,
	is_admin_: true,
	gender_: 'Male'
}]

let companies = []
let candidates = []
let events = []
let attendance = []
let sports = []
let contacts = [{
	member_id_: indexObj.idxMember, 
	location_: 'Ericeira',
	address_: 'Rua do surf, n543',
	postal_code_:'1890-987',
	email_:'miguelosousa@gmail.com',
	phone_number_:912345432
}]
let user_imgs = []
let users_sports = []
let membership_cards = []
let quotas = []
let member_types_ = []
let groups = []
let groups_events = []
let groups_members = []
let groups_members_types = []
let groups_sports = []
let user_sport_types = {'coach': 'coach', 'practitioner': 'practitioner', 'apprentice': 'apprentice', 'jury' : 'jury'}

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

const getCandidatesData = () => {
	const obj = {
		candidates: candidates.map(candidate => {
			const newCandidate = {
				id_: candidate.id_,
				username_: candidate.username_,
				cc_: candidate.cc_,
				nif_: candidate.nif_,
				birth_date_: candidate.birth_date_,
				nationality_: candidate.nationality_,
				full_name_: candidate.full_name_,
				phone_number_: candidate.phone_number_,
				email_: candidate.email_,
				postal_code_: candidate.postal_code_,
				address_: candidate.address_,
				location_: candidate.location_,
				gender_: candidate.gender_,
				iban_: candidate.iban_,
			}
			return newCandidate
		}),
		number_of_candidates: candidates.length
	}
	return obj
}

const getCandidateByIdData = async (id_) => {
	const candidate = candidates.filter(c => c.id_ == id_)[0]
	if (!candidate) return candidate
	const newCandidate = {
		id_: candidate.id_,
		username_: candidate.username_,
		cc_: candidate.cc_,
		nif_: candidate.nif_,
		birth_date_: candidate.birth_date_,
		nationality_: candidate.nationality_,
		full_name_: candidate.full_name_,
		phone_number_: candidate.phone_number_,
		email_: candidate.email_,
		postal_code_: candidate.postal_code_,
		address_: candidate.address_,
		location_: candidate.location_,
		gender_: candidate.gender_,
		iban_: candidate.iban_,
		img_: candidate.img_
	}
	return newCandidate
}

const postCandidateData = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, img_, gender_, iban_) => {
	indexObj.idxCandidates++
	const candidate = {
		id_: indexObj.idxCandidates, 
		username_,
		cc_, 
		nif_, 
		birth_date_, 
		nationality_, 
		full_name_, 
		phone_number_, 
		email_, 
		postal_code_, 
		address_, 
		location_, 
		pword_,
		img_,
		gender_,
		iban_
	}
	candidates.push(candidate)
	return candidate.id_
}

const deleteCandidateData = async (id_) => {
	candidates = candidates.filter(candidate => candidate.id_ != id_)
	return id_
}

const approveCandidateData = async (id_, type_, quota_value_, paid_enrollment_) => {
	const candidate = await getCandidateByIdData(id_)

	candidates = candidates.filter(candidate => candidate.id_ != id_)

	const uid_ = await postUserData(candidate.cc_, candidate.nif_, type_, quota_value_, candidate.birth_date_, candidate.nationality_, candidate.full_name_, candidate.phone_number_, candidate.email_, candidate.postal_code_, candidate.address_, candidate.location_, candidate.pword_, candidate.username_, paid_enrollment_, candidate.gender_, candidate.iban_)

	if(!candidate.img_) {
		const img = {
			user_id_: uid_,
			img_value_:candidate.img_
		}
		user_imgs.push(img)
	}
	return uid_
}

const getCandidateByUsernameData = async (username_) => {
	const candidate = candidates.filter(c => c.username_ == username_)[0]
	return candidate
}

const getCandidateByCCData = async (cc_) => {
	let candidate = candidates.filter(candidate => candidate.cc_ == cc_)[0]
	if (candidate) {
		return candidate
	}
	return undefined
}

const getCandidateByNifData = async (nif_) => {
	let candidate = candidates.filter(candidate => candidate.nif_ == nif_)[0]
	if (candidate) {
		return candidate
	}
	return undefined
}

const getCandidateByEmailData = async (email_) => {
	let candidate = candidates.filter(candidate => candidate.email_ == email_)[0]
	if (candidate) {
		return candidate
	}
	return undefined
}

const getCandidateByIbanData = async (iban_) => {
	let candidate = candidates.filter(candidate => candidate.iban_ == iban_)[0]
	if (candidate) {
		return candidate
	}
	return undefined
}

/**
 * Companies
 */

const getCompaniesData = async () => {
	let count = 0
	const companiesArray = companies.filter(async (company) => {
		const member = await getMemberByIdData(company.member_id_)
		if (member) {
			++count
			return true
		}
		return false
	})
	return {companies: companiesArray, number_of_companies: count}
}

const getCompanyByIdData = async (id_) => {
	const company = companies.filter(company => company.member_id_ == id_)[0]
	const contact = contacts.filter(contact => contact.member_id_ == id_)[0]
	if (company) {
		const member = await getMemberByIdData(company.member_id_)
		if (member) {
			const ret = {
				member_id_:company.member_id_,
				nif_:company.nif_,
				name_:company.name_,
				location_:contact.location_,
				address_:contact.address_,
				postal_code_:contact.postal_code_,
				email_:contact.email_,
				phone_number_:contact.phone_number_,
				username_:member.username_,
				has_debt_:member.has_debt_,
				member_type_:member.member_type_,
				iban_: member.iban_,
				is_deleted_: member.is_deleted_
			}
			return ret
		}
	}
	return undefined
}

const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, type_, img_, iban_) => {
	indexObj.idxMember++
	const member = {
		id_: indexObj.idxMember,
		member_type_: type_,
		has_debt_: true,
		quota_value_: 50,
		is_deleted_: false,
		username_,
		pword_,
		iban_
	}
	const company = {
		member_id_: indexObj.idxMember, 
		name_,
		nif_,
	}
	const contact = {
		member_id_: company.member_id_,
		location_,
		address_,
		postal_code_,
		email_,
		phone_number_
	}
	const temp_quota = quotas[quotas.length - 1]

	if (temp_quota && new Date().getFullYear() == temp_quota.date_.split('-')[2]) {
		indexObj.idxQuotas++
		const quota = {
			id_: indexObj.idxQuotas,
			member_id_: member.id_,
			payment_date: null,
			date_: temp_quota.date_
		}
		quotas.push(quota)
	}

	if (img_) {
		const user_img_ = {
			user_id_ : indexObj.idxMember,
			img_,
		}
		user_imgs.push(user_img_)
	}
	members.push(member)
	companies.push(company)
	contacts.push(contact)
    
	return company.member_id_
}

const updateCompanyData = async (id_, nif_, name_, phone_number_, postal_code_, address_, location_, img_, is_deleted_, iban_) => {
	const idxMember = members.findIndex((member => member.id_ == id_))
	members[idxMember].iban_ = iban_
	members[idxMember].is_deleted_ = is_deleted_
	const idxCompany = companies.findIndex((company => company.member_id_ == id_))
	companies[idxCompany].name_ = name_
	companies[idxCompany].nif_ = nif_
	const idxContact = contacts.findIndex((contact => contact.member_id_ == id_))
	contacts[idxContact].phone_number_ = phone_number_
	contacts[idxContact].postal_code_ = postal_code_
	contacts[idxContact].address_ = address_
	contacts[idxContact].location_ = location_

	if (img_) {
		const user_img_ = {
			user_id_ : id_,
			img_,
		}
		user_imgs.push(user_img_)
	}

	return companies[idxCompany].member_id_
}

const deleteCompanyData = async (id_) => {
	const idxCompany = members.findIndex(m => m.id_ == id_)
	members[idxCompany].is_deleted_ = true
	return id_
}

/**
 * Event
 */

const getEventsData = async (name_filter,initialDate_filter,endDate_filter,offset,limit) => {
	let date_today = formatDate(new Date())
	initialDate_filter = formatDate(initialDate_filter)
	endDate_filter = formatDate(endDate_filter)

	let filteredEvents = events.filter(event => {
		let results = []
		if (usernamefilter) {
			if (event.name_.includes(name_filter)) 
				results.push(true)
			else 
				results.push(false)
		}
		if (initialDate_filter) {
			if (event.initial_date_ === initialDate_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (endDate_filter) {
			if (event.final_date_ === endDate_filter) 
				results.push(true)
			else 
				results.push(false)
		}

		if (results.every(elem => elem === true)) return true
		else return false
	}).slice(offset, offset + limit).map(event => {
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
	const obj = {
		events: filteredEvents,
		number_of_events: filteredEvents.length
	}
	return obj
}

const getEventByIdData = async (id_) => {
	const event = events.filter(event => event.id_ == id_)[0]
	if (!event) return null

	let date_today = formatDate(new Date())
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
}

const postEventData = async (name_, initial_date_, final_date_, groups_) => {
	indexObj.idxEvents++
	const event = {
		id_: indexObj.idxEvents, 
		name_, 
		initial_date_, 
		final_date_,
		groups_
	}
	events.push(event)
	return event.id_
}

const updateEventData = async (id_, name_, initial_date_, final_date_) => {
	const idx = events.findIndex(event => event.id_ == id_)
	events[idx].name_ = name_
	events[idx].initial_date_ = initial_date_
	events[idx].final_date_ = final_date_
	return events[idx].id_
}

const deleteEventData = async (id_) => {
	events = events.filter(event => event.id_ != id_)
	attendance = attendance.filter(att => att.event_id_ != id_)
	return id_
}

const updateMemberAttendanceData = async (eid_, id_, state_) => {
	const idx = attendance.findIndex(att => att.member_id_ == id_ && att.event_id_ == eid_)
	attendance[idx].state_ = state_
	return {id_, eid_}
}

const getEventByIdAttendanceData = async (eid_, offset, limit) => {
	const ret = []
	for (const idx in attendance) {
		if(attendance[idx].event_id_ == eid_) {
			const member = await getMemberByIdData(attendance[idx].member_id_)
			const idxContact = contacts.findIndex((contact => contact.member_id_ == attendance[idx].member_id_))
	
			if (member) {
				const event = await getEventByIdData(eid_)
				const obj = {
					member_id_:attendance[idx].member_id_,
					username_:member.username_,
					event_id_: event.id_,
					name_: event.name_,
					state_:attendance[idx].state_,
					email_: contacts[idxContact].email_,
					phone_number_: contacts[idxContact].phone_number_
				}
				ret.push(obj)
			}
		}
	}
	ret = ret.slice(offset, offset + limit)
	return {ret,number_of_events:ret.length}
}

const getEventMemberByIdAttendanceData = async (id_,name_filter,state_filter,date_filter,offset,limit) => {
	const ret = attendance
		.filter(att => att.member_id_ == id_)
		.slice(offset, offset + limit)
		.map(attendance => {
			let results = []
			if (usernamefilter) {
				if (attendance.name_.includes(name_filter)) 
					results.push(true)
				else 
					results.push(false)
			}
			if (state_filter) {
				if (attendance.state_ === state_filter) 
					results.push(true)
				else 
					results.push(false)
			}
			if (date_filter) {
				if (attendance.date_ === date_filter) 
					results.push(true)
				else 
					results.push(false)
			}

			if (results.every(elem => elem === true)) return true
			else return false
		})
	let number_of_events = ret.length
	return {ret,number_of_events}
}
/**
 * Sports
 */

const getSportsData = async () => {
	return sports
}

const getSportByIdData = async (id_) => {
	const sport = sports.filter(sport => sport.id_ == id_)[0]
	if (sport) return sport
	return undefined
}

const postSportData = async (name_) => {
	indexObj.idxSports++
	const sport = {
		id_: indexObj.idxSports, 
		name_,
		is_deleted_: false
	}
	sports.push(sport)
	return sport.id_
}

const updateSportData = async (id_, is_deleted_, name_) => {
	const idxSport = sports.findIndex(sport => sport.id_ == id_)
	sports[idxSport].is_deleted_ = is_deleted_
	sports[idxSport].name_ = name_
	return sports[idxSport].id_
}

const deleteSportData = async (id_) => {
	const idxSport = sports.findIndex(sport => sport.id_ == id_)
	sports[idxSport].is_deleted_ = true
	return id_
}

/**
 * Member
 */

const getMemberByIdData = async (id_) => {
	const member = members.filter(member => member.id_ == id_)[0]
	return member
}

const getMemberByUsernameData = async (username_) => {
	let member = members.filter(member => member.username_ == username_)[0]
	if (member && member.member_type_ != 'corporate') {
		const user = await getUserByIdData(member.id_)
		member.is_admin_ = user.is_admin_
		return member
	}
	return undefined
}

const getMemberByCCData = async (cc_) => {
	let user = users.filter(user => user.cc_ == cc_)[0]
	if (user) {
		const member = await getMemberByIdData(user.member_id_)
		user = {...user, ...member}
		return user
	}
	return undefined
}

const getMemberByNifData = async (nif_) => {
	let user = users.filter(user => user.nif_ == nif_)[0]
	if (user) {
		const member = await getMemberByIdData(user.member_id_)
		user = {...user, ...member}
		return user
	}
	let company = companies.filter(company => company.nif_ == nif_)[0]
	if (company) {
		const member = await getMemberByIdData(user.member_id_)
		company = {...company, ...member}
		return company
	}
	return undefined
}

const getMemberByEmailData = async (email_) => {
	let contact = contacts.filter(contact => contact.email_ == email_)[0]
	if (contact) {
		const member = await getUserByIdData(contact.member_id_)
		member = {...member, ...contact}
		return member
	}
	return undefined
}


const getMemberByIbanData = async (iban_) => {
	let member = members.filter(member => member.iban_ == iban_)[0]
	if (member ) {
		return member
	}
	return undefined
}

/**
 * Users
 */

const getUsersData = async (username_filter,name_filter,email_filter,debt_filter,offset,limit) => {
	const usersArray = users.filter(async (user) => {
		const member = await getMemberByIdData(user.member_id_)
		const contact = contacts.filter(con => con.member_id_ == user.member_id_)[0]
		let results = []
		if (name_filter) {
			if (user.full_name_.includes(name_filter)) 
				results.push(true)
			else 
				results.push(false)
		}
		if (username_filter) {
			if (member.username_.includes(username_filter)) 
				results.push(true)
			else 
				results.push(false)
		}
		if (debt_filter) {
			if (member.has_debt_ === debt_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (email_filter) {
			if (contact.email_ === email_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (results.every(elem => elem === true)) return true
		else return false
	}).slice(offset, limit + offset)
	return {users: usersArray, number_of_users: usersArray.length}
}

const getUserByIdData = async (id_) => {
	let user = users.filter(user => user.member_id_ == id_)[0]
	if (user) {
		const contact = contacts[contacts.findIndex(c => c.member_id_ == id_)]
		const member = await getMemberByIdData(user.member_id_)
		user = {...user, ...contact, ...member}
		if (member) return user
	}
	return undefined
}

const postUserData = async (cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_, url, iban_, img_) => {
	indexObj.idxMember++
	const member = {
		id_: indexObj.idxMember,
		member_type_: type_,
		has_debt_: true,
		pword_,
		username_,
		is_deleted_: false,
		iban_
	}
	const user = {
		member_id_: indexObj.idxMember, 
		cc_,
		nif_,
		birth_date_,
		nationality_,
		full_name_,
		enrollment_date_: new Date().toLocaleDateString().split('/').join('-'),
		paid_enrollment_,
		is_admin_: false,
		gender_
	}
	const contact = {
		member_id_: user.member_id_,
		location_,
		address_,
		postal_code_,
		email_,
		phone_number_
	}

	const date = new Date()
	const curr_date = formatDate(`${date.getFullYear()}-01-01`)
	let dates = []
	dates =  [... new Set(quotas.filter(elem => elem.date_ >= curr_date))]

	const value = member_types_.filter(elem => elem.type_ == type_)[0].quota_value_
	if (dates) {
		dates.forEach(elem => {
			indexObj.idxQuotas++
			const quota = {
				id_: indexObj.idxQuotas,
				member_id_: member.id_,
				payment_date_: null,
				date_: elem,
				amount_ : value
			}
			quotas.push(quota)
		})
		
	}

	if (img_) {
		const user_img_ = {
			user_id_ : indexObj.idxMember,
			img_,
		}
		user_imgs.push(user_img_)
	}
	members.push(member)
	users.push(user)
	contacts.push(contact)
    
	return user.member_id_
}

const updateUserQrCodeData = async (id_, qrcode_) => {
	const membership_card = {
		user_id_ : id_,
		qrcode_
	}
	membership_cards.push(membership_card)
}

const updateUserData = async (id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_, iban_) => {
	const idxMember = members.findIndex(member => member.id_ == id_)
	members[idxMember].is_deleted_ = is_deleted_
	members[idxMember].type_ = type_
	members[idxMember].iban_ = iban_

	const idxUser = users.findIndex(user => user.member_id_ == id_)
	users[idxUser].cc_ = cc_
	users[idxUser].nif_ = nif_
	users[idxUser].birth_date_ = birth_date_
	users[idxUser].nationality_ = nationality_
	users[idxUser].full_name_ = full_name_
	users[idxUser].paid_enrollment_ = paid_enrollment_
	users[idxUser].is_admin_ = is_admin_
	users[idxUser].gender_ = gender_

	const idxContact = contacts.findIndex(contact => contact.member_id_ == id_)
	contacts[idxContact].phone_number_ = phone_number_
	contacts[idxContact].postal_code_ = postal_code_
	contacts[idxContact].address_ = address_
	contacts[idxContact].location_ = location_

	if (img_) {
		const user_img_ = {
			user_id_ : id_,
			img_,
		}
		user_imgs.push(user_img_)
	}

	return users[idxUser].member_id_
} 

const deleteUserData = async (id_) => {
	members = members.map(member => {
		if (member.id_ == id_) member.is_deleted_ = true
		return member
	})
	return id_
}

const getUsersSportsData = async () => {
	let users_sports_array = []
	for (const idx in users_sports) {
		const member = await getMemberByIdData(users_sports[idx].user_id_)
		const sport = await getSportByIdData(users_sports[idx].sport_id_)
		if (member && sport) users_sports_array.push({...users_sports[idx], username_: member.username_, name_: sport.name_})
	}
	return {users_sports_array,number_of_sports:users_sports_array.length}
}

const getUsersSportData = async (id_, offset, limit, is_candidate_, username_) => {
	let sports_tuples = await getUsersSportsData()
	let res = sports_tuples.users_sports_array.filter(sport => sport.sport_id_ == id_)
	res = res.filter(user => {
		let results = []
		if (is_candidate_) {
			if (user.is_candidate_.includes(is_candidate_)) 
				results.push(true)
			else 
				results.push(false)
		}
		if (username_) {
			if (user.username_.includes(username_)) 
				results.push(true)
			else 
				results.push(false)
		}
		if (results.every(elem => elem === true)) return true
		else return false
	}).slice(offset, offset + limit)
	return {res,number_of_sports:res.length}
}

const getUserSportsByIdData = async (id_,offset, limit) => {
	let sports_tuples = await getUsersSportsData()
	let res = sports_tuples.users_sports_array.filter(user => user.user_id_ == id_).slice(offset, limit + offset)
	return {res,number_of_sports:res.length}
}

const getUserSportByIdAndUserData = async (id_, sid_) => {
	const idx = users_sports.findIndex(us => us.user_id_ == id_ && us.sport_id_ == sid_)
	if (idx == -1) return undefined
	return users_sports[idx]
}

const postUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_candidate_) => {
	const user_sport = {
		user_id_: id_,
		sport_id_: sid_,
		type_,
		fed_number_, 
		fed_id_,
		fed_name_,
		years_federated_,
		is_absent_: false,
		is_candidate_
	}
	users_sports.push(user_sport)
	return {id_: user_sport.user_id_, sid_: user_sport.sport_id_}
} 

const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_, is_candidate_) => {
	const user_sport_idx = users_sports.findIndex(user_sport => user_sport.user_id_ == id_ && user_sport.sport_id_ == sid_)
	users_sports[user_sport_idx].fed_id_ = fed_id_
	users_sports[user_sport_idx].fed_number_ = fed_number_
	users_sports[user_sport_idx].fed_name_ = fed_name_
	users_sports[user_sport_idx].type_ = type_
	users_sports[user_sport_idx].years_federated_ = years_federated_
	users_sports[user_sport_idx].is_absent_ = is_absent_
	users_sports[user_sport_idx].is_candidate_ = is_candidate_

	return {id_: users_sports[user_sport_idx].user_id_, sid_: users_sports[user_sport_idx].sport_id_}
}

const deleteUserSportData = async (id_, sid_) => {
	const user_sport_idx = users_sports.findIndex(user_sport => user_sport.user_id_ == id_ && user_sport.sport_id_ == sid_)
	if(user_sport_idx != -1) {
		users_sports[user_sport_idx].is_absent_ = true
	}
	return {id_, sid_}
}

/**
 * Quotas
 */

const getQuotasData = async (username_filter,email_filter,date_filter,offset,limit) => {
	let quotasArray = []
	date_filter = formatDate(date_filter)
	quotas.forEach(async (element) => {
		const contact = contacts.filter(elem => elem.member_id_ == element.id_)[0]
		let results = []
		if (username_filter) {
			if (element.username_.includes(username_filter)) 
				results.push(true)
			else 
				results.push(false)
		}
		if (date_filter) {
			if (element.date_.includes(date_filter)) 
				results.push(true)
			else 
				results.push(false)
		}
		if (email_filter) {
			if (contact.email_ === email_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (results.every(elem => elem === true)) quotasArray.push({...element, })
	}).slice(offset, limit + offset)
	return {quotas: quotasArray, number_of_quotas: quotasArray.length}
}

const getQuotasByDateData = async (date) => {
	date = formatDate(date)
	return quotas.filter(elem => elem.date_ == date)
}

const getQuotasByEmailData = async (email) => {
	let quotasArray = quotas.filter(element => {
		let results = []
		if (email) {
			if (element.email_ === email) 
				results.push(true)
			else 
				results.push(false)
		}
		if (results.every(elem => elem === true)) return true
		else return false
	})
	return quotasArray
}

const getCompaniesQuotasData = async () => {
	return quotas.filter(quota => {
		const member = members.filter(member => member.id_ == quota.member_id_ && !member.is_deleted_ && member.member_type_ == 'corporate')[0]
		if (member) {
			return true
		}
		return false
	})
}

const getUsersQuotasData = async () => {
	return quotas.filter(quota => {
		const member = members.filter(member => member.id_ == quota.member_id_ && !member.is_deleted_ && member.member_type_ != 'corporate')[0]
		if (member) {
			return true
		}
		return false
	})
}

const getMemberQuotasByIdData = async (id_,offset,limit) => {
	const member = await getMemberByIdData(id_)
	if (member)
		return quotas.filter(quota => quota.member_id_ == id_).slice(offset, limit+offset)
	return undefined
}

const postQuotaData = async (date_) => {
	let cnt = indexObj.idxQuotas
	date_ = formatDate(date_)
	members.forEach(member => {
		const hasQuota = quotas.filter(quota => quota.member_id_ == member.id_ && quota.date_ == date_)[0]
		const value = member_types_.filter(elem => elem.type_ == member.type_)[0].quota_value_

		if (!hasQuota) {
			if (member.quota_value_ != 0) {
				indexObj.idxQuotas++
				const quota = {
					id_: indexObj.idxQuotas,
					member_id_: member.id_,
					username_: member.username_,
					payment_date_: null,
					date_,
					amount_: value
				}
				quotas.push(quota)
			}
				
		}
	})
	return date_
}

const updateMemberQuotaData = async (qid_, payment_date_) => {
	let id
	payment_date_ = formatDate(payment_date_)
	quotas = quotas.map(quota => {
		if (quota.id_ == qid_) {
			id = quota.id_
			quota.payment_date_ = payment_date_
		}
		return quota
	})
	return id
}

const getQuotaByIdData = async (qid_) => {
	const quota = quotas.filter(quota => quota.id_ == qid_)[0]
	return quota
}

const getManagementQuotas = async(category_) => {
	return member_types_.filter(elem => elem.category_ == category_)
}

const updateManagementQuotaByType = async(type_, quota_value_) => {
	const member_type_idx = member_types_.findIndex(mt => mt.type_ == type_)
	member_types_[member_type_idx].quota_value_ = quota_value_
	return type_
}

const postManagementQuota = async(type_, quota_value_, category_) => {
	const mt = {
		type_,
		quota_value_,
		category_
	}
	member_types_.push(mt)
	return type_
}

const getManagementQuotaByType = async(type_) => {
	return member_types_.filter(mt => mt.type_ == type_)[0]
}

const getEmails = async() => {
	let emails = []
	for(let idx in contacts) {
		emails.push(contacts[idx].email_)
	}
	return emails
}

const getGroupsData = async (name_filter, group_type_filter, types_filter, offset, limit) => {
	let groupsFiltered = []
	groupsFiltered = groups
		.filter(elem => group_type_filter ? elem.group_type_ == group_type_filter : true )
		.filter(elem => name_filter ? elem.name_ == name_filter : true )
		.filter(elem => {
			if(!types_filter) return true
			if(elem.group_type_ == 'member_type') {
				const types = groups_members_types.filter(group => elem.group_id_ == group.group_id_ && types_filter.includes(group.member_type_))[0]
				if(!types) return false
				else return true
			}
			else if(elem.group_type_ == 'member_sport_type') {
				const types = groups_sports.filter(group => elem.group_id_ == group.group_id_ && types_filter.includes(group.sport_member_type_))[0]
				if(!types) return false
				else return true
			}
		})
	return groupsFiltered.slice(offset, limit + offset)
}

const getGroupByIdData = async (id_) => {
	return groups.filter(g => g.group_id_ == id_)[0]
}

const getGroupByNameData = async (name_) => {
	return groups.filter(g => g.name_ == name_)[0]
}

const postGroupData = async (name_, description_, group_type_, types_, sports_) => {
	indexObj.idxGroups++
	groups.push({group_id_: indexObj.idxGroups, name_, description_, group_type_ })
	if(group_type_ == 'member_type') {
		types_.forEach(elem => {
			groups_members_types.push({group_id_: indexObj.idxGroups, member_type_: elem})
			members
				.filter(member => member.type_ == elem)
				.forEach(elem => {
					groups_members.push({group_id_: indexObj.idxGroups, member_id_: elem.id_})
				})
		})
	}
	else if (group_type_ == 'member_sport_type') {
		sports_.forEach(sport => {
			types_.forEach(type => {
				users_sports
					.filter(user => user.sport_id_ == sport.id_ && user.type_ == type)
					.forEach(elem => {
						groups_members.push({group_id_: indexObj.idxGroups, member_id_: elem.user_id_})
						groups_sports.push({group_id_: indexObj.idxGroups, sport_id_: sport.id_, sport_member_type_: type})
					})
			})
		})
	}

}

const deleteGroupData = async (id_) => {
	groups_events = groups_events.filter(group => group.group_id_ != id_)
	groups_members = groups_members.filter(group => group.group_id_ != id_)
	groups_sports = groups_sports.filter(group => group.group_id_ != id_)
	groups_members_types = groups_members_types.filter(group => group.group_id_ != id_)
	groups = groups_members_types.filter(group => group.group_id_ != id_)
}

const getMemberGroupsData = async (id_, name_filter, group_type_filter, types_filter, offset, limit) => {
	let groupsFiltered = []
	groupsFiltered = groups_members
		.filter(elem => elem.member_id_ == id_)
		.map(elem => {
			const group = await getGroupByIdData(elem.group_id_)
			return group
		})
		.filter(elem => group_type_filter ? elem.group_type_ == group_type_filter : true )
		.filter(elem => name_filter ? elem.name_ == name_filter : true )
		.filter(elem => {
			if(!types_filter) return true
			if(elem.group_type_ == 'member_type') {
				const types = groups_members_types.filter(group => elem.group_id_ == group.group_id_ && types_filter.includes(group.member_type_))[0]
				if(!types) return false
				else return true
			}
			else if(elem.group_type_ == 'member_sport_type') {
				const types = groups_sports.filter(group => elem.group_id_ == group.group_id_ && types_filter.includes(group.sport_member_type_))[0]
				if(!types) return false
				else return true
			}
		})
	return groupsFiltered.slice(offset, limit + offset)
}

const getGroupByIdMembersData = async (id_, username_filter_, offset, limit) => {
	let m = groups_members
		.filter(elem => elem.group_id_ == id_)
		.map(elem => {
			const member = members.filter(member => member.id_ == elem.member_id_)[0]
			return {id_ : member.id_, username_: member.username_, member_type_: member.member_type_}
		})
	if(username_filter_) {
		m = m.filter(elem => elem.username_ == username_filter_)
	}
	return m.slice(offset, limit + offset)		
}

const getUserSportTypesData = async () => {
	return user_sport_types
}




const mock_data = { 
	getGroupsData, 
	getGroupByIdData, 
	getGroupByNameData,
	postGroupData,
	deleteGroupData,
	getMemberGroupsData,
	getGroupByIdMembersData,
	getQuotasByDateData, 
	getQuotasByEmailData, 
	getUserSportByIdAndUserData, 
	getMemberByIbanData, 
	getCandidateByIbanData, 
	getManagementQuotas,
	updateManagementQuotaByType, 
	getManagementQuotaByType, 
	postManagementQuota, 
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
	getEventMemberByIdAttendanceData, 
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
	updateUserQrCodeData, 
	getMemberByCCData, 
	getMemberByNifData, 
	getMemberByEmailData, 
	getCandidateByEmailData, 
	getCandidateByCCData, 
	getCandidateByNifData 
}

export default mock_data