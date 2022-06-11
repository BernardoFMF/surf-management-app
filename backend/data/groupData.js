'use strict'

import error from '../utils/error.js'

const groupData = (db) => {
	const getGroups = async (name_, group_type_, offset_, limit_) => {
		return await db.getGroupsData(name_, group_type_, offset_, limit_)
	}

    const getGroupById = async (id_) => {
        const group = await db.getGroupByIdData(id_)
        if (!group) throw error(404, 'Group does not exist', 'MESSAGE_CODE_42')
        return group
    }

    const postGroup = async (name_, description_, group_type_, types_, sports_) => {
        const group = await db.getGroupByNameData(name_)
        if (group) throw error(409, 'Group with that name already exists', 'MESSAGE_CODE_43')
        const groupId = await db.postGroupData(name_, description_, group_type_, types_, sports_)
        return groupId
    }

    const deleteGroup = async (id_) => {
        await getGroupById(id_)
        return await db.deleteGroupData(id_)
    }

    const getMemberGroups = async (id_, offset_, limit_) => {
        const member = db.getMemberByIdData(id_)
        if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_24')
        return await db.getMemberGroupsData(id_, offset_, limit_)
    }

    const postMemberInGroup = async (id_, user_id_) => {
        const member = db.getMemberByIdData(user_id_)
        if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_24')
        await getGroupById(id_)
        return await db.postMemberInGroupData(id_, user_id_)
    }

    const deleteMemberInGroup = async (id_, user_id_) => {
        const member = db.getMemberByIdData(user_id_)
        if (!member) throw error(404, 'Member does not exist', 'MESSAGE_CODE_24')
        await getGroupById(id_)
        return await db.deleteMemberInGroupData(id_, user_id_)
    }

    const getGroupByIdMembers = async (id_, offset_, limit_) => {
        await getGroupById(id_)
        return await db.getGroupByIdMembersData(id_, offset_, limit_)
    }

    return { 
        getGroups,
        getGroupById,
        postGroup,
        deleteGroup,
        getMemberGroups,
        postMemberInGroup,
        deleteMemberInGroup,
        getGroupByIdMembers
	}
}

export default groupData