import {
    MEMBER_GROUPS_FETCH_REQUEST,
    MEMBER_GROUPS_FETCH_SUCCESS,
    MEMBER_GROUPS_FETCH_FAIL,
    MEMBER_GROUP_DELETE_REQUEST,
    MEMBER_GROUP_DELETE_SUCCESS,
    MEMBER_GROUP_DELETE_FAIL,
    GROUP_DELETE_REQUEST,
    GROUP_DELETE_SUCCESS,
    GROUP_DELETE_FAIL,
    GROUPS_FETCH_REQUEST,
    GROUPS_FETCH_SUCCESS,
    GROUPS_FETCH_FAIL
  } from '../constants/groupConstants'

export const getMemberGroups = (id, name_filter, type_filter, offset, limit) => async (dispatch) => {
    try {
        dispatch({
            type: MEMBER_GROUPS_FETCH_REQUEST,
        })
        const response = await fetch(`/api/groups/members/${id}?offset=${offset}&limit=${limit}${name_filter ? `&name=${name_filter}`:""}${type_filter ? `&type=${type_filter}`:""}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        let groups = await response.json()
        if(response.status !== 200) throw Error(groups.message_code)
        dispatch({
            type: MEMBER_GROUPS_FETCH_SUCCESS,
            payload: groups,
        })
    } catch (error) {
        dispatch({
            type: MEMBER_GROUPS_FETCH_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteGroupMember = (id, gid) => async (dispatch) => {
    try {
        dispatch({
            type: MEMBER_GROUP_DELETE_REQUEST,
        })
        const response = await fetch(`/api/groups/${gid}/members/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        let group = await response.json()
        if(response.status !== 200) throw Error(group.message_code)
        dispatch({
            type: MEMBER_GROUP_DELETE_SUCCESS,
            payload: group,
        })
    } catch (error) {
        dispatch({
            type: MEMBER_GROUP_DELETE_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const deleteGroup = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GROUP_DELETE_REQUEST,
        })
        const response = await fetch(`/api/groups/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        let group = await response.json()
        if(response.status !== 200) throw Error(group.message_code)
        dispatch({
            type: GROUP_DELETE_SUCCESS,
            payload: group,
        })
    } catch (error) {
        dispatch({
            type: GROUP_DELETE_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getGroups = (name_filter, type_filter, offset, limit) => async (dispatch) => {
    try {
        dispatch({
            type: GROUPS_FETCH_REQUEST,
        })
        const response = await fetch(`/api/groups?offset=${offset}&limit=${limit}${name_filter ? `&name=${name_filter}`:""}${type_filter ? `&type=${type_filter}`:""}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        let groups = await response.json()
        if(response.status !== 200) throw Error(groups.message_code)
        dispatch({
            type: GROUPS_FETCH_SUCCESS,
            payload: groups,
        })
    } catch (error) {
        dispatch({
            type: GROUPS_FETCH_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}