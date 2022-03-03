import {Button, Col, Row, Space, Steps} from "antd";
import React from "react";

const {Step} = Steps;

const StatusBar = (props) => {
    return (
        <div style={{paddingLeft: '16px', paddingRight: '16px', borderBottom: '1px solid #cccccc', background: '#fff'}}>
            <Row align={'middle'} style={{marginTop: '4px', marginBottom: '4px'}}>
                <Col span={18}>
                    <Space size={'small'}>
                        {props.children}
                    </Space>
                </Col>
                <Col span={6} style={{textAlign: 'right', paddingRight: '8px'}}>
                    <Steps
                        type="default"
                        size="small"
                        current={props.current}
                    >
                        {
                            props.statuses.map((status) => (
                                <Step key={status.value} status={status.status} title={status.title}/>
                            ))
                        }
                    </Steps>
                </Col>
            </Row>
        </div>
    )
};

export default StatusBar;
