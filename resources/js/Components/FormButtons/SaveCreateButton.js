import {Button} from "antd";
import {useContext} from "react";
import {FormContext} from "../../Contexts/FormContext";
import {AppContext} from "../../App"
import {isShowButton} from "../../Helpers/object"
import {CREATE_ACCESS} from "../../consts"

const SaveCreateButton = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    if (!isShowButton(appContext, formContext.manifest.moduleName, CREATE_ACCESS)) {
        return null;
    }

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
