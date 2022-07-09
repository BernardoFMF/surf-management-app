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
    COMPANY_UPDATE_FAIL,
    COMPANY_POST_FAIL,
    COMPANY_POST_REQUEST,
    COMPANY_POST_SUCCESS,
    MEMBER_VALIDATION_FETCH_REQUEST,
    MEMBER_VALIDATION_FETCH_SUCCESS,
    MEMBER_VALIDATION_FETCH_FAIL
  } from '../constants/companyConstants'

import { MEMBER_LOGIN_SUCCESS, MEMBER_FETCH_SUCCESS } from '../constants/memberConstants'

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
  
  export const getCompanies = (username_filter, name_filter, email_filter, toggle_filter, offset, limit) => async (dispatch) => {
    try {
      dispatch({
        type: COMPANIES_FETCH_REQUEST,
      })
      const response = await fetch(`/api/companies?offset=${offset}&limit=${limit}${username_filter ? `&username=${username_filter}`:""}${name_filter ? `&name=${name_filter}`:""}${email_filter ? `&email=${email_filter}`:""}${toggle_filter ? `&hasDebt=${toggle_filter}`:""}`, {
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

  export const getMemberValidation = (id) => async (dispatch) => {
    try {
      dispatch({
        type: MEMBER_VALIDATION_FETCH_REQUEST,
      })
      const response = await fetch(`/api/companies/validate/${id}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
      })
      const member = await response.json()
      if(response.status !== 200) throw Error(member.message_code)
      dispatch({
        type: MEMBER_VALIDATION_FETCH_SUCCESS,
        payload: member,
      })
  
    } catch (error) {
      dispatch({
        type: MEMBER_VALIDATION_FETCH_FAIL,
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
        const companyInfo = {
          id_: updateResp.member_id_,
          member_type_: updateResp.member_type_,
          username_: updateResp.username_,
          is_admin_: updateResp.is_admin_,
          img_value_: updateResp.img_value_,
          category_ : memberInfo.category_,
          quota_value_ : memberInfo.quota_value_,
          is_deleted_ : memberInfo.is_deleted_
        }
        dispatch({
          type: MEMBER_LOGIN_SUCCESS,
          payload: companyInfo,
        })
        const expirationDate = JSON.parse(localStorage.getItem('memberInfo')).expires
        localStorage.setItem('memberInfo', JSON.stringify({...companyInfo, expires: expirationDate}))
      }
      dispatch({
        type: MEMBER_FETCH_SUCCESS,
        payload: updateResp,

      })
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

  export const postCompany = (body) => async (dispatch) => {
    try {
      dispatch({
        type: COMPANY_POST_REQUEST,
      })
  
      const response = await fetch(`/api/companies`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" }
      })
  
      const postResp = await response.json()
      if(response.status !== 201) throw Error(postResp.message_code)
      dispatch({
        type: COMPANY_POST_SUCCESS,
        payload: postResp,
      })
    } catch (error) {
      dispatch({
        type: COMPANY_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }