import { TYPES_FETCH_REQUEST, TYPES_FETCH_SUCCESS, TYPES_FETCH_FAIL, TYPES_UPDATE_REQUEST, TYPES_UPDATE_SUCCESS, TYPES_UPDATE_FAIL, TYPES_CREATE_REQUEST, TYPES_CREATE_SUCCESS, TYPES_CREATE_FAIL } from '../constants/typeConstants'

export const typesFetchReducer = (state = {typesGet: []}, action) => {
    switch (action.type) {
        case TYPES_FETCH_REQUEST:
            return { loading: true }
        case TYPES_FETCH_SUCCESS:
            return { loading: false, typesGet: action.payload }
        case TYPES_FETCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const typesUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES_UPDATE_REQUEST:
            return { loading: true }
        case TYPES_UPDATE_SUCCESS:
            return { loading: false, typesUpdate: action.payload }
        case TYPES_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case TYPES_CREATE_REQUEST:
            return { loading: true }
        case TYPES_CREATE_SUCCESS:
            return { loading: false, createType: action.payload }
        case TYPES_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}