import React from "react";
import {Row} from "antd";

const RowForm = (props) => {
    return (
        <Row
            gutter={[8, 8]}
            align={props.align ? props.align : 'top'}
        >
            {props.children}
        </Row>
    )
};

export default RowForm;
