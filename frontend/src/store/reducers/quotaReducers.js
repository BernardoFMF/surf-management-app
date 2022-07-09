import {
    QUOTAS_FETCH_SUCCESS,
    QUOTAS_FETCH_FAIL,
    QUOTAS_FETCH_REQUEST,
    QUOTA_UPDATE_SUCCESS,
    QUOTA_UPDATE_FAIL,
    QUOTA_UPDATE_REQUEST,
    QUOTA_CREATE_SUCCESS,
    QUOTA_CREATE_FAIL,
    QUOTA_CREATE_REQUEST,
    MEMBER_QUOTAS_FETCH_SUCCESS,
    MEMBER_QUOTAS_FETCH_FAIL,
    MEMBER_QUOTAS_FETCH_REQUEST,
    QUOTAS_FETCH_RESET,
    QUOTA_UPDATE_RESET,
    QUOTA_CREATE_RESET,
    QUOTA_DELETE_SUCCESS,
    QUOTA_DELETE_FAIL,
    QUOTA_DELETE_REQUEST,
    QUOTA_DELETE_RESET,

} from '../constants/quotaConstants'

export const quotasFetchReducer = (state = {quotasGet: {quotas:[],number_of_quotas:0}}, action) => {
    switch (action.type) {
        case QUOTAS_FETCH_REQUEST:
            return { loading: true }
        case QUOTAS_FETCH_SUCCESS:
            return { loading: false, quotasGet: action.payload }
        case QUOTAS_FETCH_FAIL:
            return { loading: false, error: action.payload }
        case QUOTAS_FETCH_RESET:
            return {quotasGet: {quotas:[],number_of_quotas:0}}
        default:
            return state
    }
}

export const quotaUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case QUOTA_UPDATE_REQUEST:
            return { loading: true }
        case QUOTA_UPDATE_SUCCESS:
            return { loading: false, quotaPut: action.payload }
        case QUOTA_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case QUOTA_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const memberQuotasFetchReducer = (state = {memberQuotasGet: {quotas:[],number_of_quotas:0}}, action) => {
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

export const createQuotaReducer = (state = {}, action) => {
    switch (action.type) {
        case QUOTA_CREATE_REQUEST:
            return { loading: true }
        case QUOTA_CREATE_SUCCESS:
            return { loading: false, quotaCreate: action.payload }
        case QUOTA_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case QUOTA_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const deleteQuotaReducer = (state = {}, action) => {
    switch (action.type) {
        case QUOTA_DELETE_REQUEST:
            return { loading: true }
        case QUOTA_DELETE_SUCCESS:
            return { loading: false, quotaDelete: action.payload }
        case QUOTA_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case QUOTA_DELETE_RESET:
            return {}
        default:
            return state
    }
}