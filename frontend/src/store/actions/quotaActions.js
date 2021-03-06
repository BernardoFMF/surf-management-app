import {
    QUOTAS_FETCH_SUCCESS,
    QUOTAS_FETCH_FAIL,
    QUOTAS_FETCH_REQUEST,
    QUOTA_UPDATE_SUCCESS,
    QUOTA_UPDATE_FAIL,
    QUOTA_UPDATE_REQUEST,
    QUOTA_CREATE_SUCCESS,
    QUOTA_CREATE_FAIL,
    QUOTA_CREATE_REQUEST,
    MEMBER_QUOTAS_FETCH_SUCCESS,
    MEMBER_QUOTAS_FETCH_FAIL,
    MEMBER_QUOTAS_FETCH_REQUEST,
    QUOTA_DELETE_SUCCESS,
    QUOTA_DELETE_FAIL,
    QUOTA_DELETE_REQUEST
  } from '../constants/quotaConstants'

  
export const getQuotas = (username_filter, email_filter, date_filter, offset, limit) => async (dispatch) => {
  try {
    dispatch({
      type: QUOTAS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/quotas?offset=${offset}&limit=${limit}${username_filter ? `&username=${username_filter}`:""}${email_filter ? `&email=${email_filter}`:""}${date_filter ? `&date=${date_filter}`:""}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    let quotas = await response.json()
    if(response.status !== 200) throw Error(quotas.message_code)
    dispatch({
      type: QUOTAS_FETCH_SUCCESS,
      payload: quotas,
    })

  } catch (error) {
    dispatch({
      type: QUOTAS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateQuota = (payment_date,id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUOTA_UPDATE_REQUEST,
    })

    const response = await fetch(`/api/quotas/${id}`, {
        method: 'PUT',
        body: JSON.stringify({payment_date}),
        headers: { "Content-Type": "application/json" }
    })
    const quotaID = await response.json()
    if(response.status !== 200) throw Error(quotaID.message_code)
    dispatch({
      type: QUOTA_UPDATE_SUCCESS,
      payload: quotaID
    })


  } catch (error) {
    dispatch({
      type: QUOTA_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMembersQuotas = (id,offset,limit) => async (dispatch) => {
  try {
    dispatch({
      type: MEMBER_QUOTAS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/quotas/members/${id}?offset=${offset}&limit=${limit}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const quotas = await response.json()
    if(response.status !== 200) throw Error(quotas.message_code)
    dispatch({
      type: MEMBER_QUOTAS_FETCH_SUCCESS,
      payload: quotas,
    })

  } catch (error) {
    dispatch({
      type: MEMBER_QUOTAS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const createQuota = (date) => async (dispatch) => {
  try {
    dispatch({
      type: QUOTA_CREATE_REQUEST,
    })
    const response = await fetch(`/api/quotas`, {
        method: 'POST',
        body: JSON.stringify({date}),
        headers: { "Content-Type": "application/json" }
    })
    const quotaID = await response.json()
    if(response.status !== 201) throw Error(quotaID.message_code)
    dispatch({
      type: QUOTA_CREATE_SUCCESS,
      payload: quotaID
    })

  } catch (error) {
    dispatch({
      type: QUOTA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteQuota = (date) => async (dispatch) => {
  try {
    dispatch({
      type: QUOTA_DELETE_REQUEST,
    })
    const response = await fetch(`/api/quotas?date=${date}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    const quotaID = await response.json()
    if(response.status !== 201) throw Error(quotaID.message_code)
    dispatch({
      type: QUOTA_DELETE_SUCCESS,
      payload: quotaID
    })

  } catch (error) {
    dispatch({
      type: QUOTA_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}