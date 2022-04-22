import { MENU_OPEN, SET_MENU, SET_FONT_FAMILY, SET_BORDER_RADIUS } from '../constants/customizationConstants'

import config from '../../config'

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

const customizationReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id]
            };
        case SET_MENU:
            return {
                ...state,
                opened: action.opened
            };
        case SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: action.fontFamily
            };
        case SET_BORDER_RADIUS:
            return {
                ...state,
                borderRadius: action.borderRadius
            };
        default:
            return state;
    }
};

export default customizationReducer