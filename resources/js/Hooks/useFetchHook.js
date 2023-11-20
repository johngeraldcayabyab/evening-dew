import {getCookie} from "../Helpers/cookie";
import {GET} from "../consts";
import {useContext, useEffect} from "react";
import {toQueryString} from "../Helpers/url";
import {AppContext} from "../Contexts/AppContext";
import {message} from "antd";

const useFetchHook = () => {
    const appContext = useContext(AppContext);
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
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') || '',
        'Authorization': getCookie('Authorization') || '',
    };

    const handleErrors = (error) => {
        switch (error.status) {
            case 401:
                appContext.setAppState(state => ({
                    ...state,
                    isLogin: false,
                    accessRights: false,
                    userEmail: false,
                    user: {},
                    appInitialLoad: true,
                }));
                break;
            case 403:
                message.error('You can\'t do this action! Please ask your admin for permission');
                break;
            case 404:
                message.error("This endpoint doesn't exist!");
                break;
            case 422:
                message.warning('The given data was invalid.');
                break;
            case 500:
                error.clone().json().then((body) => {
                    message.error(body.message);
                });
                break;
            default:
                break;
        }
        throw error;
    };

    return (url, method, values = {}, withHeaders = false, customHeaders) => {
        const fetchInit = {
            headers: {
                ...defaultHeaders,
                ...customHeaders,
            },
            signal,
            method,
        };
        if (method === GET) {
            values = toQueryString(values);
            url = `${url}?${values}`;
        } else {
            fetchInit.body = JSON.stringify(values);
        }
        return fetch(url, fetchInit)
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw response;
            })
            .then((responseOk) => {
                const contentType = responseOk.headers.get('Content-Type');
                if (contentType === 'text/html; charset=UTF-8') {
                    return withHeaders ? responseOk : responseOk.text();
                } else if (contentType === 'application/json') {
                    return withHeaders ? responseOk : responseOk.json();
                }
                return responseOk;
            })
            .catch(handleErrors);
    };
};

export default useFetchHook;
