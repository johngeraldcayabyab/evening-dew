import React from "react";
import {Row} from "antd";

const RowForm = (props) => {
    return (
        <Row
            gutter={48}
        >
            {props.children}
        </Row>
    )
};

export default RowForm;
