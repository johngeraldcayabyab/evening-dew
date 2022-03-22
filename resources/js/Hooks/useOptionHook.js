import {useState} from "react";
import {GET} from "../consts";
import useFetchHook from "./useFetchHook";
import useFetchCatcherHook from "./useFetchCatcherHook";
import {objectHasValue} from "../Helpers/object";

const useOptionHook = (url, query) => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState({
        options: [],
        optionsLoading: true,
    });

    const optionActions = {
        getOptions: (search) => {
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
                    })),
                    optionsLoading: false,
                }));
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

