import React from 'react';
import {Button, Col, Row} from "antd";
import CustomBreadcrumb from "./CustomBreadcrumb";

const ControlPanel = (props) => {
    return (
        <div style={{padding: '5px 16px', borderBottom: '1px solid #cccccc', background: '#fff'}}>
            <Row align={'middle'} style={{marginTop: '5px', marginBottom: '5px'}}>
                <Col span={12}>
                    <CustomBreadcrumb/>
                </Col>
                <Col span={12}>
                    {props.topRight}
                </Col>
            </Row>
            <Row align={'middle'} style={{marginTop: '5px', marginBottom: '5px'}}>
                <Col span={12}>
                    {props.bottomLeft}
                </Col>
                <Col span={12}>
                    {props.bottomRight}
                </Col>
            </Row>
        </div>
    )
}

export default ControlPanel;
