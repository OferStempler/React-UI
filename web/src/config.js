export const BACKEND_URL = window.location.port === '3000' ? window.location.protocol +'//'+window.location.hostname +':8080' : window.location.origin;

export function getBackendURL() {
    return BACKEND_URL;
}