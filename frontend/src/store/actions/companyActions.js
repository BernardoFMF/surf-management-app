import {
    COMPANY_DELETE_SUCCESS,
    COMPANY_DELETE_FAIL,
    COMPANY_DELETE_REQUEST,
    COMPANIES_FETCH_SUCCESS,
    COMPANIES_FETCH_FAIL,
    COMPANIES_FETCH_REQUEST,
    COMPANY_FETCH_SUCCESS,
    COMPANY_FETCH_FAIL,
    COMPANY_FETCH_REQUEST,
    COMPANY_UPDATE_REQUEST,
    COMPANY_UPDATE_SUCCESS,
    COMPANY_UPDATE_FAIL
  } from '../constants/companyConstants'

import { MEMBER_LOGIN_SUCCESS } from '../constants/memberConstants'

export const deleteCompany = (id) => async (dispatch) => {
    try {
      dispatch({
        type: COMPANY_DELETE_REQUEST,
      })
      const response = await fetch(`/api/companies/${id}`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" }
      })
      const text = await response.json()
      if(response.status !== 200) throw Error(text.message_code)
      dispatch({
        type: COMPANY_DELETE_SUCCESS,
        payload: text,
      })
  
    } catch (error) {
      dispatch({
        type: COMPANY_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getCompanies = (username_filter, name_filter, email_filter, offset, limit) => async (dispatch) => {
    try {
      dispatch({
        type: COMPANIES_FETCH_REQUEST,
      })
      const response = await fetch(`/api/companies?offset=${offset}&limit=${limit}${username_filter ? `&username=${username_filter}`:""}${name_filter ? `&name=${name_filter}`:""}${email_filter ? `&email=${email_filter}`:""}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      const companies = await response.json()
      if(response.status !== 200) throw Error(companies.message_code)
      dispatch({
        type: COMPANIES_FETCH_SUCCESS,
        payload: companies,
      })
  
    } catch (error) {
      dispatch({
        type: COMPANIES_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getCompanyById = (id) => async (dispatch) => {
    try {
      dispatch({
        type: COMPANY_FETCH_REQUEST,
      })
      const response = await fetch(`/api/companies/${id}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      })
      const company = await response.json()
      if(response.status !== 200) throw Error(company.message_code)
      dispatch({
        type: COMPANY_FETCH_SUCCESS,
        payload: company,
      })
  
    } catch (error) {
      dispatch({
        type: COMPANY_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const updateCompany = (body) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_UPDATE_REQUEST,
      })
  
      const { memberLogin: { memberInfo } } = getState()
  
      const response = await fetch(`/api/companies/${body.cid}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" }
      })
  
      const updateResp = await response.json()
      if(response.status !== 200) throw Error(updateResp.message_code)
  
      dispatch({
        type: COMPANY_UPDATE_SUCCESS,
        payload: updateResp,
      })
  
      if (memberInfo.id_ === body.cid) {
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
          type: COMPANY_FETCH_SUCCESS,
          payload: updateResp,
        })
  
        sessionStorage.setItem('memberInfo', JSON.stringify(memberInfo))
      }
  
    } catch (error) {
      dispatch({
        type: COMPANY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }