'use strict'

import error from '../utils/error.js'

const memberData = (db) => {
	const getMemberById = async (id_) => {
		const member = await db.getMemberByIdData(id_)
		if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_12')
		if (member.category_ === 'user') {
			const user = await db.getUserByIdData(id_)
			user.category_ = member.category_
			user.quota_value_ = member.quota_value_
			return user
		} else {
			const company = await db.getCompanyByIdData(id_)
			company.is_admin_ = false
			company.category_ = member.category_
			company.quota_value_ = member.quota_value_
			return company
		}
	}

	const getAllMembers = async () => {
		const members = await db.getAllMembersData()
		if (!members) throw error(404, 'Member does not exist', 'MESSAGE_CODE_12')
		return members
	}

    return { 
        getMemberById,
		getAllMembers
	}
}

export default memberData