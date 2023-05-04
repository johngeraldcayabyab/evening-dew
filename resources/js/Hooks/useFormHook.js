import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useFetchHook from "./useFetchHook";
import {GET, POST, PUT} from "../consts";
import {formatInitialValuesDatetimeToDayjs} from "../Helpers/object";
import {AppContext} from "../Contexts/AppContext";
import dayjs from "dayjs"


const useFormHook = (id, form, manifest, getInitialValues = false) => {
    const appContext = useContext(AppContext);
    const useFetch = useFetchHook();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        initialLoad: true,
        initialValues: {},
        loading: !!id,
        errors: {},
        formDisabled: !!id,
    });

    const [formActions] = useState({
        fetchData: (overrideId = null) => {
            if (overrideId) {
                id = overrideId;
            }
            if (id) {
                useFetch(`/api/${manifest.moduleName}/${id}`, GET).then((response) => {
                    setFormValuesAndState(response, {
                        initialValues: response,
                        loading: false,
                        formDisabled: true,
                    });
                });
            } else {
                if (getInitialValues && formState.initialLoad) {
                    useFetch(`/api/${manifest.moduleName}/initial_values`, GET, manifest.queryDefaults).then((response) => {
                        setFormValuesAndState(response, {
                            initialValues: response,
                        });
                    });
                } else if (formState.initialLoad) {
                    setFormState(state => ({
                        ...state,
                        initialLoad: false,
                    }));
                }
            }
        },
        onFinish: (values) => {

            for (let key in values) {
                if (values.hasOwnProperty(key)) {
                    if (values[key] instanceof dayjs) {
                        values[key] = values[key].format('YYYY-MM-DD HH:mm:ss');
                    }
                }
            }

            if (id) {
                formActions.update(values);
            } else {
                formActions.create(values);
            }
        },
        update: (values) => {
            setToLoading();
            useFetch(`/api/${manifest.moduleName}/${id}`, PUT, values).then(() => {
                formActions.fetchData();
            }).catch((responseErr) => {
                handleFormErrors(responseErr);
            });
        },
        create: (values) => {
            setToLoading();
            useFetch(`/api/${manifest.moduleName}`, POST, values, true).then((response) => {
                setFormState(prevState => ({
                    ...prevState,
                    loading: false
                }));
                let headerLocation = response.headers.get('Location');
                if (headerLocation) {
                    let locationId = headerLocation.split('/').pop();
                    if (parseInt(locationId)) {
                        navigate(`/${manifest.displayName}/${locationId}`);
                    } else {
                        navigate(`/${manifest.displayName}`);
                    }
                }
            }).catch((responseErr) => {
                handleFormErrors(responseErr);
            });
        },
        toggleEditMode: () => {
            setFormState(state => ({
                ...state,
                formDisabled: state.formDisabled !== true
            }));
        },
        modalSubmit: () => {
            form.submit();
        }
    });

    function setToLoading() {
        setFormState(state => ({
            ...state,
            loading: true
        }));
    }

    function handleFormErrors(responseErr) {
        responseErr.json().then((error) => {
            setFormState(state => ({
                ...state,
                loading: false,
                errors: error.errors
            }));
        });
    }

    function setFormValuesAndState(response, newState = {}) {
        if (formState.initialLoad) {
            newState.initialLoad = false;
        }
        formatInitialValuesDatetimeToDayjs(response);
        form.setFieldsValue(response);
        setFormState(state => ({
            ...state,
            ...newState
        }));
    }

    /**
     * Fetch data once on initial load
     */
    useEffect(() => {
        if (!appContext.appState.appInitialLoad) {
            formActions.fetchData();
        }
    }, [appContext.appState.appInitialLoad]);

    return [formState, formActions];
};

export default useFormHook;
