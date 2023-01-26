import {useState} from "react";
import {GET, POST, SELECT_PAGE_SIZE} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {objectHasValue} from "../Helpers/object";
import {getFieldFromInitialValues} from "../Helpers/form";

const useOptionHook = (url, tableField, customParams = null) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        value: null,
        options: [],
        optionsLoading: true,
        meta: {},
        search: null,
    });

    console.log(state);

    function getField() {
        return tableField.split('.').slice(-1)[0];
    }

    const optionActions = {
        getOptions: (params = null) => {
            const field = getField();
            let payload = {
                page_size: SELECT_PAGE_SIZE,
                selected_fields: ['id', 'slug', 'tag'],
                orderByColumn: field,
                orderByDirection: 'asc',
            };
            if (typeof params === 'string') {
                payload[field] = params;
            } else if (typeof params === 'object') {
                payload = {
                    ...payload,
                    ...params
                };
                if (customParams) {
                    payload = {
                        ...payload,
                        ...customParams
                    }
                }
            }
            useFetch(`${url}`, GET, payload).then((response) => {
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
                    search: params,
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
            const payload = {};
            payload[getField()] = state.value;
            useFetch(`${url}`, POST, payload).then((response) => {
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
                    let payload = {
                        page_size: SELECT_PAGE_SIZE,
                        selected_fields: ['id', 'slug', 'tag'],
                        orderByColumn: field,
                        orderByDirection: 'asc',
                        page: state.meta.current_page + 1
                    };
                    payload[field] = state.search;
                    useFetch(`${url}`, GET, payload).then((response) => {
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
        onDropdownVisibleChange: (open) => {
            console.log(open);
        },
        getInitialOptions: (formState) => {
            if (!formState.initialLoad) {
                let initialParams = null;
                if (objectHasValue(formState.initialValues)) {
                    initialParams = getFieldFromInitialValues(formState.initialValues, tableField);
                }
                if (initialParams) {
                    initialParams = {id: initialParams};
                }
                optionActions.getOptions(initialParams);
            }
        }
    }

    return {
        ...optionActions,
        ...state
    }
};

export default useOptionHook;

