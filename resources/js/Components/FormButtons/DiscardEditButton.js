import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"
import {isShowButton} from "../../Helpers/object"
import {WRITE_ACCESS} from "../../consts"

const DiscardEditButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (!isShowButton(appContext, formContext.manifest.moduleName, WRITE_ACCESS)) {
        return null;
    }

    function isEditing() {
        return formContext.id && !formContext.formState.formDisabled;
    }

    if (!isEditing()) {
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
