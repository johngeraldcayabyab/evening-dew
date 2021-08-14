import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {message} from "antd";

const useFormState = (id, form, manifest) => {
    const history = useHistory();

    const [formState, setFormState] = useState({
        loading: id && true,
        errors: {}
    });

    const [formActions] = useState({
        fetchData: async () => {
            if (id) {
                let responseData = await fetch(`/api/${manifest.moduleName}/${id}`)
                    .then(response => response.json())
                    .then(data => (data));
                form.setFieldsValue(responseData);
                setFormState(state => ({
                    ...state,
                    loading: false
                }))
            }
        },
        onFinish: async (values) => {
            setFormState(state => ({
                ...state,
                loading: true
            }));
            let url = `/api/${manifest.moduleName}/`;
            let method = 'POST';
            if (id) {
                url += id;
                method = 'PUT';
            }
            await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: method,
                body: JSON.stringify(values)
            }).then(response => {
                if (response.ok) {
                    return response;
                }
                throw response;
            }).then(result => {
                let headerLocation = result.headers.get('Location');
                if (headerLocation) {
                    history.push(headerLocation);
                }
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
                        errors: body.errors
                    }));
                });
            });
        }
    });

    useEffect(formActions.fetchData, []);


    return [formState, formActions];
};

export default useFormState;
