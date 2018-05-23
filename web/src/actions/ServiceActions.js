import {
    GET_SERVICES,
    POST_SERVICE,
    GET_SERVICE,
    PUT_SERVICE,
    DELETE_SERVICE,
    LOAD_SERVICES,
    SORT_SERVICE_TABLE
} from './types';

import {restGet, restPost, restDelete, restPut} from './util/RestUtil';


const BASE_SERVICE_URI = '/api/services/';

export function getService(id) {

    return function (dispatch) {
        restGet(`${BASE_SERVICE_URI}${id}`, dispatch, GET_SERVICE);
    };
}

export function getServices() {
    return function (dispatch) {
        restGet(`${BASE_SERVICE_URI}`, dispatch, GET_SERVICES);
    };
}

export function postService(service) {
    setBooleans(service)
    return function (dispatch) {
        restPost(BASE_SERVICE_URI,service, dispatch,POST_SERVICE);
    };
}

export function putService(service) {
    setBooleans(service)
    return function (dispatch) {
        restPut(BASE_SERVICE_URI,service, dispatch,PUT_SERVICE);
    };
}

function setBooleans(service) {
    if(service){
        service.enabled = service.enabled ? 1 : 0;
        service.forwardClientIp = service.forwardClientIp ? 1 : 0;
        service.persistence = service.persistence ? 1 : 0;
        if(service.serviceConversions){
            service.serviceConversions.enabled = service.serviceConversions.enabled ? 1 : 0;
        }
    }
}

export function deleteService(id) {

    return function (dispatch) {
        restDelete(`${BASE_SERVICE_URI}${id}`, dispatch, DELETE_SERVICE);
    };
}

export function synchServices(load) {

    return {
        type: LOAD_SERVICES,
        payload: load
    };
}

export function sortServiceTable(column) {
    return {
        type: SORT_SERVICE_TABLE,
        payload: column
    };
}