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
    USERS_SPORT_FETCH_REQUEST,
    USER_POST_FAIL,
    USER_POST_REQUEST,
    USER_POST_SUCCESS,
    USER_SPORT_UPDATE_SUCCESS,
    USER_SPORT_UPDATE_FAIL,
    USER_SPORT_UPDATE_REQUEST,
    USER_SPORT_DELETE_REQUEST,
    USER_SPORT_DELETE_SUCCESS,
    USER_SPORT_DELETE_FAIL
  } from '../constants/userConstants'

import { MEMBER_LOGIN_SUCCESS, MEMBER_FETCH_SUCCESS } from '../constants/memberConstants'

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

export const getUsers = (username_filter, name_filter, email_filter, offset, limit) => async (dispatch) => {
  try {
    dispatch({
      type: USERS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/users?offset=${offset}&limit=${limit}${username_filter ? `&username=${username_filter}`:""}${name_filter ? `&name=${name_filter}`:""}${email_filter ? `&email=${email_filter}`:""}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    let users = await response.json()
    console.log(users);
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
      const newMemberInfo = {
        id_: updateResp.member_id_,
        member_type_: updateResp.member_type_,
        username_: updateResp.username_,
        is_admin_: updateResp.is_admin_,
        img_value_: updateResp.img_value_
      }
      dispatch({
        type: MEMBER_FETCH_SUCCESS,
        payload: updateResp,
      })
      dispatch({
        type: MEMBER_LOGIN_SUCCESS,
        payload: newMemberInfo,
      })
      

      sessionStorage.setItem('memberInfo', JSON.stringify(newMemberInfo))
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

export const getUserSports = (id, offset, limit) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SPORTS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/users/${id}/sports?offset=${offset}&limit=${limit}`, {
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

export const updateUserSports = (id, sid, body) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SPORT_UPDATE_REQUEST,
    })
    const response = await fetch(`/api/users/${id}/sports/${sid}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
    console.log("fez");
    const userSport = await response.json()
    if(response.status !== 200) throw Error(userSport.message_code)
    dispatch({
      type: USER_SPORT_UPDATE_SUCCESS,
      payload: userSport
    })

  } catch (error) {
    dispatch({
      type: USER_SPORT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUserSport = (id, sid) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SPORT_DELETE_REQUEST,
    })
    const response = await fetch(`/api/users/${id}/sports/${sid}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    const userSport = await response.json()
    if(response.status !== 200) throw Error(userSport.message_code)
    dispatch({
      type: USER_SPORT_DELETE_SUCCESS,
      payload: userSport
    })

  } catch (error) {
    dispatch({
      type: USER_SPORT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUsersSport = (id, offset, limit) => async (dispatch) => {
try {
  dispatch({
    type: USERS_SPORT_FETCH_REQUEST,
  })
  const response = await fetch(`/api/users/sports/${id}?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
  })
  const sports = await response.json()
  console.log(sports);
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

export const postUser = (body) => async (dispatch) => {
  try {
    dispatch({
      type: USER_POST_REQUEST,
    })

    const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })

    const postResp = await response.json()
    if(response.status !== 201) throw Error(postResp.message_code)
    dispatch({
      type: USER_POST_SUCCESS,
      payload: postResp,
    })
  } catch (error) {
    dispatch({
      type: USER_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}