import {message} from "antd";
import {useHistory} from "react-router-dom";
import {useContext, useState} from "react";
import {eraseCookie, getCookie} from "../Helpers/cookie";
import {AppContext} from "../components/App";

const useFetchCatcher = () => {
    const appContext = useContext(AppContext);
    const history = useHistory();

    const [handle] = useState({
        get: (response) => {
            if (response.status === 401) {
                message.error('Please login first!');
                eraseCookie('Authorization');
                appContext.setAppState((prevState) => ({
                    ...prevState,
                    isLogin: false,
                }));
                history.push('/login');
            } else if (response.status === 403) {
                message.error('You cant do this action! Please ask your admin for permission');
            } else if (response.status === 422) {
                return response.json().then((body) => {
                    message.warning(body.message);
                    return body.errors;
                });
            } else if (response.status === 500) {
                return response.json().then((body) => {
                    message.error(body.message);
                    return body.errors;
                });
            }
        },
        post: (response) => {

        }
    });

    return handle;
};

export default useFetchCatcher;

