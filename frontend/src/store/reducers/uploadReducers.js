import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAIL, UPLOAD_RESET } from '../constants/uploadConstants'

export const uploadReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return { loading: true }
        case UPLOAD_SUCCESS:
            return { loading: false, uploadGet: action.payload }
        case UPLOAD_FAIL:
            return { loading: false, error: action.payload }
        case UPLOAD_RESET:
            return {}
        default:
            return state
    }
}