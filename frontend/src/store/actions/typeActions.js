import { TYPES_FETCH_SUCCESS, TYPES_FETCH_REQUEST, TYPES_FETCH_FAIL, TYPES_UPDATE_REQUEST, TYPES_UPDATE_SUCCESS, TYPES_UPDATE_FAIL, TYPES_CREATE_REQUEST, TYPES_CREATE_SUCCESS, TYPES_CREATE_FAIL } from '../constants/typeConstants'

export const getTypes = () => async (dispatch) => {
    try {
      dispatch({
        type: TYPES_FETCH_REQUEST,
      })
      const response = await fetch(`/api/quotas/management`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      const types = await response.json()
      if(response.status !== 200) throw Error(types.message_code)
      dispatch({
        type: TYPES_FETCH_SUCCESS,
        payload: types,
      })
  
    } catch (error) {
      dispatch({
        type: TYPES_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const updateTypes = (type, quota_value) => async (dispatch) => {
  try {
    dispatch({
      type: TYPES_UPDATE_REQUEST,
    })
    const response = await fetch(`/api/quotas/management/${type}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"quota_value": quota_value})
    })
    const types = await response.json()
    if(response.status !== 200) throw Error(types.message_code)
    dispatch({
      type: TYPES_UPDATE_SUCCESS,
      payload: types,
    })

  } catch (error) {
    dispatch({
      type: TYPES_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createType = (type, quota_value) => async (dispatch) => {
  try {
    dispatch({
      type: TYPES_CREATE_REQUEST,
    })
    const response = await fetch(`/api/quotas/management`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"type": type, "quota_value": quota_value})
    })
    console.log(response);
    const types = await response.json()
    console.log(types);
    if(response.status !== 201) throw Error(types.message_code)
    dispatch({
      type: TYPES_CREATE_SUCCESS,
      payload: types,
    })

  } catch (error) {
    dispatch({
      type: TYPES_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}