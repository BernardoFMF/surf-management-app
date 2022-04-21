import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
  } from '../constants/userConstants'

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    console.log("cheguei");
    const response = await fetch('api/members/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" }
    })

    console.log(response)

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
  localStorage.removeItem('userInfo')
  await fetch('api/members/logout', { method: 'POST' })
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/sign'
}