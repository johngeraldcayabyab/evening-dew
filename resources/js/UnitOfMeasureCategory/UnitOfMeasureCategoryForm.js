import React, {useEffect} from 'react';
import {Button, Form, Input} from "antd";
import {useParams} from "react-router-dom";
import useFetch from "../Hooks/useFetch";

const UnitOfMeasureCategoryForm = () => {

    let {id} = useParams();

    const [dataSource, setDataSource] = useFetch(`/api/units_of_measure_categories/${id}`);

    const onFinish = async (values) => {
        await fetch(`/api/units_of_measure_categories`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(values)
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log(dataSource);

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={dataSource}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name={"id"}
                hidden
            >
                <Input/>
            </Form.Item>

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
