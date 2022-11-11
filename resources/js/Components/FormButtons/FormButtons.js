import React from 'react';
import EditButton from "./EditButton";
import SaveEditButton from "./SaveEditButton";
import DiscardEditButton from "./DiscardEditButton";
import FormCreateButton from "./FormCreateButton";
import SaveCreateButton from "./SaveCreateButton";
import DiscardCreateButton from "./DiscardCreateButton";
import {Space} from "antd";

const FormButtons = (props) => {
    return (
        <Space size={'small'}>
            <EditButton/>
            <SaveEditButton/>
            <DiscardEditButton/>
            <FormCreateButton/>
            <SaveCreateButton/>
            <DiscardCreateButton/>
        </Space>
    )
};

export default FormButtons;
