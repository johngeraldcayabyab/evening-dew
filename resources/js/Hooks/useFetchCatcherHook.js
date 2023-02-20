import {message} from "antd";
import {useContext, useState} from "react";
import {AppContext} from "../App";

const useFetchCatcherHook = () => {
    const appContext = useContext(AppContext);
    const [handle] = useState({
        get: (response) => {
            if (response.status === 401) {
                message.error('Please login first!');
            } else if (response.status === 403) {
                message.error('You cant do this action! Please ask your admin for permission');
            } else if (response.status === 422) {
                // 422 is a form error
                return response.json().then((body) => {
                    message.warning(body.message);
                    return body.errors;
                });
            } else if (response.status === 500) {
                return response.json().then((body) => {
                    message.error(body.message);
                    return body.errors;
                });
            } else if (response.status === 404) {
                message.error("This endpoint doesn't exist!");
            }
            return response;
        },
    });
    return handle;
};

export default useFetchCatcherHook;

