import {
    CANDIDATE_DELETE_SUCCESS,
    CANDIDATE_DELETE_FAIL,
    CANDIDATE_DELETE_REQUEST,
    CANDIDATES_FETCH_SUCCESS,
    CANDIDATES_FETCH_FAIL,
    CANDIDATES_FETCH_REQUEST,
    APPROVE_CANDIDATE_REQUEST,
    APPROVE_CANDIDATE_SUCCESS,
    APPROVE_CANDIDATE_FAIL
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
      if(response.status !== 200) throw Error(text.message_code)
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
  
  export const getCandidates = (username_filter, name_filter, email_filter, offset, limit) => async (dispatch) => {
    try {
      dispatch({
        type: CANDIDATES_FETCH_REQUEST,
      })
      const response = await fetch(`/api/candidates?offset=${offset}&limit=${limit}${username_filter ? `&username=${username_filter}`:""}${name_filter ? `&name=${name_filter}`:""}${email_filter ? `&email=${email_filter}`:""}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      let candidates = await response.json()
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
        type: APPROVE_CANDIDATE_REQUEST,
      })
      const response = await fetch(`/api/candidates/${id}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({"type_": member_type, "paid_enrollment_": paid_enrollment})
      })
      const candidate = await response.json()
      if(response.status !== 200) throw Error(candidate.message_code)
      dispatch({
        type: APPROVE_CANDIDATE_SUCCESS,
        payload: candidate,
      })
  
    } catch (error) {
      dispatch({
        type: APPROVE_CANDIDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }