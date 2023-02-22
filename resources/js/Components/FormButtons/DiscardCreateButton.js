import {Button} from "antd";
import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {FormContext} from "../../Contexts/FormContext";

const DiscardCreateButton = () => {
    const formContext = useContext(FormContext);

    return (
        <Button
            htmlType={"button"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${formContext.manifest.displayName}`}>
                Discard
            </Link>
        </Button>
    );
};

export default DiscardCreateButton;
