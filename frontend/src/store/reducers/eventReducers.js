import {
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_FAIL,
    EVENTS_FETCH_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_DELETE_REQUEST,
    EVENT_FETCH_SUCCESS,
    EVENT_FETCH_FAIL,
    EVENT_FETCH_REQUEST,
    EVENT_ATTENDANCE_FETCH_SUCCESS,
    EVENT_ATTENDANCE_FETCH_FAIL,
    EVENT_ATTENDANCE_FETCH_REQUEST
} from '../constants/eventConstants'

export const eventsFetchReducer = (state = {eventsGet: []}, action) => {
    switch (action.type) {
        case EVENTS_FETCH_REQUEST:
        return { loading: true }
        case EVENTS_FETCH_SUCCESS:
        return { loading: false, eventsGet: action.payload }
        case EVENTS_FETCH_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const EventDeletionReducer = (state = {eventDeletion: {}}, action) => {
    switch (action.type) {
        case EVENT_DELETE_REQUEST:
        return { loading: true }
        case EVENT_DELETE_SUCCESS:
        return { loading: false, eventDeletion: action.payload }
        case EVENT_DELETE_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const eventFetchReducer = (state = {eventGet: {}}, action) => {
    switch (action.type) {
        case EVENT_FETCH_REQUEST:
        return { loading: true }
        case EVENT_FETCH_SUCCESS:
        return { loading: false, eventGet: action.payload }
        case EVENT_FETCH_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const eventAttendanceFetchReducer = (state = {eventAttendanceGet: {text:[],interested:0,not_going:0,going:0}}, action) => {
    switch (action.type) {
        case EVENT_ATTENDANCE_FETCH_REQUEST:
        return { loading: true }
        case EVENT_ATTENDANCE_FETCH_SUCCESS:
        return { loading: false, eventAttendanceGet: action.payload }
        case EVENT_ATTENDANCE_FETCH_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}