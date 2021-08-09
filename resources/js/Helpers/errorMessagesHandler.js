import {message} from 'antd';

const errorMessagesHandler = (error) => {
    let status = error.status;
    error.json().then((body) => {
        if (status === 422) {
            message.warning(body.message);
        } else if (status === 500) {
            message.error(body.message);
        }
    });
};

export default errorMessagesHandler;
