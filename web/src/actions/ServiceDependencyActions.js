import {
    SELECT_SERVICE_DEPENDENCY,
    POST_SERVICE_DEPENDENCY,
    PUT_SERVICE_DEPENDENCY,
    DELETE_SERVICE_DEPENDENCY
} from './types';

import {restGet, restPost, restDelete, restPut} from './util/RestUtil';


const BASE_SERVICE_URI = 'api/serviceDependencies/';

export function postServiceDependency(ServiceDependency) {
    setBooleans(ServiceDependency)
    return function (dispatch) {
        restPost(BASE_SERVICE_URI,ServiceDependency, dispatch,POST_SERVICE_DEPENDENCY);
    };
}
export function putServiceDependency(ServiceDependency) {
    setBooleans(ServiceDependency)
    return function (dispatch) {
        restPut(BASE_SERVICE_URI,ServiceDependency, dispatch,PUT_SERVICE_DEPENDENCY);
    };
}

function setBooleans(ServiceDependency) {
    if(ServiceDependency){
        ServiceDependency.enabled = ServiceDependency.enabled ? 1 : 0;
    }
}

export function deleteServiceDependency(id) {

    return function (dispatch) {
        restDelete(`${BASE_SERVICE_URI}${id}`, dispatch, DELETE_SERVICE_DEPENDENCY);
    };
}

export function selectServiceDependency(ServiceDependency) {
    return {
        type: SELECT_SERVICE_DEPENDENCY,
        payload: ServiceDependency
    };
}
