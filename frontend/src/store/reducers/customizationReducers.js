import { MENU_OPEN, SET_MENU, SET_FONT_FAMILY, SET_BORDER_RADIUS } from '../constants/customizationConstants'

export const initialState = {
    isOpen: [],
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
        default:
            return state;
    }
};

export default customizationReducer