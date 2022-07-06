import {
    EXPORT_USER_FETCH_REQUEST,
    EXPORT_USER_FETCH_SUCCESS,
    EXPORT_USER_FETCH_FAIL,
    EXPORT_COMPANY_FETCH_REQUEST,
    EXPORT_COMPANY_FETCH_SUCCESS,
    EXPORT_COMPANY_FETCH_FAIL,
    EXPORT_CANDIDATE_FETCH_REQUEST,
    EXPORT_CANDIDATE_FETCH_SUCCESS,
    EXPORT_CANDIDATE_FETCH_FAIL,
    EXPORT_CANDIDATE_FETCH_RESET,
    EXPORT_COMPANY_FETCH_RESET
} from '../constants/exportConstants'

export const exportUsersCSVReducer = (state = {exportUsers: []}, action) => {
    switch (action.type) {
      case EXPORT_USER_FETCH_REQUEST:
        return { loading: true }
      case EXPORT_USER_FETCH_SUCCESS:
        return { loading: false, exportUsers: action.payload }
      case EXPORT_USER_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const exportCompaniesCSVReducer = (state = {exportCompanies: []}, action) => {
    switch (action.type) {
      case EXPORT_COMPANY_FETCH_REQUEST:
        return { loading: true }
      case EXPORT_COMPANY_FETCH_SUCCESS:
        return { loading: false, exportCompanies: action.payload }
      case EXPORT_COMPANY_FETCH_FAIL:
        return { loading: false, error: action.payload }
      case EXPORT_COMPANY_FETCH_RESET:
        return {exportCompanies: []}
      default:
        return state
    }
  }

  export const exportCandidatesCSVReducer = (state = {exportCandidates: []}, action) => {
    switch (action.type) {
      case EXPORT_CANDIDATE_FETCH_REQUEST:
        return { loading: true }
      case EXPORT_CANDIDATE_FETCH_SUCCESS:
        return { loading: false, exportCandidates: action.payload }
      case EXPORT_CANDIDATE_FETCH_FAIL:
        return { loading: false, error: action.payload }
      case EXPORT_CANDIDATE_FETCH_RESET:
        return {exportCandidates: []}
      default:
        return state
    }
  }