import React from 'react';
import UserManifest from "./UserManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const UserForm = () => {
    return <FormGenerator {...UserManifest} />;
};

export default UserForm;
