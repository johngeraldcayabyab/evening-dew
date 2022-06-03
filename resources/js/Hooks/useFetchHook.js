import {getCookie} from "../Helpers/cookie";
import {GET} from "../consts";
import {useEffect} from "react";

const useFetchHook = () => {
    const controller = new AbortController();
    const {signal} = controller;

    useEffect(() => {
        return () => {
            controller.abort.bind(controller)();
        };
    }, []);

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'Authorization': getCookie('Authorization')
    };

    return (url, method, values = {}, withHeaders = false, customHeaders) => {
        const fetchInit = {
            headers: {
                ...defaultHeaders,
                ...customHeaders,
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
                if (withHeaders) {
                    return responseOk;
                }
                return responseOk.text();
            } else if (contentType === 'application/json') {
                if (withHeaders) {
                    return responseOk;
                }
                return responseOk.json();
            }
            // for 204 response it has a blank content type. so for now return all the response
            return responseOk;
        });
    }
};

export default useFetchHook;
