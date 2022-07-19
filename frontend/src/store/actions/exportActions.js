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
    EXPORT_MEMBERS_FETCH_REQUEST,
    EXPORT_MEMBERS_FETCH_SUCCESS,
    EXPORT_MEMBERS_FETCH_FAIL
  } from '../constants/exportConstants'


export const exportUsersCSV = () => async (dispatch) => {
  try {
    dispatch({
      type: EXPORT_USER_FETCH_REQUEST,
    })
    const response = await fetch(`/api/users?offset=${0}&limit=${-1}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    let users = await response.json()
    if(response.status !== 200) throw Error(users.message_code)
    dispatch({
      type: EXPORT_USER_FETCH_SUCCESS,
      payload: users.users,
    })
  } catch (error) {
    dispatch({
      type: EXPORT_USER_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const exportCompaniesCSV = () => async (dispatch) => {
    try {
      dispatch({
        type: EXPORT_COMPANY_FETCH_REQUEST,
      })
      const response = await fetch(`/api/companies?offset=${0}&limit=${-1}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      let companies = await response.json()
      if(response.status !== 200) throw Error(companies.message_code)
      dispatch({
        type: EXPORT_COMPANY_FETCH_SUCCESS,
        payload: companies.companies,
      })
    } catch (error) {
      dispatch({
        type: EXPORT_COMPANY_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  
export const exportCandidatesCSV = () => async (dispatch) => {
    try {
      dispatch({
        type: EXPORT_CANDIDATE_FETCH_REQUEST,
      })
      const response = await fetch(`/api/candidates?offset=${0}&limit=${-1}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      let candidates = await response.json()
      if(response.status !== 200) throw Error(candidates.message_code)
      dispatch({
        type: EXPORT_CANDIDATE_FETCH_SUCCESS,
        payload: candidates.candidates,
      })
    } catch (error) {
      dispatch({
        type: EXPORT_CANDIDATE_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const exportMembersCSV = () => async (dispatch) => {
    try {
      dispatch({
        type: EXPORT_MEMBERS_FETCH_REQUEST,
      })
      const response = await fetch(`/api/members`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      let members = await response.json()
      if(response.status !== 200) throw Error(members.message_code)
      dispatch({
        type: EXPORT_MEMBERS_FETCH_SUCCESS,
        payload: members
      })
    } catch (error) {
      dispatch({
        type: EXPORT_MEMBERS_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
