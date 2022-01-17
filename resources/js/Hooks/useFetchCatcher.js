import {message} from "antd";
import {useHistory} from "react-router-dom";
import {useState} from "react";

const useFetchCatcher = () => {
    const history = useHistory();

    const [handle] = useState({
        get: (response) => {
            if (response.status === 401) {
                history.push('/login')
            } else if (response.status === 403) {
                message.error('You cant do this action! Please ask your admin for permission');
            }
        },
    });


    return handle;
};

export default useFetchCatcher;

