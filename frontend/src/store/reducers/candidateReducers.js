import {
    CANDIDATE_DELETE_REQUEST,
    CANDIDATE_DELETE_SUCCESS,
    CANDIDATE_DELETE_FAIL,
    CANDIDATES_FETCH_SUCCESS,
    CANDIDATES_FETCH_FAIL,
    CANDIDATES_FETCH_REQUEST,
    APPROVE_CANDIDATE_REQUEST,
    APPROVE_CANDIDATE_SUCCESS,
    APPROVE_CANDIDATE_FAIL
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

  export const candidatesFetchReducer = (state = {candidatesGet: {candidates:[],number_of_candidates:0}}, action) => {
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
      case APPROVE_CANDIDATE_REQUEST:
        return { loading: true }
      case APPROVE_CANDIDATE_SUCCESS:
        return { loading: false, approveCandidate: action.payload }
      case APPROVE_CANDIDATE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }