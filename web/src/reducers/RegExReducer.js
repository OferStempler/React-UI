import orderBy from 'lodash/orderBy';

import {
    GET_REGEXS,
    POST_REGEX,
    GET_REGEX,
    PUT_REGEX,
    DELETE_REGEX,
    LOAD_REGEXS,
    SORT_REGEX_TABLE
} from '../actions/types';

const INITIAL_STATE = {
    regEx: null,
    loadReExes: false,
    regExes: [],
    regexSortDir: 'desc',
    regexSortColumn: ''

};
const invertDirection = {
    asc: 'desc',
    desc: 'asc'
}
export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_REGEXS: {
            return {
                ...state,
                regExes: action.payload,
                regEx: null,
                loadReExes: false
            };
        }
        case GET_REGEX: {
            return {
                ...state,
                regEx: action.payload,
                loadReExes: false
            };
        }
        case POST_REGEX: {
            return {
                ...state,
                regEx: null,
                loadReExes: true
            };
        }
        case DELETE_REGEX: {
            return {
                ...state,
                regEx: null,
                loadReExes: true
            };
        }
        case PUT_REGEX: {
            return {
                ...state,
                regEx: null,
                loadReExes: true
            };
        }
        case LOAD_REGEXS: {
            return {
                ...state,
                loadReExes: action.payload,
            };
        }
        case SORT_REGEX_TABLE: {
            let sortDir = state.regexSortColumn === action.payload ? invertDirection[state.regexSortDir] : 'desc';
            let sortColumn = action.payload;
            return {
                ...state,
                regexSortColumn: sortColumn,
                regexSortDir: sortDir,
                regExes: orderBy(state.regExes, sortColumn, sortDir)
            };
        }
        default:
            return state;
    }
}