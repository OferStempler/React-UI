import { stringify, parse } from 'query-string';

export function updateQueryString(name, values, props) {
    let search = parse(props.location.search);
    delete search[name];
    if (Array.isArray(values)) {
        let arr = values.map(e => e.value);
        if (arr.length > 0) {
            search[name] = arr;
        }
    } else if (values != null && values.value != null) {
        search[name] = values.value;
    } else if (values != null ) {
        search[name] = values;
    }
    props.history.push({
        pathname: props.location.pathname,
        search: stringify(search)
    });
}


export function addToQueryString(name, values, search) {
    search = parse(search);
    delete search[name];
    if (Array.isArray(values)) {
        let arr = values.map(e => e.value);
        if (arr.length > 0) {
            search[name] = arr;
        }
    } else if (values != null && values.value != null) {
        search[name] = values.value;
    } else if (values != null ) {
        search[name] = values;
    }
    return stringify(search);
}


export function clearUrlParams(props){
    props.history.push({
        pathname: props.location.pathname,
        search: null
    })
}