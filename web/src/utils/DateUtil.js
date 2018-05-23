
export let userLocale;
export let DateTimeFormat;


export function asStringDate(time) {
    //return new Date(time).toLocaleString();
    if(time === null){
        return '';
    }
    return new Date(time).toLocaleDateString(userLocale, {hour: '2-digit', minute:'2-digit'})
}

export function asShortStringDate(time) {
    if(time != null){
        return new Date(time).toLocaleDateString(userLocale)
    }
    return null;
    //return new Date(time).toLocaleString();

}


export function daysPassed(time){
    var timeDifference = Math.abs(new Date().getTime() - time);
    return Math.ceil(timeDifference / (1000 * 3600 * 24));//ms * seconds * hours
}




export function asSearchStringDate(time) {
    //return new Date(time).toLocaleString();

    return new Date(time).toLocaleDateString(userLocale)
}

export function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

export function timeToDate(value) {
    if (value) {
        return new Date(value);
    }
    return null;
}
