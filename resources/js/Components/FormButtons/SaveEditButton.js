import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"
import {isShowButton} from "../../Helpers/object"
import {WRITE_ACCESS} from "../../consts"

const SaveEditButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (!isShowButton(appContext, formContext.manifest.moduleName, WRITE_ACCESS)) {
        return null;
    }

    function isEditing() {
        if (formContext.id && !formContext.formState.formDisabled) {
            return true;
        }
        return false;
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
