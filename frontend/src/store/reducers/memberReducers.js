import {
  MEMBER_LOGIN_FAIL,
  MEMBER_LOGIN_REQUEST,
  MEMBER_LOGIN_SUCCESS,
  MEMBER_LOGOUT,
  MEMBER_FETCH_REQUEST,
  MEMBER_FETCH_SUCCESS,
  MEMBER_FETCH_FAIL 
} from "../constants/memberConstants"

export const memberLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case MEMBER_LOGIN_REQUEST:
        return { loading: true }
      case MEMBER_LOGIN_SUCCESS:
        return { loading: false, memberInfo: action.payload }
      case MEMBER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case MEMBER_LOGOUT:
        return {}
      default:
        return state
    }
}

export const memberFetchReducer = (state = {memberGet: {}}, action) => {
  switch (action.type) {
    case MEMBER_FETCH_REQUEST:
      return { loading: true }
    case MEMBER_FETCH_SUCCESS:
      return { loading: false, memberGet: action.payload }
    case MEMBER_FETCH_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
