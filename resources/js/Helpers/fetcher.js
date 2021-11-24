let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const fetchGet = (url) => {
    return fetch(url, {
        headers,
        method: 'GET'
    });
}

export const fetchPost = (url, values) => {
    return fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(values)
    });
}

export const fetchPut = (url, values) => {
    return fetch(url, {
        headers,
        method: 'PUT',
        body: JSON.stringify(values)
    });
}

export const fetchDelete = (url) => {
    return fetch(url, {
        headers,
        method: 'DELETE',
    });
}
