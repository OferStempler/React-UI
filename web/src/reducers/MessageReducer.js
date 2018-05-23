import {IMPORT_LDP, INVALIDATE_USER, RELOAD_LDP, CLEAR_MSG} from '../actions/types';

const INITIAL_STATE = {
    msg: '',
    errorMsg: '',
    msgStatus: 'ok'
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case IMPORT_LDP: {
            return {
                ...state,
                msg: action.payload.responseMessage,
                msgStatus: action.payload.success ? 'ok' : 'error'
            };
        }
        case RELOAD_LDP: {
            return {
                ...state,
                msg: action.payload.responseMessage,
                msgStatus: action.payload.success ? 'ok' : 'error'
            };
        }
        case CLEAR_MSG: {
            return {
                ...state,
                msg: '',
                msgStatus: 'ok'
            };
        }
        default:
            return state;
    }
}