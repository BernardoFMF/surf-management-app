import {
  MEMBER_LOGIN_FAIL,
  MEMBER_LOGIN_REQUEST,
  MEMBER_LOGIN_SUCCESS,
  MEMBER_LOGOUT,
  MEMBER_FETCH_REQUEST,
  MEMBER_FETCH_SUCCESS,
  MEMBER_FETCH_FAIL,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST_REQUEST,
  CHANGE_PASSWORD_REQUEST_SUCCESS,
  CHANGE_PASSWORD_REQUEST_FAIL,
  CHANGE_CREDENTIALS_REQUEST,
  CHANGE_CREDENTIALS_SUCCESS,
  CHANGE_CREDENTIALS_FAIL
} from '../constants/memberConstants'

export const login = (username, password) => async (dispatch) => {
    try {
      dispatch({
        type: MEMBER_LOGIN_REQUEST,
      })
      const response = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" }
      })
      const memberLogin = await response.json()

      if(response.status !== 201) throw Error(memberLogin.message_code)
  
      const memberInfo = {
        id_: memberLogin.id_,
        member_type_: memberLogin.member_type_,
        username_: memberLogin.username_,
        img_value_: null
      }

      const response1 = await fetch(`/api/members/${memberLogin.id_}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      const member = await response1.json()
      
      if(response1.status !== 200) throw Error(member.message_code)
      memberInfo.is_admin_ = member.is_admin_
      memberInfo.img_value_ = member.img_value_
      memberInfo.category_ = member.category_
      memberInfo.quota_value_ = member.quota_value_
      memberInfo.is_deleted_ = member.is_deleted_

      localStorage.setItem('memberInfo', JSON.stringify({...memberInfo, expires: memberLogin.expires}))

      dispatch({
        type: MEMBER_LOGIN_SUCCESS,
        payload: memberInfo,
      })
      
    } catch (error) {
      dispatch({
        type: MEMBER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const logout = () => async (dispatch) => {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('memberInfo')
    dispatch({ type: MEMBER_LOGOUT })
  }

  export const getMemberById = (id) => async (dispatch) => {
    try {
      dispatch({
        type: MEMBER_FETCH_REQUEST,
      })
      const response = await fetch(`/api/members/${id}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      const member = await response.json()
      if(response.status !== 200) throw Error(member.message_code)
      dispatch({
        type: MEMBER_FETCH_SUCCESS,
        payload: member,
      })
  
    } catch (error) {
      dispatch({
        type: MEMBER_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const changePassword = (token, id, password) => async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST,
      })
      const response = await fetch('/api/auth/resetPassword', {
          method: 'POST',
          body: JSON.stringify({ token, id, password }),
          headers: { "Content-Type": "application/json" }
      })
      const passwordChange = await response.json()

      if(response.status !== 201) throw Error(passwordChange.message_code)

      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: passwordChange,
      })
      
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const requestChangePassword = (email) => async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST_REQUEST,
      })
      const response = await fetch('/api/auth/requestResetPassword', {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" }
      })
      const passwordChangeRequest = await response.json()

      if(response.status !== 201) throw Error(passwordChangeRequest.message_code)

      dispatch({
        type: CHANGE_PASSWORD_REQUEST_SUCCESS,
        payload: passwordChangeRequest,
      })
      
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const changeCredentials = (token, id, email, username, password) => async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_CREDENTIALS_REQUEST,
      })
      const response = await fetch('/api/auth/updateCredentials', {
          method: 'POST',
          body: JSON.stringify({ token, id, email, username, password }),
          headers: { "Content-Type": "application/json" }
      })
      const credentialsChangeRequest = await response.json()

      if(response.status !== 201) throw Error(credentialsChangeRequest.message_code)

      dispatch({
        type: CHANGE_CREDENTIALS_SUCCESS,
        payload: credentialsChangeRequest,
      })
      
    } catch (error) {
      dispatch({
        type: CHANGE_CREDENTIALS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }