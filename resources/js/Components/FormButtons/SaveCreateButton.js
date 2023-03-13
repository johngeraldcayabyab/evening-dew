import {Button} from "antd";
import {HAS_FORM_CREATE} from "../../consts"
import {useContext} from "react"
import {FormContext} from "../../Contexts/FormContext"

const SaveCreateButton = () => {
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;

    if (!manifest.routes.includes(HAS_FORM_CREATE)) {
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
