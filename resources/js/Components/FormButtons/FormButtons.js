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

const FormButtons = () => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

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
                isShowButton(appContext, formContext.manifest.moduleName, WRITE_ACCESS) &&
                <>
                    {isViewing() && <EditButton/>}
                    {isEditing() && <SaveEditButton/>}
                    {isEditing() && <DiscardEditButton/>}
                </>
            }
            {
                isShowButton(appContext, formContext.manifest.moduleName, CREATE_ACCESS) &&
                <>
                    {isViewing() && <CreateButton/>}
                    {isCreating() && <SaveCreateButton/>}
                    {isCreating() && <DiscardCreateButton/>}
                </>
            }
        </Space>
    )
};

export default FormButtons;
