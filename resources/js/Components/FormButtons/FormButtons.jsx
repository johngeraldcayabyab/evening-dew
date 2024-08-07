import React, {useContext} from 'react';
import EditButton from "./EditButton";
import SaveEditButton from "./SaveEditButton";
import DiscardEditButton from "./DiscardEditButton";
import CreateButton from "./CreateButton";
import SaveCreateButton from "./SaveCreateButton";
import DiscardCreateButton from "./DiscardCreateButton";
import {Space} from "antd";
import {FormContext} from "../../Contexts/FormContext"
import {isShowButton} from "../../Helpers/object"
import {CREATE_ACCESS, WRITE_ACCESS} from "../../consts"
import {AppContext} from "../../Contexts/AppContext"
import CloneButton from "./CloneButton"

const FormButtons = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);
    const manifest = formContext.manifest;

    function isViewing() {
        return !!(formContext.id && formContext.formState.formDisabled);
    }

    function isCreating() {
        return !formContext.id && !formContext.formState.formDisabled;
    }

    function isEditing() {
        return formContext.id && !formContext.formState.formDisabled;
    }

    return (
        <Space size={'small'}>
            {
                isShowButton(appContext, manifest.moduleName, WRITE_ACCESS) &&
                <>
                    {isViewing() && <EditButton/>}
                    {isEditing() && <SaveEditButton/>}
                    {isEditing() && <DiscardEditButton/>}
                </>
            }
            {
                isShowButton(appContext, manifest.moduleName, CREATE_ACCESS) &&
                <>
                    {isViewing() && <CreateButton/>}
                    {isCreating() && <SaveCreateButton/>}
                    {isCreating() && <DiscardCreateButton/>}
                </>
            }
            <CloneButton/>
        </Space>
    )
};

export default FormButtons;
