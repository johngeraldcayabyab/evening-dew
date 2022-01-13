import {getCookie} from "./cookie";

let defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
};

export const fetchGet = (url, params = {}) => {
    params = Object.entries(params).map(e => e.join('=')).join('&');
    return fetch(`${url}?${params}`, {
        defaultHeaders,
        method: 'GET'
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

export const fetchPut = (url, values) => {
    return fetch(url, {
        defaultHeaders,
        method: 'PUT',
        body: JSON.stringify(values)
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw response;
    });
}

export const fetchDelete = (url) => {
    return fetch(url, {
        defaultHeaders,
        method: 'DELETE',
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw response;
    });
}
