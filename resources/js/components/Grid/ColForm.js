import React from "react";
import {Col} from "antd";

const ColForm = (props) => {
    return (
        <Col
            xs={{span: 24}}
            sm={{span: 24}}
            md={{span: 24}}
            lg={{span: 12}}
        >
            {props.children}
        </Col>
    )
};

export default ColForm;
