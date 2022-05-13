import {
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_FAIL,
    EVENTS_FETCH_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_DELETE_REQUEST
  } from '../constants/eventConstants'
  
export const getEvents = () => async (dispatch) => {
    try {
        dispatch({
        type: EVENTS_FETCH_REQUEST,
        })
        const response = await fetch(`/api/events`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        let events = await response.json()
        if(response.status !== 200) throw Error(events.message_code)
        dispatch({
        type: EVENTS_FETCH_SUCCESS,
        payload: events,
        })

    } catch (error) {
        dispatch({
        type: EVENTS_FETCH_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const deleteEvent = (id) => async (dispatch) => {
    try {
      dispatch({
        type: EVENT_DELETE_REQUEST,
      })
      const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" }
      })
      const text = await response.json()
      if(response.status !== 201) throw Error(text.message_code)
      dispatch({
        type: EVENT_DELETE_SUCCESS,
        payload: text,
      })
  
    } catch (error) {
      dispatch({
        type: EVENT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }