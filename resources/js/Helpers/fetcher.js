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
    console.log(JSON.stringify(values));
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
