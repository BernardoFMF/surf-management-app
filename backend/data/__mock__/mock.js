'use strict'

let members = []
let users = []
let companies = []
let candidates = []
let events = []
let attendance = []
let sports = []
let contacts = []
let user_imgs = []
let users_sports = []
let membership_cards = []
let quotas = []

let indexObj = {
	idxMember: 0,
	idxCandidates: 0,
	idxEvents: 0,
	idxSports: 0,
	idxQuotas: 0
}

/**
 * Candidates
 */

const getCandidatesData = () => {
	return candidates
}

const getCandidateByIdData = (id_) => {
	const candidate = candidates.filter(c => c.id_ == id_)[0]
	return candidate
}

const postCandidateData = (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_) => {
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
		pword_
	}
	candidates.push(candidate)
	return candidate
}

const deleteCandidateData = (id_) => {
	candidates = candidates.filter(candidate => candidate.id_ != id_)
	return candidates
}

const approveCandidateData = (id_, type_, quota_value_, qrcode_, paid_enrollment_) => {
	const candidate = getCandidateByIdData(id_)

	candidates = candidates.filter(candidate => candidate.id_ != id_)

	const uid_ = postUser(candidate._cc, candidate.nif_, type_, quota_value_, candidate.birth_date_, candidate.nationality_, candidate.full_name_, candidate.phone_number_, candidate.email_, candidate.postal_code_, candidate.address_, candidate.location_, candidate.pword_, candidate.username_, qrcode_, paid_enrollment_)

	return uid_
}

/**
 * Companies
 */

const getCompaniesData = () => {
	return companies.filter(company => company.is_deleted_ == false)
}

const getCompanyByIdData = (id_) => {
	const company = companies.filter(c => c.member_id_ == id_ && c.is_deleted_ != false)[0]
	return company
}

const postCompanyData = (name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
	indexObj.idxMember++
	const member = {
		id_: indexObj.idxMember,
		member_type_: 'corporate',
		has_debt_: true,
		quota_value_: 50,
		is_deleted_: false
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
	const date = quotas[quotas.length - 1].date_
	if (new Date().getFullYear() == date.split('-')[2]) {
		indexObj.idxQuotas++
		const quota = {
			id_: indexObj.idxQuotas,
			member_id_: member.id_,
			payment_date: null,
			date_: date
		}
		quota.push(quota)
	}
	members.push(member)
	companies.push(company)
	contacts.push(contact)
    
	return company.member_id_
}

const updateCompanyData = (id_, name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
	const idxCompany = companies.findIndex((company => company.member_id_ == id_))
	companies[idxCompany].name_ = name_
	companies[idxCompany].nif_ = nif_
	const idxContact = contacts.findIndex((contact => contact.member_id_ == id_))
	contacts[idxContact].phone_number_ = phone_number_
	contacts[idxContact].email_ = email_
	contacts[idxContact].postal_code_ = postal_code_
	contacts[idxContact].address_ = address_
	contacts[idxContact].location_ = location_

	return companies[idxCompany].member_id_
}

const deleteCompanyData = (id_) => {
	companies = companies.map(company => {
		if (company.member_id_ == id_) company.is_deleted_ = true
	})
	return companies
}

/**
 * Event
 */

const getEventsData = () => {
	return events
}

const getEventByIdData = (id_) => {
	const event = events.filter(event => event.id_ == id_)[0]
	return event
}

const postEventData = (name_, initial_date_, final_date_) => {
	indexObj.idxEvents++
	const event = {
		id_: indexObj.idxEvents++, 
		name_, 
		initial_date_, 
		final_date_}
	events.push(event)
	return event
}

const updateEventData = (id_, name_, initial_date_, final_date_) => {
	const idx = events.findIndex(event => event.id_ == id_)
	events[idx].name_ = name_
	events[idx].initial_date_ = initial_date_
	events[idx].final_date_ = final_date_
	return events[idx]	
}

const deleteEventData = (id_) => {
	events = events.filter(event => event.id_ != id_)
	return events
}

const postMemberAttendanceData = (eid_, id_, state_) => {
	const event_user = {
		member_id_: id_,
		event_id: eid_,
		state_
	}
	attendance.push(event_user)
	return event_user
}

const updateMemberAttendanceData = (eid_, id_, state_) => {
	const idx = attendance.findIndex(att => att.member_id_ == id_ && att.event_id == eid_)
	attendance[idx].state_ = state_
	return attendance[idx]
}

const getEventByIdAttendanceData = (eid_) => {
	return attendance.filter(att => att.eid_ == eid_)
}

/**
 * Sports
 */

const getSportsData = () => {
	return sports.filter(sport => sport.is_deleted_ == false)
}

const getSportByIdData = (id_) => {
	const sport = sports.filter(sport => sport.id_ == id_)[0]
	return sport
}

const postSportData = (name_) => {
	indexObj.idxSports++
	const sport = {
		id_: indexObj.idxSports, 
		name_
	}
	sports.push(sport)
	return sport.id_
}

const deleteSportData = (id_) => {
	sports = sports.filter(sport => sport.id_ != id_)
	return sports
}

/**
 * Users
 */

export {getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getSportsData, getSportByIdData, postSportData, deleteSportData} 