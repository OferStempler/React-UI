import axios from 'axios';
import FileSaver from 'file-saver';
import {getBackendURL} from '../config';
import {getAuthConfig, getJwtToken, resetTokenInactive} from './util/JwtUtil';
import {GET_SYSTEM, IMPORT_LDP,RELOAD_LDP, CLEAR_MSG, CLEAR_SYSTEM_ERROR_MSG} from './types';

import {postHeaders, restGet} from './util/RestUtil';


const BASE_SERVICE_URI = 'api/system';

export function getSystem() {

    return function (dispatch) {
        restGet(`${BASE_SERVICE_URI}/`, dispatch, GET_SYSTEM);
    };
}


export function getReloadLdpEngine() {
    return function (dispatch) {
        restGet(`${'/api/db/uiReload'}`, dispatch, RELOAD_LDP);
    };
}

export function exportLDP() {
    let config = getAuthConfig();
    let queryString = window.location.search;

    axios.get(`${getBackendURL()}/${'/api/db/exportAllDbToFile'}${queryString}`, config)
        .then(response => {
            let fileName = response.headers['x-suggested-filename'];
            FileSaver.saveAs(new Blob([response.data], {type: "application/octet-stream"}), fileName);
            resetTokenInactive();

        })
        .catch(error => {
            console.log(error)
        });

}


export function importLDP(file) {
    var config = {
        headers: {
            'Cache-Control': 'no-cache',
            'X-Authorization': 'Bearer ' + getJwtToken(),
            'Content-Type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('file', file)
    return function (dispatch) {
        postHeaders(`api/db/importDbFromFile`, formData, dispatch, IMPORT_LDP, config);
    };

}

export function clearMsg() {
    return {
        type: CLEAR_MSG,
    };
}
export function clearSystemErrorMsg() {
    return {
        type: CLEAR_SYSTEM_ERROR_MSG,
    };
}


