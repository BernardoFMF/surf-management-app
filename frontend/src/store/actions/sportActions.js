import {
    SPORTS_FETCH_SUCCESS,
    SPORTS_FETCH_FAIL,
    SPORTS_FETCH_REQUEST,
    SPORT_DELETE_SUCCESS,
    SPORT_DELETE_FAIL,
    SPORT_DELETE_REQUEST,
    SPORT_CREATE_SUCCESS,
    SPORT_CREATE_FAIL,
    SPORT_CREATE_REQUEST,
    SPORT_UPDATE_SUCCESS,
    SPORT_UPDATE_FAIL,
    SPORT_UPDATE_REQUEST,
    USER_SPORT_TYPES_FETCH_REQUEST,
    USER_SPORT_TYPES_FETCH_SUCCESS,
    USER_SPORT_TYPES_FETCH_FAIL
  } from '../constants/sportConstants'

export const getSports = () => async (dispatch) => {
  try {
    dispatch({
      type: SPORTS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/sports`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const sports = await response.json()
    if(response.status !== 200) throw Error(sports.message_code)
    dispatch({
      type: SPORTS_FETCH_SUCCESS,
      payload: sports,
    })

  } catch (error) {
    dispatch({
      type: SPORTS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteSport = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SPORT_DELETE_REQUEST,
    })
    const response = await fetch(`/api/sports/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    const text = await response.json()
    if(response.status !== 200) throw Error(text.message_code)
    dispatch({
      type: SPORT_DELETE_SUCCESS,
      payload: text,
    })

  } catch (error) {
    dispatch({
      type: SPORT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateSport = (id, name, is_deleted) => async (dispatch) => {
  try {
    dispatch({
      type: SPORT_UPDATE_REQUEST,
    })
    const response = await fetch(`/api/sports/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, is_deleted}),

    })
    const text = await response.json()
    if(response.status !== 200) throw Error(text.message_code)
    dispatch({
      type: SPORT_UPDATE_SUCCESS,
      payload: text,
    })

  } catch (error) {
    dispatch({
      type: SPORT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSport = (name) => async (dispatch) => {
  try {
    dispatch({
      type: SPORT_CREATE_REQUEST,
    })
    const response = await fetch(`/api/sports`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name}),
    })
    const sports = await response.json()
    if(response.status !== 200) throw Error(sports.message_code)
    dispatch({
      type: SPORT_CREATE_SUCCESS,
      payload: sports,
    })

  } catch (error) {
    dispatch({
      type: SPORT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserSportsTypes = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_SPORT_TYPES_FETCH_REQUEST,
    })
    const response = await fetch(`/api/sports/types`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const types = await response.json()
    console.log(types);
    if(response.status !== 200) throw Error(types.message_code)
    dispatch({
      type: USER_SPORT_TYPES_FETCH_SUCCESS,
      payload: types,
    })

  } catch (error) {
    dispatch({
      type: USER_SPORT_TYPES_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}