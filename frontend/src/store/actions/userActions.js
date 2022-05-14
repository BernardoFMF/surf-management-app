import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USERS_FETCH_SUCCESS,
    USERS_FETCH_FAIL,
    USERS_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAIL,
    USER_FETCH_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_SPORTS_FETCH_SUCCESS,
    USER_SPORTS_FETCH_FAIL,
    USER_SPORTS_FETCH_REQUEST,
    USERS_SPORT_FETCH_SUCCESS,
    USERS_SPORT_FETCH_FAIL,
    USERS_SPORT_FETCH_REQUEST
  } from '../constants/userConstants'

import { MEMBER_LOGIN_SUCCESS } from '../constants/memberConstants'

export const signUp = (body) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const response = await fetch('/api/candidates', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
    const text = await response.json()
    if(response.status !== 201) throw Error(text.message_code)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: text,
    })

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })
    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    const text = await response.json()
    if(response.status !== 200) throw Error(text.message_code)
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: text,
    })

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USERS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/users`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    let users = await response.json()
    if(response.status !== 200) throw Error(users.message_code)
    dispatch({
      type: USERS_FETCH_SUCCESS,
      payload: users,
    })

  } catch (error) {
    dispatch({
      type: USERS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FETCH_REQUEST,
    })
    const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const users = await response.json()
    if(response.status !== 200) throw Error(users.message_code)
    dispatch({
      type: USER_FETCH_SUCCESS,
      payload: users,
    })

  } catch (error) {
    dispatch({
      type: USER_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const { memberLogin: { memberInfo } } = getState()

    const response = await fetch(`/api/users/${body.member_id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })

    const updateResp = await response.json()
    if(response.status !== 200) throw Error(updateResp.message_code)

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: updateResp,
    })

    if (memberInfo.id_ === body.member_id) {
      const userInfo = {
        id_: updateResp.member_id_,
        member_type_: updateResp.member_type_,
        username_: updateResp.username_,
        is_admin_: updateResp.is_admin_,
        img_value_: updateResp.img_value_
      }

      dispatch({
        type: MEMBER_LOGIN_SUCCESS,
        payload: userInfo,
      })
      dispatch({
        type: USER_FETCH_SUCCESS,
        payload: updateResp,
      })

      sessionStorage.setItem('memberInfo', JSON.stringify(memberInfo))
    }

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserSports = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SPORTS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/users/${id}/sports`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const sports = await response.json()
    if(response.status !== 200) throw Error(sports.message_code)
    dispatch({
      type: USER_SPORTS_FETCH_SUCCESS,
      payload: sports,
    })

  } catch (error) {
    dispatch({
      type: USER_SPORTS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUsersSport = (id) => async (dispatch) => {
try {
  dispatch({
    type: USERS_SPORT_FETCH_REQUEST,
  })
  const response = await fetch(`/api/users/sports/${id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
  })
  const sports = await response.json()
  if(response.status !== 200) throw Error(sports.message_code)
  dispatch({
    type: USERS_SPORT_FETCH_SUCCESS,
    payload: sports,
  })

} catch (error) {
  dispatch({
    type: USERS_SPORT_FETCH_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  })
}
}