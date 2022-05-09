import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USERS_FETCH_SUCCESS,
    USERS_FETCH_FAIL,
    USERS_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAIL,
    USER_FETCH_REQUEST,
    SPORTS_FETCH_SUCCESS,
    SPORTS_FETCH_FAIL,
    SPORTS_FETCH_REQUEST,
    SPORT_DELETE_SUCCESS,
    SPORT_DELETE_FAIL,
    SPORT_DELETE_REQUEST,
    QUOTAS_FETCH_SUCCESS,
    QUOTAS_FETCH_FAIL,
    QUOTAS_FETCH_REQUEST,
    QUOTA_UPDATE_SUCCESS,
    QUOTA_UPDATE_FAIL,
    QUOTA_UPDATE_REQUEST,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
  } from '../constants/userConstants'
  
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }

  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, userRegistration: action.payload }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }

  export const userDeletionReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { loading: true }
      case USER_DELETE_SUCCESS:
        return { loading: false, userDeletion: action.payload }
      case USER_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const usersFetchReducer = (state = {usersGet: []}, action) => {
    switch (action.type) {
      case USERS_FETCH_REQUEST:
        return { loading: true }
      case USERS_FETCH_SUCCESS:
        return { loading: false, usersGet: action.payload }
      case USERS_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userFetchReducer = (state = {userGet: {}}, action) => {
    switch (action.type) {
      case USER_FETCH_REQUEST:
        return { loading: true }
      case USER_FETCH_SUCCESS:
        return { loading: false, userGet: action.payload }
      case USER_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true }
      case USER_UPDATE_SUCCESS:
        return { loading: false, updated: true, updateResult: action.payload }
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

