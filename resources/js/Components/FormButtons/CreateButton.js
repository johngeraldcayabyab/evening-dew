import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import {Link} from "react-router-dom";
import {Button} from "antd";

const CreateButton = () => {
    const formContext = useContext(FormContext);

    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            <Link to={`/${formContext.manifest.displayName}/create`}>
                Create
            </Link>
        </Button>
    );
};

export default CreateButton;
