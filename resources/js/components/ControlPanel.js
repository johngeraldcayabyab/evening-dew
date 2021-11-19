import React from 'react';
import {Button, Col, Row} from "antd";
import CustomBreadcrumb from "./CustomBreadcrumb";

const ControlPanel = (props) => {
    return (
        <div style={{padding: '5px 16px', borderBottom: '1px solid #cccccc', background: '#fff'}}>
            <Row align={'middle'} style={{marginTop: '5px', marginBottom: '5px'}}>
                <Col span={6}>
                    <CustomBreadcrumb/>
                </Col>
                <Col span={6}>
                    {props.topRight}
                </Col>
                <Col span={6}>
                    {props.topRight}
                </Col>
                <Col span={6}>
                    {props.topRight}
                </Col>
            </Row>
            <Row align={'middle'} style={{marginTop: '5px', marginBottom: '5px'}}>
                <Col span={6}>
                    {props.bottomLeft}
                </Col>
                <Col span={6}>
                    {props.bottomRight}
                </Col>
                <Col span={6}>
                    {props.bottomRight}
                </Col>
                <Col span={6}>
                    {props.bottomRight}
                </Col>
            </Row>
        </div>
    )
}

export default ControlPanel;
