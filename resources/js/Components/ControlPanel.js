import React from 'react';
import {Col, Row} from "antd";

const ControlPanel = (props) => {
    return (
        <div style={{padding: '5px 16px', borderBottom: '1px solid #cccccc', background: '#fff'}}>
            <Row align={'middle'} style={{marginTop: '5px', marginBottom: '5px'}}>
                <Col span={6}>
                    {props.topColOneLeft}
                </Col>
                <Col span={6} style={{textAlign: 'right'}}>
                    {props.topColOneRight}
                </Col>
                <Col span={12}>
                    {props.topColTwoRight}
                </Col>
            </Row>
            <Row align={'middle'} style={{marginTop: '5px', marginBottom: '5px'}}>
                <Col span={6}>
                    {props.bottomColOneLeft}
                </Col>
                <Col span={6} style={{textAlign: 'right'}}>
                    {props.bottomColOneRight}
                </Col>
                <Col span={6}>
                    {props.bottomColTwoLeft}
                </Col>
                <Col span={6} style={{textAlign: 'right'}}>
                    {props.bottomColTwoRight}
                </Col>
            </Row>
        </div>
    )
}

export default ControlPanel;
