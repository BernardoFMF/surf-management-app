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
  } from '../constants/companyConstants'

export const companyDeletionReducer = (state = {}, action) => {
    switch (action.type) {
      case COMPANY_DELETE_REQUEST:
        return { loading: true }
      case COMPANY_DELETE_SUCCESS:
        return { loading: false, companyDeletion: action.payload }
      case COMPANY_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const companiesFetchReducer = (state = {companiesGet: []}, action) => {
    switch (action.type) {
      case COMPANIES_FETCH_REQUEST:
        return { loading: true }
      case COMPANIES_FETCH_SUCCESS:
        return { loading: false, companiesGet: action.payload }
      case COMPANIES_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const companyFetchReducer = (state = {companyGet: {}}, action) => {
    switch (action.type) {
      case COMPANY_FETCH_REQUEST:
        return { loading: true }
      case COMPANY_FETCH_SUCCESS:
        return { loading: false, companyGet: action.payload }
      case COMPANY_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }