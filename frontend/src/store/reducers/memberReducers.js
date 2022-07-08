import {
  MEMBER_LOGIN_FAIL,
  MEMBER_LOGIN_REQUEST,
  MEMBER_LOGIN_SUCCESS,
  MEMBER_LOGOUT,
  MEMBER_FETCH_REQUEST,
  MEMBER_FETCH_SUCCESS,
  MEMBER_FETCH_FAIL, 
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
  CHANGE_PASSWORD_REQUEST_REQUEST,
  CHANGE_PASSWORD_REQUEST_SUCCESS,
  CHANGE_PASSWORD_REQUEST_FAIL,
  CHANGE_PASSWORD_REQUEST_RESET,
  CHANGE_CREDENTIALS_REQUEST,
  CHANGE_CREDENTIALS_SUCCESS,
  CHANGE_CREDENTIALS_FAIL,
  CHANGE_CREDENTIALS_RESET
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

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true }
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, updated: action.payload }
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    case CHANGE_PASSWORD_RESET:
      return {}
    default:
      return state
  }
}

export const changePasswordRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST_REQUEST:
      return { loading: true }
    case CHANGE_PASSWORD_REQUEST_SUCCESS:
      return { loading: false, requested: action.payload }
    case CHANGE_PASSWORD_REQUEST_FAIL:
      return { loading: false, error: action.payload }
    case CHANGE_PASSWORD_REQUEST_RESET:
      return {}
    default:
      return state
  }
}

export const changeCredentialsReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_CREDENTIALS_REQUEST:
      return { loading: true }
    case CHANGE_CREDENTIALS_SUCCESS:
      return { loading: false, updated: action.payload }
    case CHANGE_CREDENTIALS_FAIL:
      return { loading: false, error: action.payload }
    case CHANGE_CREDENTIALS_RESET:
      return {}
    default:
      return state
  }
}