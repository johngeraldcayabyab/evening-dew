import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import useFetchCatcher from "./useFetchCatcher";
import useFetchHook from "./useFetchHook";
import {GET, POST, PUT} from "../consts";

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
        updated: false,
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
                    form.setFieldsValue(response);
                    newState = {
                        initialValues: response,
                        loading: false,
                        formDisabled: true,
                        initialLoad: false,
                        updated: new Date()
                    };
                    setFormState(state => ({
                        ...state,
                        ...newState
                    }));
                }).catch((responseErr) => {
                    fetchCatcher.get(responseErr);
                });
            } else {
                if (getInitialValues && formState.initialLoad) {
                    useFetch(`/api/${manifest.moduleName}/initial_values`, GET).then((response) => {
                        form.setFieldsValue(response);
                        setFormState(state => ({
                            ...state,
                            initialLoad: false,
                            initialValues: response,
                        }));
                    });
                } else if (formState.initialLoad) {
                    setFormState(state => ({
                        ...state,
                        initialLoad: false,
                    }));
                }
            }
        },
        onFinish: (values, hooks = false) => {
            setFormState(state => ({
                ...state,
                loading: true
            }));
            if (id) {
                useFetch(`/api/${manifest.moduleName}/${id}`, PUT, values).then(() => {
                    formActions.fetchData();
                }).catch((responseErr) => {
                    fetchCatcher.get(responseErr).then((errors) => {
                        setFormState(state => ({
                            ...state,
                            loading: false,
                            errors: errors,
                        }));
                    });
                });
            } else {
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
                    fetchCatcher.get(responseErr).then((errors) => {
                        setFormState(state => ({
                            ...state,
                            loading: false,
                            errors: errors
                        }));
                    });
                });
            }
            if (hooks) {
                hooks();
            }
        },
        toggleEditMode: () => {
            setFormState(state => ({
                ...state,
                formDisabled: state.formDisabled !== true
            }));
        }
    });

    useEffect(formActions.fetchData, []);

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
