import React from 'react';
import ContactManifest from "./ContactManifest"
import FormGenerator from "../../Components/Form/FormGenerator"

const ContactForm = () => {
    return <FormGenerator {...ContactManifest} />
};

export default ContactForm;
