import React from "react";
import {Col} from "antd";

const ColForm = (props) => {
    return (
        <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: props.lg ? props.lg : 12}}
            style={props.style}
        >
            {props.children}
        </Col>
    )
};

export default ColForm;
