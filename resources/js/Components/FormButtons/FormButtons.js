import React, {useContext} from 'react';
import EditButton from "./EditButton";
import SaveEditButton from "./SaveEditButton";
import DiscardEditButton from "./DiscardEditButton";
import CreateButton from "./CreateButton";
import SaveCreateButton from "./SaveCreateButton";
import DiscardCreateButton from "./DiscardCreateButton";
import {Space} from "antd";
import {AppContext} from "../../App"
import {FormContext} from "../../Contexts/FormContext"
import {isShowButton} from "../../Helpers/object"
import {CREATE_ACCESS, WRITE_ACCESS} from "../../consts"

const FormButtons = (props) => {
    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);

    return (
        <Space size={'small'}>
            {
                isShowButton(appContext, formContext.manifest.moduleName, WRITE_ACCESS) &&
                <>
                    <EditButton/>
                    <SaveEditButton/>
                    <DiscardEditButton/>
                </>
            }
            {
                isShowButton(appContext, formContext.manifest.moduleName, CREATE_ACCESS) &&
                <>
                    <CreateButton/>
                    <SaveCreateButton/>
                    <DiscardCreateButton/>
                </>
            }
        </Space>
    )
};

export default FormButtons;
