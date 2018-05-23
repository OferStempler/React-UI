import {
    SELECT_SERVICE_REGEX,
    POST_SERVICE_REGEX,
    PUT_SERVICE_REGEX,
    DELETE_SERVICE_REGEX
} from './types';

import {restGet, restPost, restDelete, restPut} from './util/RestUtil';


const BASE_SERVICE_URI = 'api/serviceRegex/';

export function postServiceRegex(serviceRegEx) {
    setBooleans(serviceRegEx)
    return function (dispatch) {
        restPost(BASE_SERVICE_URI,serviceRegEx, dispatch,POST_SERVICE_REGEX);
    };
}

export function putServiceRegex(serviceRegEx) {
    setBooleans(serviceRegEx)
    return function (dispatch) {
        restPut(BASE_SERVICE_URI,serviceRegEx, dispatch,PUT_SERVICE_REGEX);
    };
}

function setBooleans(serviceRegEx) {
    if(serviceRegEx){
        serviceRegEx.enabled = serviceRegEx.enabled ? 1 : 0;
    }
}

export function deleteServiceRegex(id) {

    return function (dispatch) {
        restDelete(`${BASE_SERVICE_URI}${id}`, dispatch, DELETE_SERVICE_REGEX);
    };
}

export function selectServiceRegEx(serviceRegex) {

    return {
        type: SELECT_SERVICE_REGEX,
        payload: serviceRegex
    };
}
