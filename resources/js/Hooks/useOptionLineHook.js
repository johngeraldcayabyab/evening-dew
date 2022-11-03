import {useState} from "react";
import {GET, POST, SELECT_PAGE_SIZE} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {objectHasValue} from "../Helpers/object";

const useOptionLineHook = (url, tableField) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        keys: [],
        values: {},
        options: {},
        optionsLoading: {},
        meta: {},
        search: {}
    });

    function getField() {
        return tableField.split('.').slice(-1)[0];
    }

    const optionActions = {
        getOptions: (search = null, key) => {
            const field = getField();
            let params = {
                page_size: SELECT_PAGE_SIZE,
                selected_fields: ['id', 'slug', 'tag'],
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
                const optionsLoading = state.optionsLoading;
                const meta = state.meta;
                const searchState = state.search;
                options[key] = data.map((option) => ({
                    value: option.id,
                    label: option.slug,
                    tag: option.tag,
                }));
                optionsLoading[key] = false;
                meta[key] = response.meta;
                searchState[key] = search;
                const keys = state.keys;
                keys.push(key);
                setState((prevState) => ({
                    ...prevState,
                    options: options,
                    optionsLoading: optionsLoading,
                    meta: meta,
                    search: searchState,
                    keys: keys,
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
        onPopupScroll: (event, key) => {
            let target = event.target;
            if (!state.optionsLoading[key] && target.scrollTop + target.offsetHeight === target.scrollHeight) {
                if (state.meta[key].current_page !== state.meta[key].last_page) {
                    const field = getField();
                    let params = {
                        page_size: SELECT_PAGE_SIZE,
                        selected_fields: ['id', 'slug', 'tag'],
                        orderByColumn: field,
                        orderByDirection: 'asc',
                        page: state.meta[key].current_page + 1
                    };
                    params[field] = state.search[key];
                    useFetch(`${url}`, GET, params).then((response) => {
                        const data = response.data;
                        const meta = state.meta;
                        const options = state.options;
                        meta[key] = response.meta;
                        data.forEach((option) => {
                            options[key].push({
                                value: option.id,
                                label: option.slug,
                                tag: option.tag,
                            });
                        });

                        options[key] = options[key].filter((v, i, a) => a.findIndex(v2 => (v2.value === v.value)) === i);

                        setState((prevState) => ({
                            ...prevState,
                            meta: meta,
                            options: options,
                        }));
                    }).catch((responseErr) => {
                        fetchCatcher.get(responseErr);
                    });
                }
            }
        },
        getFieldFromInitialValues: (initialValues) => {
            let field = initialValues;
            const fields = tableField.split('.');
            fields.pop();
            fields.push('id');
            fields.forEach((query) => {
                if (field && query in field) {
                    field = field[query];
                } else {
                    field = null;
                }
            });
            return field;
        },
        getInitialOptions: (formState, lineName) => {
            //Option Line Hook doesnt have a custom param
            if (!formState.initialLoad) {
                if (objectHasValue(formState.initialValues) && formState.initialValues.hasOwnProperty(lineName)) {
                    formState.initialValues[lineName].forEach((line, key) => {
                        const field = optionActions.getFieldFromInitialValues(line);
                        optionActions.getOptions({id: field}, key);
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
                onPopupScroll: (event) => lineOptions.onPopupScroll(event, fieldKey),
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

