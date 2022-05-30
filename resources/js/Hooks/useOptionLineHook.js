import {useState} from "react";
import {GET, POST} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {objectHasValue} from "../Helpers/object";

const useOptionLineHook = (url, query) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        values: {},
        options: {},
        optionsLoading: {},
    });

    function getField() {
        return query.split('.').slice(-1)[0];
    }

    const optionActions = {
        getOptions: (search = null, key) => {
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
        onChange: (event, key) => {
            const values = state.values;
            values[key] = event.target.value;
            setState((prevState) => ({
                ...prevState,
                values: values
            }));
        },
        onCreate: (key) => {
            const values = state.values;
            const params = {};
            params[getField()] = values[key];
            values[key] = null;
            useFetch(`${url}`, POST, params).then((response) => {
                setState(prevState => ({
                    ...prevState,
                    values: values
                }));
                optionActions.getOptions(null, key);
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
        addSelf: (key, formState, lineName) => {
            if (formState.id) {
                if (!formState.initialLoad && !formState.initialValues[lineName][key]) {
                    optionActions.getOptions(null, key);
                }
            } else {
                optionActions.getOptions(null, key);
            }
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
        },
        aggregate: (lineOptions, fieldKey, formState, lineName) => {
            fieldKey = parseInt(fieldKey);
            return {
                value: lineOptions.values[fieldKey],
                options: lineOptions.options[fieldKey],
                optionsLoading: lineOptions.optionsLoading[fieldKey],
                onChange: (event) => lineOptions.onChange(event, fieldKey),
                onCreate: () => lineOptions.onCreate(fieldKey),
                onSearch: (search) => lineOptions.onSearch(search, fieldKey),
                onClear: () => lineOptions.onClear(fieldKey),
                addSelf: () => lineOptions.addSelf(fieldKey, formState, lineName),
                removeSelf: () => lineOptions.removeSelf(fieldKey),
            }
        },
    };

    return {
        ...optionActions,
        ...state
    }
};

export default useOptionLineHook;

