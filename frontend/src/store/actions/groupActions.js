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
    GROUPS_FETCH_FAIL,
    GROUP_FETCH_REQUEST,
    GROUP_FETCH_SUCCESS,
    GROUP_FETCH_FAIL,
    GROUP_MEMBERS_FETCH_REQUEST,
    GROUP_MEMBERS_FETCH_SUCCESS,
    GROUP_MEMBERS_FETCH_FAIL,
    GROUP_POST_REQUEST,
    GROUP_POST_SUCCESS,
    GROUP_POST_FAIL
  } from '../constants/groupConstants'

export const getMemberGroups = (id, name_filter, group_type_filter, types_filter, offset, limit) => async (dispatch) => {
    try {
        dispatch({
            type: MEMBER_GROUPS_FETCH_REQUEST,
        })
        const response = await fetch(`/api/groups/members/${id}?offset=${offset}&limit=${limit}${name_filter ? `&name=${name_filter}`:""}${group_type_filter ? `&group_type=${group_type_filter}`:""}${types_filter.length != 0 ? `&types=${types_filter = types_filter.join(',')}` : ""}`, {
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

export const getGroups = (name_filter, group_type_filter, types_filter, offset, limit) => async (dispatch) => {
    try {
        dispatch({
            type: GROUPS_FETCH_REQUEST,
        })
        const response = await fetch(`/api/groups?offset=${offset}&limit=${limit}${name_filter ? `&name=${name_filter}`:""}${group_type_filter ? `&group_type=${group_type_filter}`:""}${types_filter.length != 0 ? `&types=${types_filter = types_filter.join(',')}` : ""}`, {
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

export const getGroupById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GROUP_FETCH_REQUEST,
        })
        const response = await fetch(`/api/groups/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        let group = await response.json()
        if(response.status !== 200) throw Error(group.message_code)
        dispatch({
            type: GROUP_FETCH_SUCCESS,
            payload: group,
        })
    } catch (error) {
        dispatch({
            type: GROUP_FETCH_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getGroupByIdMembers = (id, username_filter, offset, limit) => async (dispatch) => {
    try {
        dispatch({
            type: GROUP_MEMBERS_FETCH_REQUEST,
        })
        console.log("pediu os membros");
        const response = await fetch(`/api/groups/${id}/members?offset=${offset}&limit=${limit}${username_filter ? `&username=${username_filter}`:""}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        let members = await response.json()
        if(response.status !== 200) throw Error(members.message_code)
        dispatch({
            type: GROUP_MEMBERS_FETCH_SUCCESS,
            payload: members,
        })
    } catch (error) {
        dispatch({
            type: GROUP_MEMBERS_FETCH_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const postGroup = (body) => async (dispatch) => {
    try {
      dispatch({
        type: GROUP_POST_REQUEST,
      })
  
      const response = await fetch(`/api/groups`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" }
      })
  
      const postResp = await response.json()
      if(response.status !== 201) throw Error(postResp.message_code)
      dispatch({
        type: GROUP_POST_SUCCESS,
        payload: postResp,
      })
    } catch (error) {
      dispatch({
        type: GROUP_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}