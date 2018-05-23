import orderBy from 'lodash/orderBy';
import {
    DELETE_SERVICE,
    DELETE_SERVICE_DEPENDENCY,
    DELETE_SERVICE_REGEX,
    DELETE_SERVICE_SCHEMA,
    GET_SERVICE,
    GET_SERVICES,
    LOAD_SERVICES,
    POST_SERVICE,
    POST_SERVICE_DEPENDENCY,
    POST_SERVICE_REGEX,
    POST_SERVICE_SCHEMA,
    PUT_SERVICE,
    PUT_SERVICE_DEPENDENCY,
    PUT_SERVICE_REGEX,
    PUT_SERVICE_SCHEMA,
    SELECT_SERVICE_DEPENDENCY,
    SELECT_SERVICE_REGEX,
    SELECT_SERVICE_SCHEMA,
    SORT_SERVICE_TABLE
} from '../actions/types';

const INITIAL_STATE = {
    service: null,
    loadServices: false,
    loadService: false,
    services: [],
    serviceSchemas: [],
    serviceRegularExpressions: [],
    serviceDependencies: [],
    selectedServiceRegex: null,
    serviceDeletable: false,
    selectedSchema: null,
    selectedServiceDependency: null,
    serviceSortColumn: '',
    serviceSortDir: 'desc',


};

const invertDirection = {
    asc: 'desc',
    desc: 'asc'
}
export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_SERVICES: {
            return {
                ...state,
                services: action.payload,
                service: null,
                loadServices: false,
                serviceSchemas: [],
                serviceRegularExpressions: [],
                serviceDependencies: [],
                selectedServiceRegex: null,
                serviceDeletable: false,
                selectedSchema: null,
            };
        }
        case GET_SERVICE: {
            let s = action.payload.service;
            if (s) {
                s.enabled = s.enabled === 1 ? true : false;
                s.forwardClientIp = s.forwardClientIp === 1 ? true : false;
                s.persistence = s.persistence === 1 ? true : false;
                if(s.serviceConversions){
                    s.serviceConversions.enabled = s.serviceConversions.enabled === 1 ? true : false;
                }

            }
            let sre = action.payload.serviceRegularExpressions;
            if (sre) {
                sre.map(val => val.enabled = val.enabled === 1 ? true : false)
            }

            let sd = action.payload.serviceDependencies;
            if (sd) {
                console.log(sd);
                sd.map(val => val.enabled = val.enabled === 1 ? true : false)
            }
            let ssc = action.payload.serviceSchemas;

            let canDelete = false;
            if (ssc.length === 0 && sre.length === 0) {
                canDelete = true;
            }
            return {
                ...state,
                service: s,
                loadServices: false,
                serviceSchemas: ssc,
                serviceRegularExpressions: sre,
                serviceDependencies: sd,
                selectedServiceRegex: null,
                serviceDeletable: canDelete,
                loadService: false,
                selectedSchema: null,
            };
        }
        case POST_SERVICE: {

            return {
                ...state,
                service: null,
                serviceSchemas: [],
                serviceRegularExpressions: [],
                serviceDependencies: [],
                loadServices: true,
                selectedServiceRegex: null,
                serviceDeletable: false,
                selectedSchema: null,
            };
        }
        case DELETE_SERVICE: {
            return {
                ...state,
                service: null,
                serviceSchemas: [],
                serviceRegularExpressions: [],
                serviceDependencies: [],
                loadServices: true,
                selectedServiceRegex: null,
                serviceDeletable: false,
                selectedSchema: null,
            };
        }
        case PUT_SERVICE: {
            return {
                ...state,
                service: null,
                serviceSchemas: [],
                serviceRegularExpressions: [],
                serviceDependencies: [],
                loadServices: true,
                selectedServiceRegex: null,
                serviceDeletable: false,
                selectedSchema: null,
            };
        }
        case LOAD_SERVICES: {
            return {
                ...state,
                loadServices: action.payload,
            };
        }
        case SELECT_SERVICE_REGEX: {
            return {
                ...state,
                selectedServiceRegex: action.payload,
            };
        }
        case PUT_SERVICE_REGEX: {
            let regEx = action.payload;
            if (regEx) {
                regEx.enabled = regEx.enabled === 1 ? true : false
            }
            let arr = state.serviceRegularExpressions.filter(t => t.id !== regEx.id);
            arr.unshift(action.payload);
            return {
                ...state,
                selectedServiceRegex: null,
                serviceRegularExpressions: arr.slice(0)
            };
        }

        case DELETE_SERVICE_REGEX: {
            let id = action.payload;
            let arr = state.serviceRegularExpressions.filter(t => t.id !== id);
            return {
                ...state,
                selectedServiceRegex: null,
                serviceRegularExpressions: arr.slice(0)

            };
        }
        case POST_SERVICE_REGEX: {

            let regEx = action.payload;
            if (regEx) {
                regEx.enabled = regEx.enabled === 1 ? true : false
            }
            state.serviceRegularExpressions.unshift(action.payload);
            return {
                ...state,
                selectedServiceRegex: null,
                serviceRegularExpressions: state.serviceRegularExpressions.slice(0)
            };
        }

        case SELECT_SERVICE_SCHEMA: {
            return {
                ...state,
                selectedSchema: action.payload,
            };
        }
        case PUT_SERVICE_SCHEMA: {
            let schema = action.payload;
            let arr = state.serviceSchemas.filter(t => t.id !== schema.id);
            arr.unshift(action.payload);
            return {
                ...state,
                selectedSchema: null,
                serviceSchemas: arr.slice(0)
            };
        }

        case DELETE_SERVICE_SCHEMA: {
            let id = action.payload;
            let arr = state.serviceSchemas.filter(t => t.id !== id);
            return {
                ...state,
                selectedSchema: null,
                serviceSchemas: arr.slice(0)

            };
        }
        case POST_SERVICE_SCHEMA: {
            state.serviceSchemas.unshift(action.payload);
            return {
                ...state,
                selectedSchema: null,
                serviceSchemas: state.serviceSchemas.slice(0)
            };
        }

        case SELECT_SERVICE_DEPENDENCY: {
            return {
                ...state,
                selectedServiceDependency: action.payload,
            };
        }
        case PUT_SERVICE_DEPENDENCY: {
            let dependency = action.payload;
            if (dependency) {
                dependency.enabled = dependency.enabled === 1 ? true : false
            }
            let arr = state.serviceDependencies.filter(t => t.id != dependency.id);
            arr.unshift(action.payload);
            return {
                ...state,
                selectedServiceDependency: null,
                serviceDependencies: arr.slice(0)
            };
            return {
                ...state,
                selectedServiceDependency: null,
            };
        }

        case DELETE_SERVICE_DEPENDENCY: {
            let id = action.payload;
            let arr = state.serviceDependencies.filter(t => t.id != id);
            return {
                ...state,
                selectedServiceDependency: null,
                serviceDependencies: arr.slice(0)

            };
        }
        case POST_SERVICE_DEPENDENCY: {
            let dependency = action.payload;
            if (dependency) {
                dependency.enabled = dependency.enabled === 1 ? true : false
            }
            state.serviceDependencies.unshift(action.payload);
            return {
                ...state,
                selectedServiceDependency: null,
                serviceDependencies: state.serviceDependencies.slice(0)
            };
        }
        case SORT_SERVICE_TABLE: {
            let serviceSortDir = state.serviceSortColumn === action.payload ? invertDirection[state.serviceSortDir] : 'desc';
            let serviceSortColumn = action.payload;
            return {
                ...state,
                serviceSortColumn: serviceSortColumn,
                serviceSortDir: serviceSortDir,
                services: orderBy(state.services, serviceSortColumn, serviceSortDir)
            };
        }


        default:
            return state;
    }
}