import {useState} from "react";
import {GET, POST} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {objectHasValue} from "../Helpers/object";

const useOptionHook = (url, query) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        value: null,
        options: [],
        optionsLoading: true,
    });

    function getField() {
        return query.split('.').slice(-1)[0];
    }

    const optionActions = {
        getOptions: (search = null) => {
            const field = getField();
            let params = {
                page_size: 10,
                selected_fields: ['id', 'slug'],
                orderByColumn: field,
                orderByDirection: 'asc',
            };
            if (typeof search === 'string') {
                params[field] = search;
            } else if (typeof search === 'object') {
                params = {
                    ...params,
                    ...search
                };
            }
            useFetch(`${url}`, GET, params).then((response) => {
                const data = response.data;
                setState((prevState) => ({
                    ...prevState,
                    options: data.map((option) => ({
                        value: option.id,
                        label: option.slug
                    })),
                    optionsLoading: false,
                }));
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        },
        onChange: (event) => {
            setState((prevState) => ({
                ...prevState,
                value: event.target.value
            }));
        },
        onCreate: () => {
            const params = {};
            params[getField()] = state.value;
            useFetch(`${url}`, POST, params).then((response) => {
                setState(prevState => ({
                    ...prevState,
                    value: null
                }));
                optionActions.getOptions();
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        },
        onSearch: (search) => {
            optionActions.getOptions(search)
        },
        onClear: () => {
            optionActions.getOptions();
        },
        getFieldFromInitialValues: (initialValues) => {
            let search = initialValues;
            query.split('.').forEach((query) => {
                if (search && query in search) {
                    search = search[query];
                } else {
                    search = null;
                }
            });
            return search;
        },
        getInitialOptions: (formState) => {
            if (!formState.initialLoad) {
                let initialValue = null;
                if (objectHasValue(formState.initialValues)) {
                    initialValue = optionActions.getFieldFromInitialValues(formState.initialValues);
                }
                optionActions.getOptions(initialValue);
            }
        }
    }

    return {
        ...optionActions,
        ...state
    }
};

export default useOptionHook;

