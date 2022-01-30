import {message} from "antd";
import {useHistory} from "react-router-dom";
import {useState} from "react";

const useFetchCatcher = () => {
    const history = useHistory();

    const [handle] = useState({
        get: (response) => {
            if (response.status === 401) {
                history.push('/login');
                message.error('Please login first!');
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

