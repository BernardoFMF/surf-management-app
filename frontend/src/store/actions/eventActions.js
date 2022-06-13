import {
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_FAIL,
    EVENTS_FETCH_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_DELETE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_CREATE_REQUEST,
    EVENT_FETCH_SUCCESS,
    EVENT_FETCH_FAIL,
    EVENT_FETCH_REQUEST,
    EVENT_ATTENDANCE_FETCH_SUCCESS,
    EVENT_ATTENDANCE_FETCH_FAIL,
    EVENT_ATTENDANCE_FETCH_REQUEST,
    MEMBER_EVENTS_ATTENDANCE_FETCH_REQUEST,
    MEMBER_EVENTS_ATTENDANCE_FETCH_SUCCESS,
    MEMBER_EVENTS_ATTENDANCE_FETCH_FAIL
  } from '../constants/eventConstants'
  
export const getEvents = (name_filter, initial_date_filter, end_date_filter, offset, limit) => async (dispatch) => {
    try {
        dispatch({
        type: EVENTS_FETCH_REQUEST,
        })
        const response = await fetch(`/api/events?offset=${offset}&limit=${limit}${name_filter ? `&name=${name_filter}`:""}${initial_date_filter ? `&initialDate=${initial_date_filter}`:""}${end_date_filter ? `&endDate=${end_date_filter}`:""}`, {
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
      if(response.status !== 200) throw Error(text.message_code)
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

export const createEvent = (name, initial_date, end_date, groups) => async (dispatch) => {
    try {
      dispatch({
        type: EVENT_CREATE_REQUEST,
      })
      const response = await fetch(`/api/events`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({name, initial_date, final_date: end_date, groups}),

      })
      const text = await response.json()
      if(response.status !== 201) throw Error(text.message_code)
      dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: text,
      })
  
    } catch (error) {
      dispatch({
        type: EVENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getEvent = (id) => async (dispatch) => {
    try {
      dispatch({
        type: EVENT_FETCH_REQUEST,
      })
      const response = await fetch(`/api/events/${id}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      const text = await response.json()
      if(response.status !== 200) throw Error(text.message_code)
      dispatch({
        type: EVENT_FETCH_SUCCESS,
        payload: text,
      })
  
    } catch (error) {
      dispatch({
        type: EVENT_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getEventAttendance = (id, offset, limit) => async (dispatch) => {
    try {
      dispatch({
        type: EVENT_ATTENDANCE_FETCH_REQUEST,
      })
      const response = await fetch(`/api/events/${id}/attendance?offset=${offset}&limit=${limit}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      })
      let interested = 0
      let not_going = 0
      let going = 0
      let text = await response.json()
      const number_of_attendance = text.number_of_attendance
      text = text.attendance.map(attendance => {
        attendance.state_ === "interested" ? interested++ : attendance.state_ === "not going" ? not_going++ : going++
        return attendance
      })
      let attendance = {text, interested, not_going, going, number_of_attendance}
      if(response.status !== 200) throw Error(text.message_code)
      dispatch({
        type: EVENT_ATTENDANCE_FETCH_SUCCESS,
        payload: attendance,
      })
  
    } catch (error) {
      dispatch({
        type: EVENT_ATTENDANCE_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getMemberEventsAttendance = (id,name_filter, state_filter, date_filter, offset, limit) => async (dispatch) => {
    try {
      dispatch({
        type: MEMBER_EVENTS_ATTENDANCE_FETCH_REQUEST,
      })
      const response = await fetch(`/api/events/members/${id}/attendance?offset=${offset}&limit=${limit}${name_filter ? `&name=${name_filter}`:""}${state_filter ? `&state=${state_filter}`:""}${date_filter ? `&date=${date_filter}`:""}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })
      const event = await response.json()

      if(response.status !== 200) throw Error(event.message_code)
      dispatch({
        type: MEMBER_EVENTS_ATTENDANCE_FETCH_SUCCESS,
        payload: event,
      })
  
    } catch (error) {
      dispatch({
        type: MEMBER_EVENTS_ATTENDANCE_FETCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }