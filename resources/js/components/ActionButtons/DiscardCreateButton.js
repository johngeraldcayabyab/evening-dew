import {Button} from "antd";
import React from 'react';
import {Link} from "react-router-dom";

const DiscardCreateButton = (props) => {
    if (!props.id && !props.formState.formDisabled) {
        return (
            <Button
                htmlType={"button"}
                type={"primary"}
                // className={"custom-button"}
                size={'default'}
            >
                <Link to={`/${props.manifest.moduleName}`}>
                    Discard
                </Link>
            </Button>
        )
    }
    return null;
};

export default DiscardCreateButton;
