import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import useFetchCatcher from "./useFetchCatcher";
import useFetchHook from "./useFetchHook";
import {GET, POST, PUT} from "../consts";
import {formatInitialValuesDatetimeToMoment} from "../Helpers/object";

const useFormState = (id, form, manifest, getInitialValues = false) => {
    const [useFetch, fetchAbort] = useFetchHook();
    const fetchCatcher = useFetchCatcher();
    const history = useHistory();

    const [formState, setFormState] = useState({
        id: id,
        backtrack: false,
        initialLoad: true,
        initialValues: {},
        loading: id && true,
        errors: {},
        formDisabled: id && true,
        pathname: location.pathname,
    });

    const [formActions] = useState({
        fetchData: (overrideId = null) => {
            if (overrideId) {
                id = overrideId;
            }
            let newState = {};
            if (formState.initialLoad) {
                newState.initialLoad = false;
            }
            if (id) {
                useFetch(`/api/${manifest.moduleName}/${id}`, GET).then((response) => {
                    formatInitialValuesDatetimeToMoment(response);
                    form.setFieldsValue(response);
                    setFormState(state => ({
                        ...state,
                        ...newState,
                        initialValues: response,
                        loading: false,
                        formDisabled: true,
                    }));
                }).catch((responseErr) => {
                    fetchCatcher.get(responseErr);
                });
            } else {
                if (getInitialValues && formState.initialLoad) {
                    useFetch(`/api/${manifest.moduleName}/initial_values`, GET).then((response) => {
                        formatInitialValuesDatetimeToMoment(response);
                        form.setFieldsValue(response);
                        setFormState(state => ({
                            ...state,
                            ...newState,
                            initialValues: response,
                        }));
                    });
                } else if (formState.initialLoad) {
                    setFormState(state => ({
                        ...state,
                        ...newState
                    }));
                }
            }
        },
        onFinish: (values) => {
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
                        history.push(`/${manifest.moduleName}/${locationId}`);
                    } else {
                        history.push(`/${manifest.moduleName}`);
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
        }
    });

    function setToLoading() {
        setFormState(state => ({
            ...state,
            loading: true
        }));
    }

    function handleFormErrors(responseErr) {
        fetchCatcher.get(responseErr).then((errors) => {
            setFormState(state => ({
                ...state,
                loading: false,
                errors: errors
            }));
        });
    }

    function setFormValuesAndState(response) {
        formatInitialValuesDatetimeToMoment(response);
        form.setFieldsValue(response);
        setFormState(state => ({
            ...state,
            initialLoad: formState.initialLoad && false,
            initialValues: response,
            loading: false,
            formDisabled: true,
        }));
    }

    /**
     * Fetch data once on initial load
     */
    useEffect(() => {
        formActions.fetchData();
    }, []);

    useEffect(() => {
        return () => {
            fetchAbort();
        };
    }, []);

    /**
     * three use effects just for redirect
     * there must be some way to shorten this
     */
    useEffect(() => {
        if (formState.pathname !== location.pathname) {
            setFormState(state => ({
                ...state,
                pathname: location.pathname,
                backtrack: true,
            }));
        }
    });

    useEffect(() => {
        if (formState.backtrack) {
            setFormState((state) => ({
                ...state,
                id: id,
            }));
        }
    }, [formState.pathname]);

    useEffect(() => {
        if (formState.backtrack) {
            formActions.fetchData(formState.id);
        }
    }, [formState.id]);

    return [formState, formActions];
};

export default useFormState;
