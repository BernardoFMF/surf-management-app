import {
    MEMBER_LOGIN_FAIL,
    MEMBER_LOGIN_REQUEST,
    MEMBER_LOGIN_SUCCESS,
    MEMBER_LOGOUT,
    MEMBER_FETCH_REQUEST,
    MEMBER_FETCH_SUCCESS,
    MEMBER_FETCH_FAIL
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

      if(response.status !== 200) throw Error(memberLogin.message_code)
  
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