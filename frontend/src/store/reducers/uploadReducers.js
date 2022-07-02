import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAIL } from '../constants/uploadConstants'

export const uploadReducer = (state = {uploadGet: {file:""}}, action) => {
    switch (action.type) {
        case UPLOAD_REQUEST:
            return { loading: true }
        case UPLOAD_SUCCESS:
            return { loading: false, uploadGet: action.payload }
        case UPLOAD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}