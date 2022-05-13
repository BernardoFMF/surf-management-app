import { TYPES_FETCH_SUCCESS, TYPES_FETCH_REQUEST, TYPES_FETCH_FAIL, TYPES_UPDATE_REQUEST, TYPES_UPDATE_SUCCESS, TYPES_UPDATE_FAIL } from '../constants/typeConstants'

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