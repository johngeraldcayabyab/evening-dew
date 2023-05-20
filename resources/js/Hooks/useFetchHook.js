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
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        'Authorization': getCookie('Authorization')
    };

    return (url, method, values = {}, withHeaders = false, customHeaders) => {
        const fetchInit = {
            headers: {
                ...defaultHeaders, ...customHeaders,
            }, signal, method: method,
        };
        if (method === GET) {
            values = toQueryString(values);
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
        }).catch((error) => {
            if (error.status === 401) {
                appContext.setAppState(state => ({
                    ...state,
                    isLogin: false,
                    accessRights: false,
                    userEmail: false,
                    user: {},
                    appInitialLoad: true,
                }));
            } else if (error.status === 403) {
                message.error('You cant do this action! Please ask your admin for permission');
            } else if (error.status === 404) {
                message.error("This endpoint doesn't exist!");
            } else if (error.status === 422) {
                message.warning('The given data was invalid.');
            } else if (error.status === 500) {
                // https://github.com/johngeraldcayabyab/evening-dew/issues/17
                error.clone().json().then((body) => {
                    message.error(body.message);
                });
            }
            throw error;
        });
    }
};

export default useFetchHook;
