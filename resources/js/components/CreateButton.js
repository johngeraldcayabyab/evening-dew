import {Button} from "antd";
import React from 'react';
import {Link} from 'react-router-dom';

const CreateButton = (props) => {
    if (props.id && props.formState.formDisabled) {
        return (
            <Button
                htmlType={"submit"}
                type={"primary"}
                className={"custom-button"}
                size={'small'}
            >
                <Link to={`/${props.manifest.moduleName}/create`}>
                    Create
                </Link>
            </Button>
        )
    }
    return null;
};

export default CreateButton;
