import {GET_SYSTEM, IMPORT_LDP, INVALIDATE_USER, RELOAD_LDP, CLEAR_SYSTEM_ERROR_MSG} from '../actions/types';

const INITIAL_STATE = {
    user: null,
    serverName: null,
    production: true,
    admin: false,
    importResult: null,
    engineUrl: null,
    errorMessage: '',
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_SYSTEM: {
            return {
                ...state,
                user: action.payload.user,
                serverName: action.payload.serverName,
                production: action.payload.production,
                admin: action.payload.admin,
                engineUrl: action.payload.engineUrl,
                errorMessage: ''
            };
        }
        case IMPORT_LDP: {
            return {
                ...state,
                errorMessage: action.payload.success ? '' : action.payload.responseMessage
            };
        } case RELOAD_LDP: {
            return {
                ...state,
                errorMessage: action.payload.success ? '' : action.payload.responseMessage
            };
        }
        case INVALIDATE_USER: {
            return {...state,
                user: null,
                admin: false,
                errorMessage: ''
            };
        }
        case CLEAR_SYSTEM_ERROR_MSG: {
            errorMessage: ''
        }

        default:
            return state;
    }
}