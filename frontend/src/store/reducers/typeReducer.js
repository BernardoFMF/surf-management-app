import { TYPES_FETCH_REQUEST, TYPES_FETCH_SUCCESS, TYPES_FETCH_FAIL } from '../constants/typeConstants'

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