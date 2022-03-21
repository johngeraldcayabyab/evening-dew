import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";

const SaveEditButton = () => {
    const formContext = useContext(FormContext);

    if (formContext.id && !formContext.formState.formDisabled) {
        return (
            <Button
                htmlType={"submit"}
                type={"primary"}
                size={'default'}
            >
                Save
            </Button>
        )
    }
    return null;
};

export default SaveEditButton;
