'use strict'

import asyncHandler from 'express-async-handler'
import groupServices from '../services/groupServices.js'

const groupControllers = (data) => {
	const services = groupServices(data)

	const getGroups = asyncHandler(async (req, res) => {
        const groups = await services.getGroupsServices(req.query.name, req.query.group_type, req.query.types, req.query.offset, req.query.limit)
        res.json(groups)
	})

    const getGroupById = asyncHandler(async (req, res) => {
        const group = await services.getGroupByIdServices(req.params.id)
        if (group) res.json(group)
	})
    
    const postGroup = asyncHandler(async (req, res) => {
        const group = await services.postGroupServices(req.body.name, req.body.description, req.body.group_type, req.body.types, req.body.sports)
        if (group) {
            res.status(201)
            res.json(group)
        }
    })

    const deleteGroup = asyncHandler(async (req, res) => {
        const group = await services.deleteGroupServices(req.params.id)
        if (group) res.json({ message: 'Group deleted sucessfully', message_code: 'MESSAGE_CODE_39' })
	})

    const getMemberGroups = asyncHandler(async (req, res) => {
        const groups = await services.getMemberGroupsServices(req.params.id, req.query.name, req.query.group_type, req.query.types, req.query.offset, req.query.limit)
        res.json(groups)
	})

    const postMemberInGroup = asyncHandler(async (req, res) => {
        const member = await services.postMemberInGroupServices(req.params.id, req.body.user_id)
        if (member) res.json({ message: 'Member added sucessfully', message_code: 'MESSAGE_CODE_40' })
	})

    const deleteMemberInGroup = asyncHandler(async (req, res) => {
        const member = await services.deleteMemberInGroupServices(req.params.id, req.params.uid)
        if (member) res.json({ message: 'Member deleted sucessfully', message_code: 'MESSAGE_CODE_41' })
	})

    const getGroupByIdMembers = asyncHandler(async (req, res) => {
        const members = await services.getGroupByIdMembersServices(req.params.id, req.query.username, req.query.offset, req.query.limit)
        if (members) res.json(members)
	})

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

export default groupControllers