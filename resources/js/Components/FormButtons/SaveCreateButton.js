import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"

const SaveCreateButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (!formContext.id && !formContext.formState.formDisabled) {
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

export default SaveCreateButton;
