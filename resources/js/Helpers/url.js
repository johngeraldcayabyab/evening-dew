export const getQueryletiable = (letiable) => {
    let query = window.location.search.substring(1);
    let lets = query.split("&");
    for (let i = 0; i < lets.length; i++) {
        let pair = lets[i].split("=");
        if (pair[0] === letiable) {
            return pair[1];
        }
    }
    return false;
}

export const getAllUrlParams = () => {
    if (window.location.href.split('?').length === 1) {
        return {};
    }
    let foo = window.location.href.split('?')[1].split('#')[0].split('&');
    let dict = {};
    let elem = [];
    for (let i = foo.length - 1; i >= 0; i--) {
        elem = foo[i].split('=');
        dict[elem[0]] = elem[1];
    }
    return dict;
}
