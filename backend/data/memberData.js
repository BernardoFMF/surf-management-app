'use strict'

import error from '../utils/error.js'

const memberData = (db) => {
	const getMemberById = async (id_) => {
		const member = await db.getMemberByIdData(id_)
		if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_12')
		if (member.member_type_ !== 'corporate') {
			return await db.getUserByIdData(id_)
		} else {
			return await db.getCompanyByIdData(id_)
		}
	}

    return { 
        getMemberById
	}
}

export default memberData