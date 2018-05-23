import {DELETE_USER, GET_USER, GET_USERS, POST_USER, PUT_USER, LOAD_USERS} from '../actions/types';


const emptyNewUser = null;
//{
    // id: null,
    // username: null,
    // admin: false,
    // password: null
//}
const INITIAL_STATE = {
    selectedUser: emptyNewUser,
    users: [],
    loadUsers: true
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_USERS: {
            return {
                ...state,
                users: action.payload,
                selectedUser: emptyNewUser,
                loadUsers: false
            };
        }
        case GET_USER: {
            return {
                ...state,
                selectedUser: action.payload,
                loadUsers: false
            };
        }
        case POST_USER: {
            return {
                ...state,
                selectedUser: emptyNewUser,
                loadUsers: true
            };
        }
        case DELETE_USER: {
            return {
                ...state,
                selectedUser: emptyNewUser,
                loadUsers: true
            };
        }
        case PUT_USER: {
            return {
                ...state,
                selectedUser: emptyNewUser,
                loadUsers: true
            };
        }
        case LOAD_USERS: {
            return {
                ...state,
                loadUsers: action.payload,
                selectedUser: emptyNewUser,
            };
        }
        default:
            return state;
    }
}