import orderBy from 'lodash/orderBy';

import {
    GET_DEPENDENCIES,
    POST_DEPENDENCY,
    GET_DEPENDENCY,
    PUT_DEPENDENCY,
    DELETE_DEPENDENCY,
    LOAD_DEPENDENCIES,
    SORT_DEPENDENCY_TABLE
} from '../actions/types';

const INITIAL_STATE = {
    dependency: null,
    loadDependencies: false,
    dependencies: [],
    dependencySortColumn: '',
    dependencySortDir: 'desc'

};
const invertDirection = {
    asc: 'desc',
    desc: 'asc'
}
export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_DEPENDENCIES: {
            return {
                ...state,
                dependencies: action.payload,
                dependency: null,
                loadDependencies: false
            };
        }
        case GET_DEPENDENCY: {
            return {
                ...state,
                dependency: action.payload,
                loadDependencies: false
            };
        }
        case POST_DEPENDENCY: {
            return {
                ...state,
                dependency: null,
                loadDependencies: true
            };
        }
        case DELETE_DEPENDENCY: {
            return {
                ...state,
                dependency: null,
                loadDependencies: true
            };
        }
        case PUT_DEPENDENCY: {
            return {
                ...state,
                dependency: null,
                loadDependencies: true
            };
        }
        case LOAD_DEPENDENCIES: {
            return {
                ...state,
                loadDependencies: action.payload,
            };
        }
        case SORT_DEPENDENCY_TABLE: {
            let sortDir = state.dependencySortColumn === action.payload ? invertDirection[state.dependencySortDir] : 'desc';
            let sortColumn = action.payload;
            return {
                ...state,
                dependencySortColumn: sortColumn,
                dependencySortDir: sortDir,
                dependencies: orderBy(state.dependencies, sortColumn, sortDir)
            };
        }
        default:
            return state;
    }
}