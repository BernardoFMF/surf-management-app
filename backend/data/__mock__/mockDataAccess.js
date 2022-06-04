'use strict'

let indexObj = {
	idxMember: 0,
	idxCandidates: 0,
	idxEvents: 0,
	idxSports: 0,
	idxQuotas: 0
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
	email_:'miguelgbosousa@gmail.com',
	phone_number_:912345432
}]
let user_imgs = []
let users_sports = []
let membership_cards = []
let quotas = []

let member_types_ = []
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
	return companies.filter(async (company) => {
		const member = await getMemberByIdData(company.member_id_)
		if (member) return true
		return false
	})
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

const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_,username_, pword_, iban_) => {
	indexObj.idxMember++
	const member = {
		id_: indexObj.idxMember,
		member_type_: 'corporate',
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
	members.push(member)
	companies.push(company)
	contacts.push(contact)
    
	return company.member_id_
}

const updateCompanyData = async (id_, nif_, name_, phone_number_, postal_code_, address_, location_, iban_) => {
	const idxMember = members.findIndex((member => member.id_ == id_))
	members[idxMember].iban_ = iban_
	const idxCompany = companies.findIndex((company => company.member_id_ == id_))
	companies[idxCompany].name_ = name_
	companies[idxCompany].nif_ = nif_
	const idxContact = contacts.findIndex((contact => contact.member_id_ == id_))
	contacts[idxContact].phone_number_ = phone_number_
	contacts[idxContact].postal_code_ = postal_code_
	contacts[idxContact].address_ = address_
	contacts[idxContact].location_ = location_

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
		final_date_
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

const postMemberAttendanceData = async (eid_, id_, state_) => {
	const event_user = {
		member_id_: id_,
		event_id_: eid_,
		state_
	}
	attendance.push(event_user)
	return {id_, eid_}
}

const updateMemberAttendanceData = async (eid_, id_, state_) => {
	const idx = attendance.findIndex(att => att.member_id_ == id_ && att.event_id_ == eid_)
	attendance[idx].state_ = state_
	return {id_, eid_}
}

const getEventByIdAttendanceData = async (eid_) => {
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
	return ret
}

const getEventMemberByIdAttendanceData = async (id_) => {
	const ret = attendance.filter(att => att.member_id_ == id_)
	return ret
}
/**
 * Sports
 */

const getSportsData = async () => {
	return sports.filter(sport => !sport.is_deleted_)
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
	const member = members.filter(member => member.id_ == id_ && !member.is_deleted_)[0]
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

const getUsersData = async () => {
	return users.filter(async (user) => {
		const member = await getMemberByIdData(user.member_id_)
		if (member) return true
		return false
	})
}

const getUserByIdData = async (id_) => {
	let user = users.filter(user => user.member_id_ == id_)[0]
	if (user) {
		const contact = contacts[contacts.findIndex(c => c.member_id_ == id_)]
		user = {...user, ...contact}
		const member = await getMemberByIdData(user.member_id_)
		if (member) return user
	}
	return undefined
}

const postUserData = async (cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, email_, postal_code_, address_, location_, pword_, username_, paid_enrollment_, gender_, iban_) => {
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
	const temp_quota = quotas[quotas.length - 1]

	if (temp_quota && new Date().getFullYear() == temp_quota.date_.split('-')[0]) {
		indexObj.idxQuotas++
		const quota = {
			id_: indexObj.idxQuotas,
			member_id_: member.id_,
			payment_date_: null,
			date_: temp_quota.date_
		}
		quotas.push(quota)
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

const updateUserData = async (id_, cc_, nif_, type_, quota_value_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_, iban_) => {
	const idxMember = members.findIndex(member => member.id_ == id_)
	members[idxMember].is_deleted_ = is_deleted_
	members[idxMember].type_ = type_
	members[idxMember].quota_value_ = quota_value_
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
	return users_sports_array
}

const getUsersSportData = async (id_) => {
	let sports_tuples = await getUsersSportsData()
	return sports_tuples.filter(sport => sport.sport_id_ == id_)
}

const getUserSportsByIdData = async (id_) => {
	let sports_tuples = await getUsersSportsData()
	return sports_tuples.filter(user => user.user_id_ == id_)
}

const postUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_) => {
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
	return {id_: user_sport.user_id_, sid_: user_sport.sport_id_}
} 

const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_) => {
	const user_sport_idx = users_sports.findIndex(user_sport => user_sport.user_id_ == id_ && user_sport.sport_id_ == sid_)
	users_sports[user_sport_idx].fed_id_ = fed_id_
	users_sports[user_sport_idx].fed_number_ = fed_number_
	users_sports[user_sport_idx].fed_name_ = fed_name_
	users_sports[user_sport_idx].type_ = type_
	users_sports[user_sport_idx].years_federated_ = years_federated_
	users_sports[user_sport_idx].is_absent_ = is_absent_
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

const getQuotasData = async () => {
	return quotas
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

const getMemberQuotasByIdData = async (id_) => {
	const member = await getMemberByIdData(id_)
	if (member)
		return quotas.filter(quota => quota.member_id_ == id_)
	return undefined
}

const postQuotaData = async (date_) => {
	let cnt = indexObj.idxQuotas
	members.forEach(member => {
		const year_quota = quotas.filter(quota => quota.member_id_ == member.id_ && quota.date_.split('-')[0] == date_.split('-')[0])[0]
		if (!year_quota) {
			if (member.quota_value_ != 0) {
				indexObj.idxQuotas++
				const quota = {
					id_: indexObj.idxQuotas,
					member_id_: member.id_,
					username_: member.username_,
					payment_date_: null,
					date_
				}
				quotas.push(quota)
			}
				
		}
	})
	return date_
}

const updateMemberQuotaData = async (qid_, payment_date_) => {
	let id
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

const getManagementQuotas = async() => {
	return member_types_
}

const updateManagementQuotaByType = async(type_, quota_value_) => {
	const member_type_idx = member_types_.findIndex(mt => mt.type_ == type_)
	member_types_[member_type_idx].quota_value_ = quota_value_
	return type_
}

const postManagementQuota = async(type_, quota_value_) => {
	const mt = {
		type_,
		quota_value_
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



const mock_data = { getMemberByIbanData, getCandidateByIbanData, getManagementQuotas,updateManagementQuotaByType, getManagementQuotaByType, postManagementQuota, getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCandidateByUsernameData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getEventMemberByIdAttendanceData, getSportsData, getSportByIdData, postSportData,updateSportData, deleteSportData, getUsersData, getUserByIdData, postUserData, updateUserData, deleteUserData, getUsersSportsData, getUsersSportData, getUserSportsByIdData, postUserSportData, updateUserSportData, deleteUserSportData, getQuotasData, getCompaniesQuotasData, getUsersQuotasData, getMemberQuotasByIdData, postQuotaData, updateMemberQuotaData, getMemberByIdData, getMemberByUsernameData, getQuotaByIdData, getEmails, updateUserQrCodeData, getMemberByCCData, getMemberByNifData, getMemberByEmailData, getCandidateByEmailData, getCandidateByCCData, getCandidateByNifData }

export default mock_data