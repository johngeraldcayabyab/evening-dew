import {getCookie} from "../Helpers/cookie";

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
        (url) => {
            return fetch(url, {
                headers: {
                    ...defaultHeaders
                },
                signal
            }).then((data) => {
                return data.json();
            });
        },
        controller.abort.bind(controller) // notice binding context
    ];
};

export default fetchData;
