import { useNavigate } from 'react-router-dom';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
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
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST
  } from '../constants/userConstants'

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const response = await fetch('/api/members/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" }
    })
    const text = await response.json()
    if(response.status !== 200) throw Error(text.message_code)

    const response1 = await fetch(`/api/users/${text.id_}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
    const user = await response1.json()
    if(response1.status !== 200) throw Error(text.message_code)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {...text, img_value_: user.img_value_},
    })

    sessionStorage.setItem('userInfo', JSON.stringify({...text, img_value_: user.img_value_}))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
 
export const logout = () => async (dispatch) => {
  await fetch('/api/members/logout', { method: 'POST' })
  sessionStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

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
    if(response.status !== 201) throw Error(text.message_code)
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
    const users = await response.json()
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

export const getQuotas = () => async (dispatch) => {
  try {
    dispatch({
      type: QUOTAS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/quotas`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const quotas = await response.json()
    if(response.status !== 200) throw Error(quotas.message_code)
    dispatch({
      type: QUOTAS_FETCH_SUCCESS,
      payload: quotas,
    })

  } catch (error) {
    dispatch({
      type: QUOTAS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateQuota = (payment_date,id) => async (dispatch) => {
  try {
    dispatch({
      type: QUOTA_UPDATE_REQUEST,
    })
    const response = await fetch(`/api/quotas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payment_date),
        headers: { "Content-Type": "application/json" }
    })
    const quotaID = await response.json()
    if(response.status !== 200) throw Error(quotaID.message_code)
    dispatch({
      type: QUOTA_UPDATE_SUCCESS,
      payload: quotaID,
    })

  } catch (error) {
    dispatch({
      type: QUOTA_UPDATE_FAIL,
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

    const { userLogin: { userInfo } } = getState()

    const response = await fetch(`/api/users/${body.member_id_}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" }
    })

    const updateResp = await response.json()
    if(response.status !== 200) throw Error(updateResp.message_code)

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: updateResp,
    })

    if (userInfo.id_ === body.member_id_) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: updateResp,
      })
      sessionStorage.setItem('userInfo', JSON.stringify(updateResp))
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
