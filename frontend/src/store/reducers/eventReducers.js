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
    MEMBER_EVENTS_ATTENDANCE_FETCH_FAIL,
    MEMBER_EVENT_ATTENDANCE_UPDATE_REQUEST,
    MEMBER_EVENT_ATTENDANCE_UPDATE_SUCCESS,
    MEMBER_EVENT_ATTENDANCE_UPDATE_FAIL
} from '../constants/eventConstants'

export const eventsFetchReducer = (state = {eventsGet: {events: [], number_of_events : 0}}, action) => {
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


export const createEventReducer = (state = {}, action) => {
    switch (action.type) {
        case EVENT_CREATE_REQUEST:
        return { loading: true }
        case EVENT_CREATE_SUCCESS:
        return { loading: false, createEvent: action.payload }
        case EVENT_CREATE_FAIL:
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

export const eventAttendanceFetchReducer = (state = {eventAttendanceGet: {text:[],interested:0,not_going:0,going:0, number_of_attendance:0}}, action) => {
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

export const memberEventsAttendanceFetchReducer = (state = {memberEventsAttendanceGet: {events:[],number_of_events:0}}, action) => {
    switch (action.type) {
        case MEMBER_EVENTS_ATTENDANCE_FETCH_REQUEST:
        return { loading: true }
        case MEMBER_EVENTS_ATTENDANCE_FETCH_SUCCESS:
        return { loading: false, memberEventsAttendanceGet: action.payload }
        case MEMBER_EVENTS_ATTENDANCE_FETCH_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const memberEventAttendanceUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case MEMBER_EVENT_ATTENDANCE_UPDATE_REQUEST:
        return { loading: true }
        case MEMBER_EVENT_ATTENDANCE_UPDATE_SUCCESS:
        return { loading: false, memberEventAttendanceUpdate: action.payload }
        case MEMBER_EVENT_ATTENDANCE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}