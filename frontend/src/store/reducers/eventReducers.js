import {
    EVENTS_FETCH_SUCCESS,
    EVENTS_FETCH_FAIL,
    EVENTS_FETCH_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_DELETE_REQUEST
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