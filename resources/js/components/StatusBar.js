import {Button, Col, Row, Space, Steps} from "antd";
import React from "react";

const {Step} = Steps;

const StatusBar = (props) => {
    return (
        <div style={{paddingLeft: '16px', paddingRight: '16px', borderBottom: '1px solid #cccccc', background: '#fff'}}>
            <Row align={'middle'} style={{marginTop: '4px', marginBottom: '4px'}}>
                <Col span={18}>
                    <Space size={'small'}>
                        <Button
                            htmlType={"submit"}
                            type={"primary"}
                            size={'default'}
                            onClick={() => {
                                props.form.setFieldsValue({
                                    'status': 'done',
                                });
                            }}
                        >
                            Validate
                        </Button>
                        <Button
                            htmlType={"submit"}
                            type={"ghost"}
                            size={'default'}
                            onClick={() => {
                                props.form.setFieldsValue({
                                    'status': 'cancelled',
                                });
                            }}
                        >
                            Cancel
                        </Button>
                    </Space>
                </Col>
                <Col span={6} style={{textAlign: 'right', paddingRight: '8px'}}>
                    <Steps
                        type="default"
                        size="small"
                        current={0}
                    >
                        <Step status="process" title="Draft"/>
                        <Step status="wait" title="Done"/>
                        <Step status="wait" title="Cancelled"/>
                    </Steps>
                </Col>
            </Row>
        </div>
    )
};

export default StatusBar;
