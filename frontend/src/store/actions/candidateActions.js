import {
    CANDIDATE_DELETE_SUCCESS,
    CANDIDATE_DELETE_FAIL,
    CANDIDATE_DELETE_REQUEST,
    CANDIDATES_FETCH_SUCCESS,
    CANDIDATES_FETCH_FAIL,
    CANDIDATES_FETCH_REQUEST,
    CANDIDATE_FETCH_SUCCESS,
    CANDIDATE_FETCH_FAIL,
    CANDIDATE_FETCH_REQUEST,
  } from '../constants/candidateConstants'

export const deleteCandidate = (id) => async (dispatch) => {
    try {
      dispatch({
        type: CANDIDATE_DELETE_REQUEST,
      })
      const response = await fetch(`/api/candidates/${id}`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" }
      })
      const text = await response.json()
      if(response.status !== 201) throw Error(text.message_code)
      dispatch({
        type: CANDIDATE_DELETE_SUCCESS,
        payload: text,
      })
  
    } catch (error) {
      dispatch({
        type: CANDIDATE_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getCandidates = () => async (dispatch) => {
    try {
      dispatch({
        type: CANDIDATES_FETCH_REQUEST,
      })
      const response = await fetch(`/api/candidates`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      const candidates = await response.json()
      if(response.status !== 200) throw Error(candidates.message_code)
      dispatch({
        type: CANDIDATES_FETCH_SUCCESS,
        payload: candidates,
      })
  
    } catch (error) {
      dispatch({
        type: CANDIDATES_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getCandidateById = (id) => async (dispatch) => {
    try {
      dispatch({
        type: CANDIDATE_FETCH_REQUEST,
      })
      const response = await fetch(`/api/candidates/${id}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      const candidate = await response.json()
      if(response.status !== 200) throw Error(candidate.message_code)
      dispatch({
        type: CANDIDATE_FETCH_SUCCESS,
        payload: candidate,
      })
  
    } catch (error) {
      dispatch({
        type: CANDIDATE_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }