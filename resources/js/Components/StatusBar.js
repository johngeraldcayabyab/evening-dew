import {Button, Col, Row, Space, Steps} from "antd";
import React, {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";

const {Step} = Steps;

const StatusBar = (props) => {
    const formContext = useContext(FormContext);

    let statusButtons = [];
    props.statuses.forEach((status) => {
        if (status.hasOwnProperty('type') && status.visibility[formContext.formState.initialValues.status] === 'visible') {
            statusButtons.push(status);
        }
    });
    return (
        <div style={{paddingLeft: '16px', paddingRight: '16px', borderBottom: '1px solid #cccccc', background: '#fff'}}>
            <Row align={'middle'} style={{marginTop: '4px', marginBottom: '4px'}}>
                <Col span={18}>
                    <Space size={'small'}>
                        {statusButtons.map((statusButton, key) => {
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
                        })}
                    </Space>
                </Col>
                <Col span={6} style={{textAlign: 'right', paddingRight: '8px'}}>
                    <Steps
                        type="default"
                        size="small"
                        current={formContext.formState.initialValues.status}
                    >
                        {
                            props.statuses.map((status) => (
                                <Step key={status.value} status={status.status[formContext.formState.initialValues.status]}
                                      title={status.title}/>
                            ))
                        }
                    </Steps>
                </Col>
            </Row>
        </div>
    )
};

export default StatusBar;
