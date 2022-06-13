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

export const memberGroupsFetchReducer = (state = {memberGroupsGet: {groups: [], number_of_groups: 0}}, action) => {
    switch (action.type) {
        case MEMBER_GROUPS_FETCH_REQUEST:
            return { loading: true }
        case MEMBER_GROUPS_FETCH_SUCCESS:
            return { loading: false, memberGroupsGet: action.payload }
        case MEMBER_GROUPS_FETCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const memberGroupDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MEMBER_GROUP_DELETE_REQUEST:
            return { loading: true }
        case MEMBER_GROUP_DELETE_SUCCESS:
            return { loading: false, memberGroupDelete: action.payload }
        case MEMBER_GROUP_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const groupsFetchReducer = (state = {groupsGet: {groups: [], number_of_groups: 0}}, action) => {
    switch (action.type) {
        case GROUPS_FETCH_REQUEST:
            return { loading: true }
        case GROUPS_FETCH_SUCCESS:
            return { loading: false, groupsGet: action.payload }
        case GROUPS_FETCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const groupDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case GROUP_DELETE_REQUEST:
            return { loading: true }
        case GROUP_DELETE_SUCCESS:
            return { loading: false, groupDelete: action.payload }
        case GROUP_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
