import {
    STATISTICS_FETCH_SUCCESS,
    STATISTICS_FETCH_FAIL,
    STATISTICS_FETCH_REQUEST
  } from '../constants/statisticConstants'

export const getStatistics = () => async (dispatch) => {
  try {
    dispatch({
      type: STATISTICS_FETCH_REQUEST,
    })
    const response = await fetch(`/api/statistics`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    })
    const statistics = await response.json()
    if(response.status !== 200) throw Error(statistics.message_code)
    dispatch({
      type: STATISTICS_FETCH_SUCCESS,
      payload: statistics,
    })

  } catch (error) {
    dispatch({
      type: STATISTICS_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}