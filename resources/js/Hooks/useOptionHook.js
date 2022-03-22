import {message} from "antd";
import {useHistory} from "react-router-dom";
import {useContext, useState} from "react";
import {eraseCookie} from "../Helpers/cookie";
import {AppContext} from "../App";
import {GET} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";

const useOptionHook = (url, query) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        options: [],
    });

    return function getOptions(search = null) {
        const field = query.split('.').slice(-1)[0];
        const params = {
            page_size: 10,
            selected_fields: ['id', 'slug'],
            orderByColumn: field,
            orderByDirection: 'asc',
        };
        if (search) {
            params[field] = search;
        }
        useFetch(`${url}`, GET, params).then((response) => {
            const data = response.data;
            setState((prevState) => ({
                ...prevState,
                options: data.map((option) => ({
                    value: option.id,
                    label: option.slug
                }))
            }));
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }
};

export default useOptionHook;

