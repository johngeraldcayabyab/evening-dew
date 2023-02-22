import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";

const DiscardEditButton = () => {
    const formContext = useContext(FormContext);

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
    );
};

export default DiscardEditButton;
