import {
    QUOTAS_FETCH_SUCCESS,
    QUOTAS_FETCH_FAIL,
    QUOTAS_FETCH_REQUEST,
    QUOTA_UPDATE_SUCCESS,
    QUOTA_UPDATE_FAIL,
    QUOTA_UPDATE_REQUEST,
    MEMBER_QUOTAS_FETCH_SUCCESS,
    MEMBER_QUOTAS_FETCH_FAIL,
    MEMBER_QUOTAS_FETCH_REQUEST
  } from '../constants/quotaConstants'

  
export const getQuotas = () => async (dispatch) => {
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  try {
    dispatch({
      type: QUOTAS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/quotas`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    let quotas = await response.json()
    if(response.status !== 200) throw Error(quotas.message_code)
    quotas = quotas.map(quota => {
      if(quota.payment_date_)quota.payment_date_ = formatDate(quota.payment_date_)
      return quota
  })
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

    const { quotasFetch: { quotasGet } } = getState()

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
    dispatch({
      type: QUOTAS_FETCH_SUCCESS,
      payload: quotasGet.map(quota => {
        if(quota.id===id){
          quota.payment_date_ = payment_date
        }
        return quota
      })
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

export const getMembersQuotas = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MEMBER_QUOTAS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/quotas/members/${id}`, {
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