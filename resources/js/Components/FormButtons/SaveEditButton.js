import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";

const SaveEditButton = () => {
    const formContext = useContext(FormContext);

    function isEditing() {
        return formContext.id && !formContext.formState.formDisabled;
    }

    if (!isEditing()) {
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

export default SaveEditButton;
