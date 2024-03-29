import {Button, Col, Row, Space, Steps} from "antd";
import React, {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";


const StatusBar = () => {
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;
    const customButtons = manifest.customButtons ?? [];
    const initialValues = formContext.formState.initialValues;

    const statusButtons = manifest.statuses.filter((status) => {
        if (status.hasOwnProperty('type') && status.visibility[initialValues.status] === 'visible') {
            return status;
        }
    }).map((statusButton, key) => {
        return (
            <Button
                key={statusButton.value}
                htmlType={"submit"}
                type={statusButton.type}
                size={'default'}
                onClick={() => {
                    formContext.form.setFieldsValue({
                        'status': statusButton.value,
                    });
                }}
            >
                {statusButton.label}
            </Button>
        )
    });

    const steps = manifest.statuses.map((status) => ({
        key: `${status.value}-status-step`,
        status: status.status[initialValues.status],
        title: status.title,
    }));

    return (
        <div id={'status-bar'}>
            <Row align={'middle'}>
                <Col span={18}>
                    <Space size={'small'}>
                        {...customButtons}
                        {statusButtons}
                    </Space>
                </Col>
                <Col span={6} style={{textAlign: 'right', paddingRight: '8px'}}>
                    <Steps
                        type="default"
                        size="small"
                        current={initialValues.status}
                        items={steps}
                    />
                </Col>
            </Row>
        </div>
    )
};

export default StatusBar;
