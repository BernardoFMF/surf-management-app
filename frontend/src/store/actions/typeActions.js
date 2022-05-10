import { TYPES_FETCH_SUCCESS, TYPES_FETCH_REQUEST, TYPES_FETCH_FAIL } from '../constants/typeConstants'

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