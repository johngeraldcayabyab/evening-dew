import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {message} from "antd";
import {fetchGet, fetchPost, fetchPut} from "../Helpers/fetcher";

const useFormState = (id, form, manifest) => {
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
        fetchData: async (overrideId = null) => {
            if (overrideId) {
                id = overrideId;
            }
            let newState = {};
            if (formState.initialLoad) {
                newState.initialLoad = false;
            }
            if (id) {
                let responseData = await fetchGet(`/api/${manifest.moduleName}/${id}`)
                    .then(response => response.json())
                    .then(data => (data));
                form.setFieldsValue(responseData);
                newState = {
                    initialValues: responseData,
                    loading: false,
                    formDisabled: true,
                    initialLoad: false
                };
            }
            setFormState(state => ({
                ...state,
                ...newState
            }));
        },
        onFinish: async (values) => {
            setFormState(state => ({
                ...state,
                loading: true
            }));

            if (id) {
                await fetchPut(`/api/${manifest.moduleName}/${id}`, values)
                    .then(() => {
                        formActions.fetchData();
                    }).catch(error => {
                        let status = error.status;
                        error.json().then((body) => {
                            if (status === 422) {
                                message.warning(body.message);
                            } else if (status === 500) {
                                message.error(body.message);
                            }
                            setFormState(state => ({
                                ...state,
                                loading: false,
                                errors: body.errors
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
                    let status = error.status;
                    error.json().then((body) => {
                        if (status === 422) {
                            message.warning(body.message);
                        } else if (status === 500) {
                            message.error(body.message);
                        }
                        setFormState(state => ({
                            ...state,
                            loading: false,
                            errors: body.errors
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
