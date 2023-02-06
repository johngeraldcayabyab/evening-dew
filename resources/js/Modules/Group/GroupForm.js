import React from 'react';
import GroupManifest from "./GroupManifest"
import FormGenerator from "../../Components/Form/FormGenerator";

const GroupForm = () => {
    return <FormGenerator {...GroupManifest} />
};

export default GroupForm;
