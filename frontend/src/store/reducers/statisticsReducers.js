import {
    STATISTICS_FETCH_SUCCESS,
    STATISTICS_FETCH_FAIL,
    STATISTICS_FETCH_REQUEST,
    STATISTICS_FETCH_RESET
  } from '../constants/statisticConstants'

  export const statisticsFetchReducer = (state = {statisticsGet: {}}, action) => {
    switch (action.type) {
        case STATISTICS_FETCH_REQUEST:
        return { loading: true }
        case STATISTICS_FETCH_SUCCESS:
        return { loading: false, statisticsGet: action.payload }
        case STATISTICS_FETCH_FAIL:
        return { loading: false, error: action.payload }
        case STATISTICS_FETCH_RESET:
        return {}
        default:
        return state
    }
}