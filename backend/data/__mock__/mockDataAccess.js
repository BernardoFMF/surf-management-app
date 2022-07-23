'use strict'

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
	username_: 'afonsoribeiro',
	is_deleted_: false,
	iban_: "PT50111111111111111111111"
}]

let users = [{
	member_id_: indexObj.idxMember, 
	cc_: 987654321,
	nif_: 123456789,
	birth_date_: '01-01-1970',
	nationality_: 'Portuguese',
	full_name_: 'Joel Joelho',
	enrollment_date_: '01-01-1970',
	paid_enrollment_: true,
	is_admin_: true,
	gender_: 'Male'
}]

let companies = []
let candidates = []
let events = []
let attendances = []
let sports = []
let contacts = [{
	member_id_: indexObj.idxMember, 
	location_: 'Ericeira',
	address_: 'Rua do surf, n543',
	postal_code_:'1890-987',
	email_:'miguelosousa@gmail.com',
	phone_number_:'912345432'
}]

let user_imgs = [
	{
		user_id_ : indexObj.idxMember,
		img_: null,
	}
]
let users_sports = []
let membership_cards = [
	{
		user_id_ : indexObj.idxMember,
		qrcode_: "qrcodeteste",
		pin_: "abD2"
	}
]
let quotas = []
let member_types_ = [{
	type_: 'effective',
	quota_value_: 15,
	category_: 'user'
},
{
	type_: 'founder',
	quota_value_: 0,
	category_: 'user'
},
{
	type_: 'merit',
	quota_value_: 0,
	category_: 'user'
},
{
	type_: 'corporate',
	quota_value_: 15,
	category_: 'company'
}]
let groups = []
let groups_events = []
let groups_members = []
let groups_members_types = []
let groups_sports = []
let user_sport_types = {'coach': 'coach', 'practitioner': 'practitioner', 'apprentice': 'apprentice', 'jury' : 'jury'}
let member_tokens = []

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [day, month, year].join('-');
}

/**
 * Candidates
 */


const getCandidatesData = (username_filter, name_filter, email_filter, offset, limit) => {
	const filteredCandidates = candidates.filter(candidate => {
		let results = []
		if (username_filter) {
			if (candidate.username_.includes(username_filter)) 
				results.push(true)
			else 
				results.push(false)
		}
		
		if (name_filter) {
			if (candidate.full_name_.includes(name_filter)) 
				results.push(true)
			else 
				results.push(false)
		}

		if (email_filter) {
			if (candidate.email_ === email_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		
		if (results.every(elem => elem === true)) return true
		else return false
	})

	const obj = {
		candidates: filteredCandidates.slice(offset, limit + offset).map(candidate => {
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
		number_of_candidates: filteredCandidates.length
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

const approveCandidateData = async (id_, type_, paid_enrollment_) => {
	const candidate = await getCandidateByIdData(id_)
	let enrollment_date_ = formatDate(new Date())
	const uid_ = await postUserData(candidate.cc_, candidate.nif_, type_, candidate.birth_date_, candidate.nationality_, candidate.full_name_, candidate.phone_number_, candidate.email_, candidate.postal_code_, candidate.address_, candidate.location_, candidate.pword_, candidate.username_, paid_enrollment_, candidate.gender_, candidate.iban_, candidate.img_, enrollment_date_)

	user_imgs = user_imgs.map(elem => {
		if (elem.user_id_ == uid_) {
			const img = {
				user_id_: uid_,
				img_:candidate.img_
			}
			return img
		}
		return elem
	})

	candidates = candidates.filter(candidate => candidate.id_ != id_)

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

const getCompaniesData = async (username_filter,name_filter,email_filter, debt_filter,offset,limit) => {
	const filteredCompanies = companies.filter(company => {
		let results = []
		const member = members.filter(member => member.id_ == company.member_id_)[0]
		const contact = contacts.filter(contact => contact.member_id_ == company.member_id_)[0]

		if (username_filter) {
			if (member.username_ == username_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (name_filter) {
			if (company.name_ ==  name_filter) 
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

		if (debt_filter) {
			if (member.has_debt_ === (debt_filter == 'true')) 
				results.push(true)
			else 
				results.push(false)
		}
		
		if (results.length == 0 || results.every(elem => elem === true)) return true
		else return false
	})
	const obj = {
		companies: filteredCompanies.slice(offset, limit + offset).map(company => {
			const member = members.filter(member => member.id_ == company.member_id_)[0]
			const contact = contacts.filter(contact => contact.member_id_ == company.member_id_)[0]
			let obj = {
				...company,
				username_: member.username_,
				has_debt_: member.has_debt_,
				member_type_: member.member_type_,
				is_deleted_: member.is_deleted_,
				email_: contact.email_,
				iban_: member.iban_
			}
			return obj
		}),
		number_of_companies: filteredCompanies.length
	}
	return obj
}

const getCompanyByIdData = async (id_) => {
	const company = companies.filter(company => company.member_id_ == id_)[0]
	const contact = contacts.filter(contact => contact.member_id_ == id_)[0]
	if (company) {
		const member = members.filter(member => member.id_ == id_)[0]
		const img = user_imgs.filter(user => user.user_id_ == id_)[0]
		const member_type = member_types_.filter(type => type.type_ == member.member_type_)[0]
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
				is_deleted_: member.is_deleted_,
				img_value_: img.img_,
				category: member_type.category_
			}
			return ret
		}
	}
	return undefined
}

const postCompanyData = async (name_, nif_, phone_number_, email_, postal_code_, address_, location_, username_, pword_, type_, img_, iban_) => {
	indexObj.idxMember++
	const quota_value_ = member_types_.filter(elem => elem.type_ == type_)[0].quota_value_
	const member = {
		id_: indexObj.idxMember,
		member_type_: type_,
		has_debt_: true,
		quota_value_,
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

	const date = new Date()
    const curr_date = formatDate(`${date.getFullYear()}-01-01`)
    let dates = [... new Set(quotas.filter(elem => elem.date >= curr_date))]

    const value = member_types_.filter(elem => elem.type_ == type_)[0].quota_value_
    if (dates) {
        dates.forEach(elem => {
            indexObj.idxQuotas++
            const quota = {
                id_: indexObj.idxQuotas,
                memberid: member.id_,
                paymentdate: null,
                date: elem,
                amount : value
            }
            quotas.push(quota)
        })
    }

	const company_img_ = {
		user_id_ : indexObj.idxMember,
		img_,
	}
	user_imgs.push(company_img_)

	groups.forEach(group => {
		if (group.group_type_ == 'member_type') {
			groups_members_types.filter(groups_types => groups_types.group_id_ == group.group_id_).forEach(elem => {
				if (elem.member_type_ == type_)
					groups_members.push({group_id_: group.group_id_, member_id_: indexObj.idxMember})
			})
		}
	})

	members.push(member)
	companies.push(company)
	contacts.push(contact)
    
	return company.member_id_
}

const updateCompanyData = async (cid_, nif_, type_, name_, phone_number_, postal_code_, address_, location_, img_, is_deleted_, iban_) => {
	const idxMember = members.findIndex((member => member.id_ == cid_))
	const oldDeleted = members[idxMember].is_deleted_
	const oldType = members[idxMember].member_type_
	members[idxMember].iban_ = iban_
	members[idxMember].member_type_ = type_
	members[idxMember].is_deleted_ = is_deleted_
	const idxCompany = companies.findIndex((company => company.member_id_ == cid_))
	companies[idxCompany].name_ = name_
	companies[idxCompany].nif_ = nif_
	const idxContact = contacts.findIndex((contact => contact.member_id_ == cid_))
	contacts[idxContact].phone_number_ = phone_number_
	contacts[idxContact].postal_code_ = postal_code_
	contacts[idxContact].address_ = address_
	contacts[idxContact].location_ = location_

	if ((oldDeleted == true && is_deleted_ == false) || oldType != type_) {
		const groupsToRemove = groups_members.filter(group_member => group_member.member_id_ == cid_ && groups.filter(group => group.group_type_ == 'member_type' && group.group_id_ == group_member.group_id_)[0]).map(elem => elem.group_id_)
		groups_members = groups_members.filter(group_member => groupsToRemove.includes(group_member.group_id_))
		groups.forEach(group => {
			if (group.group_type_ == 'member_type') {
				groups_members_types.filter(groups_types => groups_types.group_id_ == group.group_id_).forEach(elem => {
					if (elem.member_type_ == type_)
						groups_members.push({group_id_: group.group_id_, member_id_: indexObj.idxMember})
				})
			}
		})
	}

	user_imgs = user_imgs.map(elem => {
		if (elem.user_id_ == cid_) {
			const img = {
				user_id_: cid_,
				img_: img_
			}
			return img
		}
		return elem
	})

	return companies[idxCompany].member_id_
}

const deleteCompanyData = async (id_) => {
	const idxCompany = members.findIndex(m => m.id_ == id_)
	members[idxCompany].is_deleted_ = true
	groups_members = groups_members.filter(group_member => group_member.member_id_ != id_)
	return id_
}

/**
 * Event
 */

const getEventsData = async (name_filter,initialDate_filter,endDate_filter,offset,limit) => {
	let date_today = formatDate(new Date())
	initialDate_filter = initialDate_filter ? formatDate(initialDate_filter) : undefined
	endDate_filter = endDate_filter ? formatDate(endDate_filter) : undefined

	let filteredEvents = events.filter(event => {
		let results = []
		if (name_filter) {
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

		if (results.length == 0 || results.every(elem => elem === true)) return true
		else return false
	})
	let test2 = filteredEvents.slice(offset, offset + limit)
	let test = test2.map(event => {
		event.initial_date_ = formatDate(event.initial_date_)
		event.final_date_ = formatDate(event.final_date_)
		if(date_today < event.initial_date_ && date_today < event.final_date_){
			let x = {
				...event, status: "status_not_started"
			}
			return x
		}else{
			if(date_today > event.initial_date_ && date_today > event.final_date_){
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
		events: test,
		number_of_events: test.length
	}
	return obj
}

const getEventByIdData = async (id_) => {
	let id = parseInt(id_)
	const event = events.filter(event => event.id_ == id)[0]
	if (!event) return null

	let date_today = formatDate(new Date())
	event.initial_date_ = formatDate(event.initial_date_)
	event.final_date_ = formatDate(event.final_date_)
	if(date_today < event.initial_date_ && date_today < event.final_date_){
		let x = {
			...event, status: "status_not_started"
		}
		return x
	}else{
		if(date_today > event.initial_date_ && date_today > event.final_date_){
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
	groups_.forEach(group_id_ => {
		groups_events.push({event_id_:indexObj.idxEvents, group_id_})
		groups_members.forEach(elem => {
			if (elem.group_id_ == group_id_) 
				attendances.push({member_id_: elem.member_id_, event_id_ : indexObj.idxEvents, state_: null})
		})
	})
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
	groups_events = groups_events.filter(g => g.id_ != id_)
	events = events.filter(event => event.id_ != id_)
	attendances = attendances.filter(att => att.event_id_ != id_)
	return id_
}

const updateMemberAttendanceData = async (eid_, id_, state_) => {
	const idx = attendances.findIndex(att => att.member_id_ == id_ && att.event_id_ == eid_)
	attendances[idx].state_ = state_
	return {id_, eid_}
}

const getEventByIdAttendanceData = async (eid_, offset, limit) => {
	let attendance = []
	for (const idx in attendances) {
		if(attendances[idx].event_id_ == eid_) {
			const member = await getMemberByIdData(attendances[idx].member_id_)
			const idxContact = contacts.findIndex((contact => contact.member_id_ == attendances[idx].member_id_))
	
			if (member) {
				const event = await getEventByIdData(eid_)
				const obj = {
					member_id_:attendances[idx].member_id_,
					username_:member.username_,
					event_id_: event.id_,
					name_: event.name_,
					state_: `${attendances[idx].state_}`,
					email_: contacts[idxContact].email_,
					phone_number_: `${contacts[idxContact].phone_number_}`
				}
				attendance.push(obj)
			}
		}
	}
	attendance = attendance.slice(offset, offset + limit)
	return {attendance,number_of_attendance:attendance.length}
}

const getEventMemberByIdAttendanceData = async (id_,name_filter,state_filter,date_filter,offset,limit) => {
	const attendance = attendances
		.filter(att => att.member_id_ == id_)
		.filter(att => {
			let event = events.filter(event => event.id_ == att.event_id_)[0]

			let results = []
			if (name_filter) {
				if (event.name_.includes(name_filter)) 
					results.push(true)
				else 
					results.push(false)
			}
			if (state_filter) {
				if (att.state_ === state_filter) 
					results.push(true)
				else 
					results.push(false)
			}
			if (date_filter) {
				if (event.initial_date_ == date_filter) 
					results.push(true)
				else 
					results.push(false)
			}

			if (results.every(elem => elem === true)) return true
			else return false
		})
	let number_of_events = attendance.length
	return {events:attendance.slice(offset, offset + limit),number_of_events}
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
	let member = members.filter(member => member.id_ == id_)[0]
	const member_type_idx = member_types_.findIndex(mt => mt.type_ == member.member_type_)
	member.category_ = member_types_[member_type_idx].category_
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
	let usersArray = users.filter(elem => !elem.is_admin_)
	usersArray = usersArray.filter(user => {
		const member = members.filter(member => member.id_ == user.member_id_)[0]
		const contact = contacts.filter(con => con.member_id_ == user.member_id_)[0]
		let results = []
		if (name_filter) {
			if (user.full_name_ === name_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (username_filter) {
			if (member.username_ === username_filter) 
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
		if (results.length == 0 || results.every(elem => elem === true)) return true
		else return false
	})
	return {users: usersArray.slice(offset, limit + offset), number_of_users: usersArray.length}
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
	const quota_value_ = member_types_.filter(elem => elem.type_ == type_)[0].quota_value_
	const member = {
		id_: indexObj.idxMember,
		member_type_: type_,
		has_debt_: true,
		pword_,
		username_,
		quota_value_,
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

	const user_img_ = {
		user_id_ : indexObj.idxMember,
		img_,
	}
	user_imgs.push(user_img_)

	groups.forEach(group => {
		if (group.group_type_ == 'member_type') {
			groups_members_types.filter(groups_types => groups_types.group_id_ == group.group_id_).forEach(elem => {
				if (elem.member_type_ == type_)
					groups_members.push({group_id_: group.group_id_, member_id_: indexObj.idxMember})
			})
		}
	})

	members.push(member)
	users.push(user)
	contacts.push(contact)
    
	return user.member_id_
}

const updateUserQrCodeData = async (id_, qrcode_, pin_) => {
	const membership_card = {
		user_id_ : id_,
		qrcode_,
		pin_
	}
	membership_cards.push(membership_card)
}

const updateUserData = async (id_, cc_, nif_, type_, birth_date_, nationality_, full_name_, phone_number_, postal_code_, address_, location_, img_, paid_enrollment_, is_admin_, is_deleted_, gender_, iban_) => {
	const idxMember = members.findIndex(member => member.id_ == id_)
	const oldDeleted = members[idxMember].is_deleted_
	const oldType = members[idxMember].member_type_
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

	if ((oldDeleted == true && is_deleted_ == false) || oldType != type_) {
		const groupsToRemove = groups_members.filter(group_member => group_member.member_id_ == cid_ && groups.filter(group => group.group_type_ == 'member_type' && group.group_id_ == group_member.group_id_)[0]).map(elem => elem.group_id_)
		groups_members = groups_members.filter(group_member => groupsToRemove.includes(group_member.group_id_))
		groups.forEach(group => {
			if (group.group_type_ == 'member_type') {
				groups_members_types.filter(groups_types => groups_types.group_id_ == group.group_id_).forEach(elem => {
					if (elem.member_type_ == type_)
						groups_members.push({group_id_: group.group_id_, member_id_: indexObj.idxMember})
				})
			}
		})
	}

	if (img_) {
		const user_img_ = {
			user_id_ : id_,
			img_,
		}
		user_imgs.push(user_img_)
	}

	user_imgs = user_imgs.map(elem => {
		if (elem.user_id_ == id_) {
			const img = {
				user_id_: id_,
				img_: img_
			}
			return img
		}
		return elem
	})


	return users[idxUser].member_id_
} 

const deleteUserData = async (id_) => {
	const idxUser = members.findIndex(m => m.id_ == id_)
	members[idxUser].is_deleted_ = true
	groups_members = groups_members.filter(group_member => group_member.member_id_ != id_)
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

const getUsersSportData = async (id_, offset, limit, is_candidate_, username_) => {
	let sports_tuples = await getUsersSportsData()
	let sport = await getSportByIdData(id_)
	let users = sports_tuples.filter(sport => sport.sport_id_ == id_)
	users = users.filter(user => {
		let results = []
		if (is_candidate_) {
			if (user.is_candidate_ == is_candidate_) 
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
	return {users,number_of_users:users.length,sport}
}

const getUserSportsByIdData = async (id_,offset, limit) => {
	let sports_tuples = await getUsersSportsData()
	let sports = sports_tuples.filter(user => user.user_id_ == id_).slice(offset, limit + offset)
	return {sports,number_of_sports:sports.length}
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

	if (is_candidate_ == false) {
		type_.forEach(t => {
			let sportGroups = groups_sports.filter(group => group.sport_id_ == sid_)
			sportGroups.forEach(group => {
				if (group.sport_member_type_ == t && !groups_members.filter(member => member.group_id_ == group.group_id_ && member.member_id_ == id_)[0]) {
					groups_members.push({group_id_: group.group_id_, member_id_: id_})
				}
			})
		})
	}
	return {id_: user_sport.user_id_, sid_: user_sport.sport_id_}
} 

const updateUserSportData = async (id_, sid_, fed_id_, fed_number_, fed_name_, type_, years_federated_, is_absent_, is_candidate_) => {
	const user_sport_idx = users_sports.findIndex(user_sport => user_sport.user_id_ == id_ && user_sport.sport_id_ == sid_)
	const oldIsAbsent = users_sports[user_sport_idx].is_absent_
	const oldIsCandidate = users_sports[user_sport_idx].is_candidate_
	users_sports[user_sport_idx].fed_id_ = fed_id_
	users_sports[user_sport_idx].fed_number_ = fed_number_
	users_sports[user_sport_idx].fed_name_ = fed_name_
	users_sports[user_sport_idx].type_ = type_
	users_sports[user_sport_idx].years_federated_ = years_federated_
	users_sports[user_sport_idx].is_absent_ = is_absent_
	users_sports[user_sport_idx].is_candidate_ = is_candidate_

	const memberGroups = groups_members.filter(group_member => group_member.member_id_ == id_).map(group => group.group_id_)

	const sportGroups = groups_sports.filter(group => group.sport_id_ == sid_)

	const groupsToRemove = sportGroups.filter(group => memberGroups.includes(group.group_id_)).map(group => group.group_id_)

	groups_members = groups_members.filter(member => member.member_id_ == id_ && groupsToRemove.includes(member.group_id_))

	if (((oldIsCandidate = true && is_candidate_ == false) || (oldIsCandidate = false && is_candidate_ == false)) && ((oldIsAbsent == false && is_absent_ == false) || (oldIsAbsent == true && is_absent_ == false))) {
		type_.forEach(t => {
			let sportGroups = groups_sports.filter(group => group.sport_id_ == sid_)
			sportGroups.forEach(group => {
				if (group.sport_member_type_ == t && !groups_members.filter(member => member.group_id_ == group.group_id_ && member.member_id_ == id_)[0]) {
					groups_members.push({group_id_: group.group_id_, member_id_: id_})
				}
			})
		})
	}

	return {id_: `${users_sports[user_sport_idx].user_id_}`, sid_: `${users_sports[user_sport_idx].sport_id_}`}
}

const deleteUserSportData = async (id_, sid_) => {
	const memberGroups = groups_members.filter(group_member => group_member.member_id_ == id_).map(group => group.group_id_)

	const sportGroups = groups_sports.filter(group => group.sport_id_ == sid_)

	const groupsToRemove = sportGroups.filter(group => memberGroups.includes(group.group_id_)).map(group => group.group_id_)

	groups_members = groups_members.filter(member => member.member_id_ == id_ && groupsToRemove.includes(member.group_id_))

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
	//date_filter = formatDate(date_filter)
	quotas.forEach(async (element) => {
		const contact = contacts.filter(elem => elem.member_id_ == element.member_id_)[0]
		let results = []
		if (username_filter) {
			if (element.username_ == username_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (date_filter) {
			if (element.date_ == date_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		if (email_filter) {
			if (contact && contact.email_ === email_filter) 
				results.push(true)
			else 
				results.push(false)
		}
		
		if (results.length == 0 || results.every(elem => elem === true)) 
			quotasArray.push({...element})
	})
	return {quotas: quotasArray.slice(offset, limit + offset), number_of_quotas: quotasArray.length}
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
		return {quotas: quotas.filter(quota => quota.member_id_ == id_).slice(offset, limit+offset) ,number_of_quotas:quotas.filter(quota => quota.member_id_ == id_).length}
	return undefined
}

const postQuotaData = async (date_) => {
	date_ = formatDate(date_)
	let ids = []
	members.forEach(member => {
		const hasQuota = quotas.filter(quota => quota.member_id_ == member.id_ && quota.date_ == date_)[0]
		const value = member_types_.filter(elem => elem.type_ == member.member_type_)[0].quota_value_
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
				ids.push(member.id_)
				quotas.push(quota)
			}
		}
	})
	members = members.map(member => {
		if (ids.includes(member.id_)) {
			return {...member, has_debt_: true}
		}
		return member
	})
	return date_

}

const updateMemberQuotaData = async (qid_, payment_date_) => {
	let id
	let member_id
	payment_date_ = formatDate(payment_date_)
	quotas = quotas.map(quota => {
		if (quota.id_ == qid_) {
			id = quota.id_
			member_id = quota.member_id_
			quota.payment_date_ = payment_date_
		}
		return quota
	})
	let member_quotas = quotas.filter(quota => quota.member_id_ == member_id && quota.payment_date_ == null)
	if (member_quotas.length == 0) {
		members = members.map(member => {
			if (member.id_ == member_id) {
				return {...member, has_debt_: false}
			}
			return member
		})
	}
	return id
}

const getQuotaByIdData = async (qid_) => {
	const quota = quotas.filter(quota => quota.id_ == qid_)[0]
	return quota
}

const deleteQuotaData = async (date_) => {
	let array = quotas.filter(quota =>quota.date_ == date_ && quota.payment_date_ != null)
	quotas = quotas.filter(quota =>quota.date_ != date_)
	array.forEach(elem => quotas.push(elem))
	return date_
}

const getManagementQuotas = async(category_) => {
	return member_types_.filter(elem => category_ ? elem.category_ == category_ : true)
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
	groupsFiltered = groupsFiltered
		.filter(elem => name_filter ? elem.name_ == name_filter : true )
	groupsFiltered = groupsFiltered
		.filter(elem => {
			if(types_filter.length == 0) return true
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

	return {groups: groupsFiltered.slice(offset, limit + offset), number_of_groups: groupsFiltered.length}
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
				.filter(member => member.member_type_ == elem)
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
	return indexObj.idxGroups
}

const deleteGroupData = async (id_) => {
	groups_events = groups_events.filter(group => group.group_id_ != id_)
	groups_members = groups_members.filter(group => group.group_id_ != id_)
	groups_sports = groups_sports.filter(group => group.group_id_ != id_)
	groups_members_types = groups_members_types.filter(group => group.group_id_ != id_)
	groups = groups_members_types.filter(group => group.group_id_ != id_)
	return id_
}

const getMemberGroupsData = async (id_, name_filter, group_type_filter, types_filter, offset, limit) => {
	let groupsFiltered = groups_members
		.filter(elem => elem.member_id_ == id_)
		.map(elem => {
			const group = groups.filter(g => g.group_id_ == elem.group_id_)[0]
			return group
		})
	groupsFiltered = groupsFiltered
		.filter(elem => group_type_filter ? elem.group_type_ == group_type_filter : true )
		.filter(elem => name_filter ? elem.name_ == name_filter : true )
		.filter(elem => {
			if(types_filter.length==0) return true
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
	return  {groups:groupsFiltered.slice(offset, limit + offset), number_of_groups: groupsFiltered.slice(offset, limit + offset).length}
}

const getGroupByIdMembersData = async (id_, username_filter_, offset, limit) => {
	let m = groups_members
		.filter(elem => elem.group_id_ == id_)
	m = m.map(elem => {
			const member = members.filter(member => member.id_ == elem.member_id_)[0]
			return {id_ : member.id_, username_: member.username_, member_type_: member.member_type_}
		})
	if(username_filter_) {
		m = m.filter(elem => elem.username_ == username_filter_)
	}
	return { members: m.slice(offset, limit + offset), number_of_members: m.length }		
}

const getUserSportTypesData = async () => {
	return user_sport_types
}

const getEmailByGroupIdData = async (groups) => {
	const members = groups_members.filter(elem => groups.includes(elem.group_id_)).map(elem => elem.group_id_)
	let ids = [... new Set(members)]
	const emails = [... new Set(contacts.filter(elem => ids.includes(elem.member_id_)).map(elem => elem.email_))]
	return emails
}

const postNewTokenData = async(user_id_, hash) => {
	const token = {
		member_id_: user_id_,
		token_: hash,
		created_at_: new Date()
	}
	member_tokens.push(token)
	return user_id_
}

const postNewCredentialsTokenData = async (id, hash) => {
	const token = {
		member_id_: id,
		token_: hash,
		created_at_: null
	}
	member_tokens.push(token)
	return id
}

const getMemberTokenByIdData = async(id_) => {
	return member_tokens.filter(token => token.member_id_ == id_)[0]
}

const deleteMemberTokenData = async(id_) => {
	member_tokens = member_tokens.filter(token => token.member_id_ != id_)
	return id_
}

const updateMemberTokenData = async(id_, new_token) => {
	const token = {
		member_id_: id_,
		token_: new_token,
		created_at_: new Date()
	}
	member_tokens = member_tokens.filter(token => token.member_id_ != id_)
	member_tokens.push(token)
	return id_
}

const changePassword = async (id, hash) => {
	members = members.map(member => {
		if (member.id_ == id) {
			member.pword_ = hash
		}
		return member
	})
	return id
}

const changeCredentials = async (id, username, hash) => {
	members = members.map(member => {
		if (member.id_ == id) {
			member.pword_ = hash
			member.username_ = username
		}
		return member
	})
	return id
}

const getAllMembersData = async () => {
	const all_members = members.map(member => {
		const contact = contacts.filter(c => c.member_id_ == member.id_)[0]
		let m = {
			id_: member.id_,
			member_type_: member.member_type_,
			email_: contact.email_,
			phone_number_: contact.phone_number_,
			iban_: member.iban_
		}
		return m
	})
	return all_members
}

const getUserEmailByIdData = async (id_) => {
	const contact = contacts.filter(c => c.member_id_ == id_)[0]
	return contact
}

const getMemberValidationData = async(id_) => {
	const member = members.filter(member => member.id_ == id_)[0]
	const user = users.filter(user => user.member_id_ == id_)[0]
	const image = user_imgs.filter(user => user.member_id_ == id_)[0]
	const card = membership_cards.filter(user => user.user_id_ == id_)[0]
	let validation_data = {
		has_debt_: member.has_debt_,
		full_name_: user.full_name_,
		img_value_: image.img_,
		pin_: card.pin_
	}
	return validation_data
}

const mock_data = { 
	postNewTokenData,
	getMemberValidationData,
	getUserEmailByIdData,
	getAllMembersData,
	changePassword,
	changeCredentials,
	updateMemberTokenData,
	deleteMemberTokenData,
	getMemberTokenByIdData,
	postNewCredentialsTokenData,
	getUserSportTypesData,
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
	deleteQuotaData,
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
	getCandidateByNifData,
	getEmailByGroupIdData 
}

export default mock_data
