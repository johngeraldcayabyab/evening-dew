import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message} from "antd";
import {useHistory, useParams} from "react-router-dom";

const UnitOfMeasureCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    useEffect(async () => {
        if (id) {
            let responseData = await fetch(`/api/units_of_measure_categories/${id}`)
                .then(response => response.json())
                .then(data => (data));
            form.setFieldsValue(responseData);
        }
    }, []);

    const onFinish = async (values) => {
        let url = `/api/units_of_measure_categories/`;
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

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                validateStatus={errors.name ? 'error' : false}
                help={errors.name ? errors.name : false}
                rules={[{required: true, message: 'Please input measure name'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UnitOfMeasureCategoryForm;
