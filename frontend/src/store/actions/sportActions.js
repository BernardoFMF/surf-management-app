import {
    SPORTS_FETCH_SUCCESS,
    SPORTS_FETCH_FAIL,
    SPORTS_FETCH_REQUEST,
    SPORT_DELETE_SUCCESS,
    SPORT_DELETE_FAIL,
    SPORT_DELETE_REQUEST
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
    if(response.status !== 201) throw Error(text.message_code)
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