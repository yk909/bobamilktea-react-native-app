import * as themeActionsType from "./themeActions";
import { selectedTheme } from '../../constants/theme';

const initialState = {
    appTheme: selectedTheme,
    error: null
}

const themeReducer = ( state = initialState, action ) => {
    switch (action.type){
        case themeActionsType.TOGGLE_THEME_BEGIN:
            return {
                ...state,
                error: null
            }
        case themeActionsType.TOGGLE_THEME_SUCCESS:
            return {
                ...state,
                appTheme: action.payload.selectedTheme
            }
        case themeActionsType.TOGGLE_THEME_FALUIRE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default themeReducer;