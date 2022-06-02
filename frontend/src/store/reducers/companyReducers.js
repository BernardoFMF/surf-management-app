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

  export const companiesFetchReducer = (state = {companiesGet: {companies:[],number_of_companies:0}}, action) => {
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

  export const memberValidateFetchReducer = (state = {validateGet: {full_name_ : ""}}, action) => {
    switch (action.type) {
      case MEMBER_VALIDATION_FETCH_REQUEST:
        return { loading: true }
      case MEMBER_VALIDATION_FETCH_SUCCESS:
        return { loading: false, validateGet: action.payload }
      case MEMBER_VALIDATION_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const companyUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMPANY_UPDATE_REQUEST:
        return { loading: true }
      case COMPANY_UPDATE_SUCCESS:
        return { loading: false, updated: true, updateResult: action.payload }
      case COMPANY_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const companyPostReducer = (state = {}, action) => {
    switch (action.type) {
      case COMPANY_POST_REQUEST:
        return { loading: true }
      case COMPANY_POST_SUCCESS:
        return { loading: false, posted: true, postedResult: action.payload }
      case COMPANY_POST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }