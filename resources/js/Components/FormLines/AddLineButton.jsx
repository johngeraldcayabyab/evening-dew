import {Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";

const AddLineButton = (props) => {
    const formContext = useContext(FormContext);

    return (
        <Form.Item>
            {!formContext.formState.formDisabled &&
            <Button
                type="dashed"
                onClick={() => {
                    props.add();
                }}
                block
                icon={<PlusOutlined/>}
            >
                {props.label}
            </Button>}
        </Form.Item>
    )
}

export default AddLineButton;
