import React from "react";
import {Row} from "antd";

const RowForm = (props) => {
    return (
        <Row
            gutter={[8, 8]}
        >
            {props.children}
        </Row>
    )
};

export default RowForm;
