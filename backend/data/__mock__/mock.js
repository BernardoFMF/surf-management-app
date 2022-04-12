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

const getCandidateByIdData = async (id_) => {
	const candidate = candidates.filter(c => c.id_ == id_)[0]
	return candidate
}

const postCandidateData = async (username_, cc_, nif_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_) => {
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

const deleteCandidateData = async (id_) => {
	candidates = candidates.filter(candidate => candidate.id_ != id_)
	return candidates
}

const approveCandidateData = async (id_, type_, quota_value_, qrcode_, paid_enrollment_) => {
	const candidate = getCandidateByIdData(id_)

	candidates = candidates.filter(candidate => candidate.id_ != id_)

	const uid_ = postUserData(candidate.cc_, candidate.nif_, type_, quota_value_, candidate.birth_date_, candidate.nationality_, candidate.full_name_, candidate.phone_number_, candidate.email_, candidate.postal_code_, candidate.address_, candidate.location_, candidate.pword_, candidate.username_, qrcode_, paid_enrollment_)

	return uid_
}

const getCandidateByUsernameData = async (username_) => {
	const candidate = candidates.filter(c => c.username_ == username_)[0]
	return candidate
}

/**
 * Companies
 */

const getCompaniesData = async () => {
	return companies.filter(company => {
		const member = getMemberByIdData(company.member_id_)
		if (member) return true
		return false
	})
}

const getCompanyByIdData = async (id_) => {
	const company = companies.filter(company => company.member_id_ == id_)[0]
	if (company) {
		const member = getMemberByIdData(company.member_id_)
		if (member) return company
	}
	return undefined
}

const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
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
	members.push(member)
	companies.push(company)
	contacts.push(contact)
    
	return company.member_id_
}

const updateCompanyData = async (id_, name_, nif_, phone_number_, email_, postal_code_, address_, location_) => {
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

const deleteCompanyData = async (id_) => {
	members = members.map(member => {
		if (member.id_ == id_) member.is_deleted_ = true
		return member
	})
	return companies
}

/**
 * Event
 */

const getEventsData = async () => {
	return events
}

const getEventByIdData = async (id_) => {
	const event = events.filter(event => event.id_ == id_)[0]
	return event
}

const postEventData = async (name_, initial_date_, final_date_) => {
	indexObj.idxEvents++
	const event = {
		id_: indexObj.idxEvents, 
		name_, 
		initial_date_, 
		final_date_}
	events.push(event)
	return event
}

const updateEventData = async (id_, name_, initial_date_, final_date_) => {
	const idx = events.findIndex(event => event.id_ == id_)
	events[idx].name_ = name_
	events[idx].initial_date_ = initial_date_
	events[idx].final_date_ = final_date_
	return events[idx]	
}

const deleteEventData = async (id_) => {
	events = events.filter(event => event.id_ != id_)
	attendance = attendance.filter(att => att.event_id_ != id_)
	return events
}

const postMemberAttendanceData = async (eid_, id_, state_) => {
	const event_user = {
		member_id_: id_,
		event_id_: eid_,
		state_
	}
	attendance.push(event_user)
	return event_user
}

const updateMemberAttendanceData = async (eid_, id_, state_) => {
	const idx = attendance.findIndex(att => att.member_id_ == id_ && att.event_id_ == eid_)
	attendance[idx].state_ = state_
	return attendance[idx]
}

const getEventByIdAttendanceData = async (eid_) => {
	return attendance.filter(att => att.event_id_ == eid_)
}

/**
 * Sports
 */

const getSportsData = async () => {
	return sports.filter(sport => !sport.is_deleted_)
}

const getSportByIdData = async (id_) => {
	const sport = sports.filter(sport => sport.id_ == id_)[0]
	if (sport && !sport.is_deleted_) return sport
	return undefined
}

const postSportData = async (name_) => {
	indexObj.idxSports++
	const sport = {
		id_: indexObj.idxSports, 
		name_
	}
	sports.push(sport)
	return sport.id_
}

const deleteSportData = async (id_) => {
	sports = sports.filter(sport => sport.id_ != id_)
	return sports
}

/**
 * Member
 */

const getMemberByIdData = async (id_) => {
	const member = members.filter(member => member.id_ == id_ && !member.is_deleted_)[0]
	return member
}

const getMemberByUsernameData = async (username_) => {
	const member = members.filter(member => member.username_ == username_ && !member.is_deleted_)[0]
	return member
}

/**
 * Users
 */

const getUsersData = async () => {
	return users.filter(user => {
		const member = getMemberByIdData(user.member_id_)
		if (member) return true
		return false
	})
}

const getUserByIdData = async (id_) => {
	const user = users.filter(user => user.member_id_ == id_)[0]
	if (user) {
		const member = getMemberByIdData(user.member_id_)
		if (member) return user
	}
	return undefined
}

const postUserData = async (cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, qrcode_, paid_enrollment_) => {
	indexObj.idxMember++
	const member = {
		id_: indexObj.idxMember,
		member_type_: type_,
		has_debt_: true,
		quota_value_,
		pword_,
		username_,
		is_deleted_: false
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
		is_admin_: false
	}
	const contact = {
		member_id_: user.member_id_,
		location_,
		address_,
		postal_code_,
		email_,
		phone_number_
	}
	const membership_card = {
		user_id_ : indexObj.idxMember,
		qrcode_
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
	members.push(member)
	users.push(user)
	contacts.push(contact)
	membership_cards.push(membership_card)
    
	return user.member_id_
}

const updateUserData = async (id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, img_, img_name_, paid_enrollment_, is_admin_) => {
	const idxUser = users.findIndex(user => user.member_id_ == id_)
	users[idxUser].cc_ = cc_
	users[idxUser].nif_ = nif_
	users[idxUser].type_ = type_
	users[idxUser].quota_value_ = quota_value_
	users[idxUser].birth_date_ = birth_date_
	users[idxUser].nationality_ = nationality_
	users[idxUser].full_name_ = full_name_
	users[idxUser].paid_enrollment_ = paid_enrollment_
	users[idxUser].is_admin_ = is_admin_

	const idxContact = contacts.findIndex(contact => contact.member_id_ == id_)
	contacts[idxContact].phone_number_ = phone_number_
	contacts[idxContact].email_ = email_
	contacts[idxContact].postal_code_ = postal_code_
	contacts[idxContact].address_ = address_
	contacts[idxContact].location_ = location_

	const idxMember = members.findIndex(member => member.id_ == id_)
	members[idxMember].username = username_
	members[idxMember].username = pword_

	if (img_) {
		const user_img_ = {
			user_id_ : indexObj.idxMember,
			img_,
			img_name_
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
	return users
}

const getUsersSportsData = async () => {
	return users_sports.filter(tuple => {
		const user = getUserByIdData(tuple.user_id_)
		const sport = getSportByIdData(tuple.sport_id_)
		if (user && sport && !tuple.is_absent_) return true
		return false
	})
}

const getUsersSportData = async (id_) => {
	let users_tuples = []
	const sports_tuples = users_sports.filter(sport => sport.sport_id_ == id_)
	sports_tuples.forEach(tuple => {
		const user = getUserByIdData(tuple.user_id_)
		const sport = getSportByIdData(tuple.sport_id_)
		if (user && sport && !tuple.is_absent_)
			users_tuples.push(user)
	})
	return users_tuples
}

const getUserSportsByIdData = async (id_) => {
	let sports_tuples = []
	const users_tuples = users_sports.filter(user => user.user_id_ == id_)
	users_tuples.forEach(tuple => {
		const user = getUserByIdData(tuple.user_id_)
		const sport = getSportByIdData(tuple.sport_id_)
		if (sport && user && !tuple.is_absent_)
			sports_tuples.push(sport)
	})
	return sports_tuples
}

const postUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
	const user_sport_idx = users_sports.findIndex(user_sport => user_sport.user_id_ == id_ && user_sport.sport_id_ == sid_)
	if(user_sport_idx == -1) {
		const user_sport = {
			user_id_: id_,
			sport_id_: sid_,
			type_,
			fed_number_, 
			fed_id_,
			fed_name_,
			years_federated_,
			is_absent_: false
		}
		users_sports.push(user_sport)
		return user_sport
	} else {
		users_sports[user_sport_idx].is_absent_ = false
		return users_sports[user_sport_idx]
	}
} 

const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
	const user_sport_idx = users_sports.findIndex(user_sport => user_sport.user_id_ == id_ && user_sport.sport_id_ == sid_)
	if(user_sport_idx != -1) {
		users_sports[user_sport_idx].fed_id_ = fed_id_
		users_sports[user_sport_idx].fed_number_ = fed_number_
		users_sports[user_sport_idx].fed_name_ = fed_name_
		users_sports[user_sport_idx].type_ = type_
		users_sports[user_sport_idx].years_federated_ = years_federated_
		users_sports[user_sport_idx].is_absent_ = false
	}
	return users_sports[user_sport_idx]
}

const deleteUserSportData = async (id_, sid_) => {
	const user_sport_idx = users_sports.findIndex(user_sport => user_sport.user_id_ == id_ && user_sport.sport_id_ == sid_)
	if(user_sport_idx != -1) {
		users_sports[user_sport_idx].is_absent_ = true
	}
	return users_sports[user_sport_idx]
}

/**
 * Quotas
 */

const getQuotasData = async () => {
	return quotas
}

const getCompaniesQuotasData = async () => {
	return quotas.filter(quota => {
		if (getCompanyByIdData(quota.member_id_)) {
			return true
		}
		return false
	})
}

const getUsersQuotasData = async () => {
	return quotas.filter(quota => {
		if (getUserByIdData(quota.member_id_)) {
			return true
		}
		return false
	})
}

const getMemberQuotasByIdData = async (id_) => {
	return quotas.filter(quota => quota.member_id_ == id_)[0]
}

const postQuotaData = async (date_) => {
	let cnt = indexObj.idxQuotas
	members.forEach(member => {
		indexObj.idxQuotas++
		const quota = {
			id_: indexObj.idxQuotas,
			member_id_: member.id_,
			payment_date: null,
			date_
		}
		quotas.push(quota)
	})
	return indexObj.idxQuotas - cnt
}

const updateMemberQuotaData = async (qid_, payment_date_) => {
	quotas = quotas.map(quota => {
		if (quota.id_ == qid_) {
			quota.payment_date_ = payment_date_
		}
		return quota
	})
	return quotas.filter(quota => quota.id_ == qid_)[0]
}

const getQuotaByIdData = async (qid_) => {
	const quota = quotas.filter(quota => quota.id_ == qid_)[0]
	return quota
}

const mock_data = { getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCandidateByUsernameData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getSportsData, getSportByIdData, postSportData, deleteSportData, getUsersData, getUserByIdData, postUserData, updateUserData, deleteUserData, getUsersSportsData, getUsersSportData, getUserSportsByIdData, postUserSportData, updateUserSportData, deleteUserSportData, getQuotasData, getCompaniesQuotasData, getUsersQuotasData, getMemberQuotasByIdData, postQuotaData, updateMemberQuotaData, getMemberByIdData, getMemberByUsernameData, getQuotaByIdData }

export default mock_data