import React from 'react';
import SequenceManifest from "./SequenceManifest"
import FormGenerator from "../../Components/FormGenerator"

const SequenceForm = () => {
    return <FormGenerator {...SequenceManifest}/>
};

export default SequenceForm;
