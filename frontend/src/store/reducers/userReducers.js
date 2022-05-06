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

  export const sportsFetchReducer = (state = {sportsGet: []}, action) => {
    switch (action.type) {
      case SPORTS_FETCH_REQUEST:
        return { loading: true }
      case SPORTS_FETCH_SUCCESS:
        return { loading: false, sportsGet: action.payload }
      case SPORTS_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const sportsDeletionReducer = (state = {sportsDeletion: {}}, action) => {
    switch (action.type) {
      case SPORT_DELETE_REQUEST:
        return { loading: true }
      case SPORT_DELETE_SUCCESS:
        return { loading: false, sportsDeletion: action.payload }
      case SPORT_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

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