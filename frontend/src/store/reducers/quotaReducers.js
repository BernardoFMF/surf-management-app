import {
    QUOTAS_FETCH_SUCCESS,
    QUOTAS_FETCH_FAIL,
    QUOTAS_FETCH_REQUEST,
    QUOTA_UPDATE_SUCCESS,
    QUOTA_UPDATE_FAIL,
    QUOTA_UPDATE_REQUEST,
    MEMBER_QUOTAS_FETCH_SUCCESS,
    MEMBER_QUOTAS_FETCH_FAIL,
    MEMBER_QUOTAS_FETCH_REQUEST
} from '../constants/quotaConstants'

export const quotasFetchReducer = (state = {quotasGet: []}, action) => {
    switch (action.type) {
        case QUOTAS_FETCH_REQUEST:
        return { loading: true }
        case QUOTAS_FETCH_SUCCESS:
        return { loading: false, quotasGet: action.payload }
        case QUOTAS_FETCH_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const quotaUpdateReducer = (state = {quotaPut: {}}, action) => {
    switch (action.type) {
        case QUOTA_UPDATE_REQUEST:
        return { loading: true }
        case QUOTA_UPDATE_SUCCESS:
        return { loading: false, quotaPut: action.payload }
        case QUOTA_UPDATE_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const memberQuotasFetchReducer = (state = {memberQuotasGet: {}}, action) => {
    switch (action.type) {
        case MEMBER_QUOTAS_FETCH_REQUEST:
        return { loading: true }
        case MEMBER_QUOTAS_FETCH_SUCCESS:
        return { loading: false, memberQuotasGet: action.payload }
        case MEMBER_QUOTAS_FETCH_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}