import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {message} from "antd";

const useInitialValues = (id, form, manifest) => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    useEffect(async () => {
        if (id) {
            let responseData = await fetch(`/api/${manifest.moduleName}/${id}`)
                .then(response => response.json())
                .then(data => (data));
            form.setFieldsValue(responseData);
        }

    }, []);

    const onFinish = async (values) => {
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
        }).catch(error => {
            let status = error.status;
            error.json().then((body) => {
                if (status === 422) {
                    message.warning(body.message);
                } else if (status === 500) {
                    message.error(body.message);
                }
                setErrors(body.errors);
            });
        });
    };

    return [errors, onFinish];
};

export default useInitialValues;
