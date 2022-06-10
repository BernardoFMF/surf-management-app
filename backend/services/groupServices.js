'use strict'

import error from '../utils/error.js'
import groupData from '../data/groupData.js'

const groupServices = (db) => {
	const data = groupData(db)

    const getGroupsServices = async (name, group_type, offset, limit) => {
        if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
		
        return await data.getGroups(name, group_type, offset, limit)
	}

    const getGroupByIdServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		
        return await data.getGroupById(id)
	}

    const postGroupServices = async (name, description, group_type, types) => {
		if(!name) throw error(400, 'Parameter not found: name', 'MESSAGE_CODE_14')
        if(!description) throw error(400, 'Parameter not found: description', 'MESSAGE_CODE_14')
		if(!group_type) throw error(400, 'Parameter not found: group_type', 'MESSAGE_CODE_14')
		if(!types) throw error(400, 'Parameter not found: types', 'MESSAGE_CODE_14')

		return await data.postGroup(name, description, group_type, types)
	}

    const deleteGroupServices = async (id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		
        return await data.deleteGroup(id)
	}

    const getMemberGroupsServices = async (id, offset, limit) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
        
        return await data.getMemberGroups(id, offset, limit)
	}

    const postMemberInGroupServices = async (id, user_id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!user_id) throw error(400, 'Parameter not found: user_id', 'MESSAGE_CODE_14')
        
        return await data.postMemberInGroup(id, user_id)
	}

    const deleteMemberInGroupServices = async (id, user_id) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!user_id) throw error(400, 'Parameter not found: user_id', 'MESSAGE_CODE_14')
		
        return await data.deleteMemberInGroup(id, user_id)
	}

    const getGroupByIdMembersServices = async (id, offset, limit) => {
		if(!id) throw error(400, 'Parameter not found: id', 'MESSAGE_CODE_14')
		if(!offset) throw error(400, 'Parameter not found: offset', 'MESSAGE_CODE_14')
		if(!limit) throw error(400, 'Parameter not found: limit', 'MESSAGE_CODE_14')
        
        return await data.getGroupByIdMembers(id, offset, limit)
	}

	return {
		getGroupsServices,
        getGroupByIdServices,
        postGroupServices,
        deleteGroupServices,
        getMemberGroupsServices,
        postMemberInGroupServices,
        deleteMemberInGroupServices,
        getGroupByIdMembersServices
	}
}

export default groupServices