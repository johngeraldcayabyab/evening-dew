import {useState} from "react";
import {GET} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {objectHasValue} from "../Helpers/object";

const useOptionLineHook = (url, query) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        options: {},
        optionsLoading: {},
    });

    const optionActions = {
        getOptions: (search = null, key) => {
            const field = query.split('.').slice(-1)[0];
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
                const options = state.options;
                options[key] = data.map((option) => ({
                    value: option.id,
                    label: option.slug
                }));
                const optionsLoading = state.optionsLoading;
                optionsLoading[key] = false;
                setState((prevState) => ({
                    ...prevState,
                    options: options,
                    optionsLoading: optionsLoading,
                }));
            }).catch((responseErr) => {
                fetchCatcher.get(responseErr);
            });
        },
        onSearch: (search, key) => {
            optionActions.getOptions(search, key)
        },
        onClear: (key) => {
            optionActions.getOptions(null, key);
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
        getInitialOptions: (formState, lineName) => {
            if (!formState.initialLoad) {
                if (objectHasValue(formState.initialValues) && formState.initialValues.hasOwnProperty(lineName)) {
                    formState.initialValues[lineName].forEach((line, key) => {
                        const field = optionActions.getFieldFromInitialValues(line);
                        optionActions.getOptions(field, key);
                    });
                }
            }
        },
        addSelf: (key) => {
            optionActions.getOptions(null, key);
        },
        removeSelf: (key) => {
            const options = state.options;
            delete options[key];
            const optionsLoading = state.optionsLoading;
            delete optionsLoading[key];
            setState((prevState) => ({
                ...prevState,
                options: options,
                optionsLoading: optionsLoading,
            }));
        }
    };

    // console.log(state);

    return {
        ...optionActions,
        ...state
    }
};

export default useOptionLineHook;

