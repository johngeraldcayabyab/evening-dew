import {useEffect, useState} from "react";
import {Form} from "antd";

const useForm = (url) => {
    const [form] = Form.useForm();
    // const [initialValues, setInitialValues] = useState({});

    useEffect(async () => {
        let responseData = await fetch(url)
            .then(response => response.json())
            .then(data => (data));
        form.setFieldsValue(responseData);
    }, []);

    return form;
};

export default useForm;
