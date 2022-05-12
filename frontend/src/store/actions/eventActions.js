import {
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_FAIL,
    EVENTS_FETCH_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_DELETE_REQUEST
  } from '../constants/eventConstants'
  import { parse, isDate } from "date-fns";
export const getEvents = () => async (dispatch) => {

    function formatDate() {
        var d = new Date(),
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
        type: EVENTS_FETCH_REQUEST,
        })
        const response = await fetch(`/api/events`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        let events = await response.json()
        if(response.status !== 200) throw Error(events.message_code)
        let date_today = formatDate()
        console.log(date_today)
        events = events.map(event => {
            console.log("start date: " + event.initial_date_)
            console.log("end date: " + event.end_date_)
            if(date_today < event.initial_date_ && date_today < event.end_date_){
                let x = {
                    ...event, status: "status_not_started"
                }
                return x
            }else{
                if(date_today > event.initial_date_ && date_today > event.end_date_){
                    let x = {
                        ...event, status: "status_event_ended"
                    }
                    return x
                }
                else{
                    let x = {
                        ...event, status: "status_event_occurring"
                    }
                    return x
                }
            }
        })
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