import {
    CANDIDATE_DELETE_REQUEST,
    CANDIDATE_DELETE_SUCCESS,
    CANDIDATE_DELETE_FAIL,
    CANDIDATES_FETCH_SUCCESS,
    CANDIDATES_FETCH_FAIL,
    CANDIDATES_FETCH_REQUEST,
    APPROVE_COMPANY_REQUEST,
    APPROVE_COMPANY_SUCCESS,
    APPROVE_COMPANY_FAIL
  } from '../constants/candidateConstants'

export const candidateDeletionReducer = (state = {}, action) => {
    switch (action.type) {
      case CANDIDATE_DELETE_REQUEST:
        return { loading: true }
      case CANDIDATE_DELETE_SUCCESS:
        return { loading: false, candidateDeletion: action.payload }
      case CANDIDATE_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const candidatesFetchReducer = (state = {candidatesGet: []}, action) => {
    switch (action.type) {
      case CANDIDATES_FETCH_REQUEST:
        return { loading: true }
      case CANDIDATES_FETCH_SUCCESS:
        return { loading: false, candidatesGet: action.payload }
      case CANDIDATES_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const approveCandidateReducer = (state = {}, action) => {
    switch (action.type) {
      case APPROVE_COMPANY_REQUEST:
        return { loading: true }
      case APPROVE_COMPANY_SUCCESS:
        return { loading: false, approveCandidate: action.payload }
      case APPROVE_COMPANY_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }