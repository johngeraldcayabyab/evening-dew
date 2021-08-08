import React, {useEffect} from 'react';
import {Button, Form, Input} from "antd";
import {useHistory, useParams} from "react-router-dom";

const UnitOfMeasureCategoryForm = () => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const history = useHistory();

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

        let response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(values)
        });

        let headerLocation = response.headers.get('Location');
        if (headerLocation) {
            history.push(headerLocation);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{required: true, message: 'Please input name!'}]}
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
