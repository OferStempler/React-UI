import { SET_MENU_STATE} from '../actions/types';

const INITIAL_STATE = {
    open: false,
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case SET_MENU_STATE:
            let newValue = !state.open
            return {
                ...state,
                open: newValue
            };
        default:
            return state;
    }
}