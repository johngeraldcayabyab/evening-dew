import React from 'react';
import {Tabs} from "antd";
import TransferManifest from "./TransferManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const TransferForm = () => {
    return <FormGenerator {...TransferManifest} />
};

export default TransferForm;
