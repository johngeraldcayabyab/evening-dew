import {useParams} from "react-router-dom"
import {Form} from "antd"
import useFormHook from "../../Hooks/useFormHook"
import {FormContextProvider} from "../../Contexts/FormContext";
import CustomBreadcrumb from "../CustomBreadcrumb"
import FormButtons from "../FormButtons/FormButtons"
import NextPreviousRecord from "../NextPreviousRecord"
import ControlPanel from "../ControlPanel"
import FormCard from "../FormCard"
import CustomForm from "../CustomForm"
import React, {useEffect} from "react"
import useOptionHook from "../../Hooks/useOptionHook"
import FormItems from "./FormItems"

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);

    const urlQueries = [];

    for (let rowKey of Object.keys(manifest.form)) {
        const row = manifest.form[rowKey];
        for (let colKey of Object.keys(row)) {
            for (let colKey of Object.keys(row)) {
                const col = row[colKey];
                col.forEach((field) => {
                    if (field.hasOwnProperty('query')) {
                        urlQueries.push(field.query);
                    }
                });
            }
        }
    }
    const options = {};
    urlQueries.forEach((urlQuery) => {
        options[urlQuery.name] = useOptionHook(urlQuery.url, urlQuery.field);
    });

    useEffect(() => {
        for (const option in options) {
            options[option].getInitialOptions(formState);
        }
    }, [formState.initialLoad]);

    return (<FormContextProvider
        value={{
            id: id,
            manifest: manifest,
            form: form,
            formState: formState,
            formActions: formActions,
            onFinish: formActions.onFinish
        }}
    >
        <CustomForm>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                bottomColOneLeft={<FormButtons/>}
                bottomColTwoRight={<NextPreviousRecord/>}
            />
            <FormCard>
                <FormItems formItems={manifest.form} options={options}/>
            </FormCard>
        </CustomForm>
    </FormContextProvider>);
};

export default FormGenerator;
