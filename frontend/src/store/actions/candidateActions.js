import {
    CANDIDATE_DELETE_SUCCESS,
    CANDIDATE_DELETE_FAIL,
    CANDIDATE_DELETE_REQUEST,
    CANDIDATES_FETCH_SUCCESS,
    CANDIDATES_FETCH_FAIL,
    CANDIDATES_FETCH_REQUEST,
    APPROVE_COMPANY_REQUEST,
    APPROVE_COMPANY_SUCCESS,
    APPROVE_COMPANY_FAIL
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
  
  export const approveCandidate = (id, member_type, paid_enrollment) => async (dispatch) => {
    try {
      dispatch({
        type: APPROVE_COMPANY_REQUEST,
      })
      const response = await fetch(`/api/candidates/${id}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"type_": member_type, "paid_enrollment_": paid_enrollment})
      })
      const candidate = await response.json()
      if(response.status !== 200) throw Error(candidate.message_code)
      dispatch({
        type: APPROVE_COMPANY_SUCCESS,
        payload: candidate,
      })
  
    } catch (error) {
      dispatch({
        type: APPROVE_COMPANY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }