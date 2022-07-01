import {
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
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_SPORTS_FETCH_SUCCESS,
    USER_SPORTS_FETCH_FAIL,
    USER_SPORTS_FETCH_REQUEST,
    USERS_SPORT_FETCH_SUCCESS,
    USERS_SPORT_FETCH_FAIL,
    USERS_SPORT_FETCH_REQUEST,
    USER_POST_REQUEST,
    USER_POST_FAIL,
    USER_POST_SUCCESS,
    USER_SPORT_UPDATE_FAIL,
    USER_SPORT_UPDATE_REQUEST,
    USER_SPORT_UPDATE_SUCCESS,
    USER_SPORT_DELETE_REQUEST,
    USER_SPORT_DELETE_SUCCESS,
    USER_SPORT_DELETE_FAIL,
    USERS_SPORTS_CREATE_REQUEST,
    USERS_SPORTS_CREATE_SUCCESS,
    USERS_SPORTS_CREATE_FAIL,
    USER_UPDATE_RESET
  } from '../constants/userConstants'

  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, userRegistration: action.payload }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
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

  export const usersFetchReducer = (state = {usersGet: {users: [], number_of_users: 0}}, action) => {
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
      case USER_UPDATE_RESET:
        return {}
      default:
        return state
    }
  }

  export const userPostReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_POST_REQUEST:
        return { loading: true }
      case USER_POST_SUCCESS:
        return { loading: false, posted: true, postedResult: action.payload }
      case USER_POST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userSportsFetchReducer = (state = {userSportsGet: { sports: [], number_of_sports: 0}}, action) => {
    switch (action.type) {
      case USER_SPORTS_FETCH_REQUEST:
        return { loading: true }
      case USER_SPORTS_FETCH_SUCCESS:
        return { loading: false, userSportsGet: action.payload }
      case USER_SPORTS_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const userSportsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_SPORT_UPDATE_REQUEST:
        return { loading: true }
      case USER_SPORT_UPDATE_SUCCESS:
        return { loading: false, updated: true, updateResult: action.payload }
      case USER_SPORT_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const usersSportFetchReducer = (state = {usersSportGet: {users: [], number_of_users: 0, sport: {}}}, action) => {
    switch (action.type) {
        case USERS_SPORT_FETCH_REQUEST:
          return { loading: true }
        case USERS_SPORT_FETCH_SUCCESS:
          return { loading: false, usersSportGet: action.payload }
        case USERS_SPORT_FETCH_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
    }
}

export const usersSportDeleteReducer = (state = {}, action) => {
  switch (action.type) {
      case USER_SPORT_DELETE_REQUEST:
        return { loading: true }
      case USER_SPORT_DELETE_SUCCESS:
        return { loading: false, usersSportDelete: action.payload }
      case USER_SPORT_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
  }
}

export const usersSportsCreateReducer = (state = {}, action) => {
  switch (action.type) {
      case USERS_SPORTS_CREATE_REQUEST:
        return { loading: true }
      case USERS_SPORTS_CREATE_SUCCESS:
        return { loading: false, usersSportsCreate: action.payload }
      case USERS_SPORTS_CREATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
  }
}