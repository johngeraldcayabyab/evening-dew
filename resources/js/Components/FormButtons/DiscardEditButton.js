import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"

const DiscardEditButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (formContext.id && !formContext.formState.formDisabled) {
        return (
            <Button
                htmlType={"button"}
                type={"primary"}
                size={'default'}
                onClick={() => {
                    formContext.formActions.toggleEditMode();
                    formContext.form.setFieldsValue(formContext.formState.initialValues);
                }}
            >
                Discard
            </Button>
        )
    }
    return null;
};

export default DiscardEditButton;
