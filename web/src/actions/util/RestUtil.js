import axios from 'axios';
import {getBackendURL} from '../../config';
import {getAuthConfig, resetTokenInactive} from './JwtUtil';
import {INVALIDATE_USER} from '../types';


export function postHeaders(uri, data, dispatch, actionType, config) {
    if (config != null) {
        axios.post(`${getBackendURL()}/${uri}`, data, config)
            .then(response => {
                dispatch({
                    type: actionType,
                    payload: response.data
                });
            })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}

export function directPost(uri, data) {
    let config = getAuthConfig();
    if(config) {
        return axios.post(`${getBackendURL()}/${uri}`, data, config);
    }
}

export function directPut(uri, data) {
    let config = getAuthConfig();
    if(config) {
        return axios.put(`${getBackendURL()}/${uri}`, data, getAuthConfig());
    }
}

export function putHeaders(uri, data, dispatch, actionType, config) {
    if (config != null) {
        axios.put(`${getBackendURL()}/${uri}`, data, config)
            .then(response => {
                dispatch({
                    type: actionType,
                    payload: response.data
                });
            })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}

export function restDeleteHeaders(uri, dispatch, actionType, config) {
    if (config != null) {
        axios.delete(`${getBackendURL()}/${uri}`, config)
            .then(response => {
                dispatch({
                    type: actionType,
                    payload: response.data
                });
            })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}

export function restPost(uri, data, dispatch, actionType) {
    postHeaders(uri, data, dispatch, actionType, getAuthConfig());
    resetTokenInactive();
}


export function restPut(uri, data, dispatch, actionType) {
    putHeaders(uri, data, dispatch, actionType, getAuthConfig());
    resetTokenInactive();
}


export function restDelete(uri, dispatch, actionType) {
    restDeleteHeaders(uri, dispatch, actionType, getAuthConfig());
    resetTokenInactive();
}

export function handleError(dispatch, error) {
    console.log(error);
    if (error.response.status === 401) {
        dispatch({
            type: INVALIDATE_USER
        });
    }
}

export function restGet(uri, dispatch, actionType) {
    let config = getAuthConfig();
    let queryString = window.location.search;
    if (config != null) {
        axios.get(`${getBackendURL()}/${uri}${queryString}`, config).then(response => {
            resetTokenInactive();
            dispatch({
                type: actionType,
                payload: response.data
            });
        })
            .catch(error => {
                handleError(dispatch, error);
            });
    }
}