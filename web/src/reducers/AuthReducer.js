import { AUTH_USER, INVALIDATE_USER, AUTH_ERROR, INIT_AUTH_USER} from '../actions/types';
import { setJwtToken, removeJwtToken } from '../actions/util/JwtUtil';


export default function (state = {authenticated: false }, action) {
    switch (action.type) {
        case AUTH_USER:
            setJwtToken(action.payload.token);
            return { ...state, error: '', authenticated: true };
        case INVALIDATE_USER:
            removeJwtToken();
            return { ...state, error: '', authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case INIT_AUTH_USER:
            return { ...state, error: '', authenticated: true };
        default:
            return state;
    }
}

