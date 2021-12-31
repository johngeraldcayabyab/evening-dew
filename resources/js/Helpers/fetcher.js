let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const fetchGet = (url, params = {}) => {
    params = Object.entries(params).map(e => e.join('=')).join('&');
    return fetch(`${url}?${params}`, {
        headers,
        method: 'GET'
    });
}

export const fetchPost = (url, values) => {
    return fetch(url, {
        headers,
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
        headers,
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
        headers,
        method: 'DELETE',
    }).then(response => {
        if (response.ok) {
            return response;
        }
        throw response;
    });
}
