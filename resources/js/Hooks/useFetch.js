import {getCookie} from "../Helpers/cookie";
import {GET} from "../consts";

const fetchData = () => {
    const controller = new AbortController();
    const {signal} = controller;

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'Authorization': getCookie('Authorization')
    };

    return [
        (url, method, values = {}, headers = {}) => {
            const fetchInit = {
                headers: {
                    ...defaultHeaders,
                    ...headers
                },
                signal,
                method: method,
            };
            if (method === GET) {
                values = Object.entries(values).map(e => e.join('=')).join('&');
                url = `${url}?${values}`;
            } else {
                fetchInit.body = JSON.stringify(values);
            }
            return fetch(url, fetchInit).then((response) => {
                if (response.ok) {
                    return response;
                }
                throw response;
            }).then((responseOk) => {
                const contentType = responseOk.headers.get('Content-Type');
                if (contentType === 'text/html; charset=UTF-8') {
                    return responseOk.text();
                } else if (contentType === 'application/json') {
                    return responseOk.json();
                } else {
                    alert('Undefined response ok type!');
                }
            });
        },
        controller.abort.bind(controller)
    ];
};

export default fetchData;
