import {getCookie} from "./cookie";

let defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    'Authorization': getCookie('Authorization')
};

export const fetchGet = (url, params = {}, headers) => {
    params = Object.entries(params).map(e => e.join('=')).join('&');
    return fetch(`${url}?${params}`, {
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'GET'
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw response;
    });
}

export const fetchPost = (url, values, headers = {}) => {
    return fetch(url, {
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'POST',
        body: JSON.stringify(values)
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw response;
    });
}

export const fetchPut = (url, values, headers) => {
    return fetch(url, {
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'PUT',
        body: JSON.stringify(values)
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw response;
    });
}

export const fetchDelete = (url, values, headers) => {
    return fetch(url, {
        headers: {
            ...defaultHeaders,
            ...headers
        },
        method: 'DELETE',
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw response;
    });
}
