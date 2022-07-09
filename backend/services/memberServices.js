'use strict'

import error from '../utils/error.js'
import memberData from '../data/memberData.js'

const memberServices = (db) => {
	const data = memberData(db)

    const getMemberByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		return await data.getMemberById(id)
	}

	const getAllMembersServices = async () => {
		return await data.getAllMembers()
	}

	return {
		getMemberByIdServices,
		getAllMembersServices
	}
}

export default memberServices