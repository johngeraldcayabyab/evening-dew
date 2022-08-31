import {useState} from "react";
import {GET, POST, SELECT_PAGE_SIZE} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {objectHasValue} from "../Helpers/object";

const useOptionHook = (url, tableField) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        value: null,
        options: [],
        optionsLoading: true,
        meta: {},
        search: null,
    });

    function getField() {
        return tableField.split('.').slice(-1)[0];
    }

    const optionActions = {
        getOptions: (search = null) => {
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
                const meta = response.meta;
                setState((prevState) => ({
                    ...prevState,
                    options: data.map((option) => ({
                        value: option.id,
                        label: option.slug,
                        tag: option.tag,
                    })),
                    optionsLoading: false,
                    meta: meta,
                    search: search,
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
        onPopupScroll: (event) => {
            let target = event.target;
            if (!state.optionsLoading && target.scrollTop + target.offsetHeight === target.scrollHeight) {
                if (state.meta.current_page !== state.meta.last_page) {
                    const field = getField();
                    let params = {
                        page_size: SELECT_PAGE_SIZE,
                        selected_fields: ['id', 'slug', 'tag'],
                        orderByColumn: field,
                        orderByDirection: 'asc',
                        page: state.meta.current_page + 1
                    };
                    params[field] = state.search;
                    useFetch(`${url}`, GET, params).then((response) => {
                        const data = response.data;
                        const meta = response.meta;
                        const options = state.options;
                        data.forEach((option) => {
                            options.push({
                                value: option.id,
                                label: option.slug,
                                tag: option.tag,
                            });
                        });
                        setState((prevState) => ({
                            ...prevState,
                            meta: meta,
                            options: options.filter((v, i, a) => a.findIndex(v2 => (v2.value === v.value)) === i),
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
        getInitialOptions: (formState, customParams = null) => {
            if (!formState.initialLoad) {
                let initialValue = null;
                if (objectHasValue(formState.initialValues)) {
                    initialValue = optionActions.getFieldFromInitialValues(formState.initialValues);
                }
                if (initialValue) {
                    initialValue = {id: initialValue};
                }
                if (customParams) {
                    initialValue = {...initialValue, ...customParams};
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

