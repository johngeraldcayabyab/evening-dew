import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";

const SaveCreateButton = () => {
    const formContext = useContext(FormContext);

    function isCreating() {
        return !formContext.id && !formContext.formState.formDisabled;
    }

    if (isCreating()) {
        return null;
    }

    return (
        <Button
            htmlType={"submit"}
            type={"primary"}
            size={'default'}
        >
            Save
        </Button>
    );
};

export default SaveCreateButton;
