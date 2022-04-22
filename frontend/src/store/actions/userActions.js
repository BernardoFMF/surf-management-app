import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
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
    const text = await response.text()
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: text,
    })

    localStorage.setItem('userInfo', JSON.stringify(text))
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
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  //document.location.href = '/sign'
}

export const signUp = (username, email, password, fullName, nif, cc, nationality, birthDate, location, address, postalCode, phoneNumber) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const response = await fetch('/api/candidates', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, fullName, nif, cc, nationality, birthDate, location, address, postalCode, phoneNumber }),
        headers: { "Content-Type": "application/json" }
    })
    const text = await response.text()
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: text,
    })

    localStorage.setItem('userInfo', JSON.stringify(text))
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
