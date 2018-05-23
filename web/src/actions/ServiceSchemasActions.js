import {
    SELECT_SERVICE_SCHEMA,
    POST_SERVICE_SCHEMA,
    PUT_SERVICE_SCHEMA,
    DELETE_SERVICE_SCHEMA
} from './types';

import {restGet, restPost, restDelete, restPut} from './util/RestUtil';


const BASE_SERVICE_URI = 'api/schemas/';

export function postServiceSchema(serviceSchema) {
   // setBooleans(serviceSchema)
    return function (dispatch) {
        restPost(BASE_SERVICE_URI,serviceSchema, dispatch,POST_SERVICE_SCHEMA);
    };
}

export function putServiceSchema(serviceSchema) {
   // setBooleans(serviceSchema)
    return function (dispatch) {
        restPut(BASE_SERVICE_URI,serviceSchema, dispatch,PUT_SERVICE_SCHEMA);
    };
}

export function deleteServiceSchema(id) {

    return function (dispatch) {
        restDelete(`${BASE_SERVICE_URI}${id}`, dispatch, DELETE_SERVICE_SCHEMA);
    };
}

export function selectServiceSchema(serviceSchema) {

    return {
        type: SELECT_SERVICE_SCHEMA,
        payload: serviceSchema
    };
}

