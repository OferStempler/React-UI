import {
    GET_DEPENDENCIES,
    POST_DEPENDENCY,
    GET_DEPENDENCY,
    PUT_DEPENDENCY,
    DELETE_DEPENDENCY,
    LOAD_DEPENDENCIES,
    SORT_DEPENDENCY_TABLE
} from '../actions/types';

import {restGet, restPost, restDelete, restPut} from './util/RestUtil';


const BASE_SERVICE_URI = '/api/dependencies/';

export function getDependency(id) {

    return function (dispatch) {
        restGet(`${BASE_SERVICE_URI}${id}`, dispatch, GET_DEPENDENCY);
    };
}

export function getDependencies() {
    return function (dispatch) {
        restGet(`${BASE_SERVICE_URI}`, dispatch, GET_DEPENDENCIES);
    };
}
export function postDependency(dependency) {
    setBooleans(dependency)
    return function (dispatch) {
        restPost(BASE_SERVICE_URI,dependency, dispatch,POST_DEPENDENCY);
    };
}

export function putDependency(dependency) {
    setBooleans(dependency)
    return function (dispatch) {
        restPut(BASE_SERVICE_URI,dependency, dispatch,PUT_DEPENDENCY);
    };
}

function setBooleans(dependency) {
    if(dependency){
        dependency.enabled = dependency.enabled ? 1 : 0;
    }
}

export function deleteDependency(id) {

    return function (dispatch) {
        restDelete(`${BASE_SERVICE_URI}${id}`, dispatch, DELETE_DEPENDENCY);
    };
}

export function synchDependencys(load) {

    return {
        type: LOAD_DEPENDENCIES,
        payload: load
    };
}

export function sortDependencyTable(sortData) {
    return {
        type: SORT_DEPENDENCY_TABLE,
        payload: sortData
    };
}