import {DELETE_USER, GET_USER, GET_USERS, POST_USER, PUT_USER, UPDATE_PASSWORD, LOAD_USERS} from './types';

import {restDelete, restGet, restPost, restPut, directPut, directPost} from './util/RestUtil';


const BASE_SERVICE_URI = 'api/users/';

export function getUserById(id) {

    return function (dispatch) {
        restGet(`${BASE_SERVICE_URI}${id}`, dispatch, GET_USER);
    };
}

export function getUsers() {
    return function (dispatch) {
        restGet(`${BASE_SERVICE_URI}`, dispatch, GET_USERS);
    };
}

export function postUser(user) {
    return directPost(`${BASE_SERVICE_URI}`,user)
}

export function putUser(user) {
    return directPut(`${BASE_SERVICE_URI}`,user)
}

export function deleteUser(id) {

    return function (dispatch) {
        restDelete(`${BASE_SERVICE_URI}${id}`, dispatch, DELETE_USER);
    };
}

export function updateUserPassword(passwordData) {
    return directPut(`${BASE_SERVICE_URI}/updateUserPassword`,passwordData)
}

export function synchUsers(load) {

    return {
        type: LOAD_USERS,
        payload: load
    };
}