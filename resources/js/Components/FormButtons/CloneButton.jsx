import React, {useContext} from 'react';
import {FormContext} from "../../Contexts/FormContext";
import {Button, Popconfirm} from "antd";
import {HAS_FORM_CLONE} from "../../consts"

const CloneButton = () => {
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;
    
    if (!manifest.routes.includes(HAS_FORM_CLONE)) {
        return null;
    }

    function confirm() {
        formContext.formActions.clone();
    }

    return (
        <Popconfirm
            title="Are you sure to clone this data?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <Button size={'default'}>Clone</Button>
        </Popconfirm>
    );
};

export default CloneButton;
