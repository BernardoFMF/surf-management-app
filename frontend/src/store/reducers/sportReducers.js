import {
    SPORTS_FETCH_SUCCESS,
    SPORTS_FETCH_FAIL,
    SPORTS_FETCH_REQUEST,
    SPORT_DELETE_SUCCESS,
    SPORT_DELETE_FAIL,
    SPORT_DELETE_REQUEST,
    SPORT_CREATE_SUCCESS,
    SPORT_CREATE_FAIL,
    SPORT_CREATE_REQUEST,
    SPORT_UPDATE_SUCCESS,
    SPORT_UPDATE_FAIL,
    SPORT_UPDATE_REQUEST
} from '../constants/sportConstants'

export const sportsFetchReducer = (state = {sportsGet: []}, action) => {
    switch (action.type) {
        case SPORTS_FETCH_REQUEST:
        return { loading: true }
        case SPORTS_FETCH_SUCCESS:
        return { loading: false, sportsGet: action.payload }
        case SPORTS_FETCH_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const sportsDeletionReducer = (state = {sportsDeletion: {}}, action) => {
    switch (action.type) {
        case SPORT_DELETE_REQUEST:
        return { loading: true }
        case SPORT_DELETE_SUCCESS:
        return { loading: false, sportsDeletion: action.payload }
        case SPORT_DELETE_FAIL:
        return { loading: false, error: action.payload }
        default:
        return state
    }
}

export const createSportReducer = (state = {}, action) => {
    switch (action.type) {
        case SPORT_CREATE_REQUEST:
            return { loading: true }
        case SPORT_CREATE_SUCCESS:
            return { loading: false, createType: action.payload }
        case SPORT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateSportReducer = (state = {}, action) => {
    switch (action.type) {
        case SPORT_UPDATE_REQUEST:
            return { loading: true }
        case SPORT_UPDATE_SUCCESS:
            return { loading: false, updateType: action.payload }
        case SPORT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}