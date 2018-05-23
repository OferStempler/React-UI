import {
    GET_REGEXS,
    POST_REGEX,
    GET_REGEX,
    PUT_REGEX,
    DELETE_REGEX,
    LOAD_REGEXS,
    SORT_REGEX_TABLE
} from './types';

import {restGet, restPost, restDelete, restPut} from './util/RestUtil';


const BASE_REGEX_URI = '/api/regex/';

export function getRegEx(id) {

    return function (dispatch) {
        restGet(`${BASE_REGEX_URI}${id}`, dispatch, GET_REGEX);
    };
}

export function getRegExs() {
    return function (dispatch) {
        restGet(`${BASE_REGEX_URI}`, dispatch, GET_REGEXS);
    };
}

export function postRegEx(RegEx) {
    return function (dispatch) {
        restPost(BASE_REGEX_URI,RegEx, dispatch,POST_REGEX);
    };
}

export function putRegEx(RegEx) {
    return function (dispatch) {
        restPut(BASE_REGEX_URI,RegEx, dispatch,PUT_REGEX);
    };
}

export function deleteRegEx(id) {

    return function (dispatch) {
        restDelete(`${BASE_REGEX_URI}${id}`, dispatch, DELETE_REGEX);
    };
}

export function synchRegxes(load) {

    return {
        type: LOAD_REGEXS,
        payload: load
    };
}


export function sortRegexTable(column) {
    return {
        type: SORT_REGEX_TABLE,
        payload: column
    };
}