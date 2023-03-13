import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {HAS_FORM_UPDATE} from "../../consts"

const DiscardEditButton = () => {
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;

    if (!manifest.routes.includes(HAS_FORM_UPDATE)) {
        return null;
    }

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
