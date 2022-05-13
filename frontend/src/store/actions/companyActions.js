import {
    COMPANY_DELETE_SUCCESS,
    COMPANY_DELETE_FAIL,
    COMPANY_DELETE_REQUEST,
    COMPANIES_FETCH_SUCCESS,
    COMPANIES_FETCH_FAIL,
    COMPANIES_FETCH_REQUEST,
    COMPANY_FETCH_SUCCESS,
    COMPANY_FETCH_FAIL,
    COMPANY_FETCH_REQUEST
  } from '../constants/companyConstants'

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
      if(response.status !== 201) throw Error(text.message_code)
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
  
  export const getCompanies = () => async (dispatch) => {
    try {
      dispatch({
        type: COMPANIES_FETCH_REQUEST,
      })
      const response = await fetch(`/api/companies`, {
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