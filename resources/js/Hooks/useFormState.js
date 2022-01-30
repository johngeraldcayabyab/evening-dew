import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {message} from "antd";
import {fetchGet, fetchPost, fetchPut} from "../Helpers/fetcher";
import useFetchCatcher from "./useFetchCatcher";
import useFetchHook from "./useFetchHook";
import {GET} from "../consts";

const useFormState = (id, form, manifest) => {
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
        pathname: location.pathname
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
                        initialLoad: false
                    };
                    setFormState(state => ({
                        ...state,
                        ...newState
                    }));
                }).catch((responseErr) => {
                    fetchCatcher.get(responseErr);
                });
            } else {
                setFormState(state => ({
                    ...state,
                    ...newState
                }));
            }
        },
        onFinish: async (values) => {
            setFormState(state => ({
                ...state,
                loading: true
            }));


            if (id) {
                await fetchPut(`/api/${manifest.moduleName}/${id}`, values).then(() => {
                    formActions.fetchData();
                }).catch(error => {
                    fetchCatcher.get(error).then((errors) => {
                        setFormState(state => ({
                            ...state,
                            loading: false,
                            errors: errors
                        }));
                    });
                });
            } else {
                await fetchPost(`/api/${manifest.moduleName}`, values).then(result => {
                    let headerLocation = result.headers.get('Location');
                    if (headerLocation) {
                        let locationId = headerLocation.split('/').pop();
                        history.push(`/${manifest.moduleName}/${locationId}`);
                    }
                }).catch(error => {
                    fetchCatcher.get(error).then((errors) => {
                        setFormState(state => ({
                            ...state,
                            loading: false,
                            errors: errors
                        }));
                    });
                });
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
