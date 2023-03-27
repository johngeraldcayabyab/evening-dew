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
import React, {useEffect, useState} from "react"
import useOptionHook from "../../Hooks/useOptionHook"
import useOptionLineHook from "../../Hooks/useOptionLineHook"
import FormItems from "./FormItems"
import FormLinks from "../FormLinks";
import useFetchHook from "../../Hooks/useFetchHook"
import StatusBar from "../StatusBar"
import {loopThroughObjRecurs} from "../../Helpers/object"

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);
    const useFetch = useFetchHook();
    const [state, setState] = useState(manifest.initialState);
    let urlQueries = [];
    const options = {};

    loopThroughObjRecurs(manifest.form, (key, value, object) => {
        if (object.hasOwnProperty('query')) {
            urlQueries.push(object);
        }
    });

    urlQueries = urlQueries.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.place === value.place && t.name === value.name
            ))
    );

    urlQueries.forEach((field) => {
        const tableField = field.name.replace('_id', '');
        if (field.hasOwnProperty('listName')) {
            options[`${field.name}-lineOptions`] = useOptionLineHook(field.query.url, `${tableField}.${field.query.field}`, field.listName);
        } else {
            options[`${field.name}-options`] = useOptionHook(field.query.url, `${tableField}.${field.query.field}`);
        }
    });

    useEffect(() => {
        for (const option in options) {
            options[option].getInitialOptions(formState);
        }
    }, [formState.initialLoad]);

    const formContextProviderValues = {
        id: id,
        manifest: manifest,
        form: form,
        formState: formState,
        formActions: formActions,
        onFinish: formActions.onFinish,
        useFetch: useFetch,
        options: options,
        state: state,
        setState: setState,
    };

    if (manifest.form.hasOwnProperty('onValuesChange')) {
        formContextProviderValues['onValuesChange'] = manifest.form.onValuesChange;
    }

    return (
        <FormContextProvider
            value={formContextProviderValues}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                    bottomColTwoRight={<NextPreviousRecord/>}
                />
                {manifest.statuses && <StatusBar/>}
                <FormCard>
                    {manifest.formLinks && <FormLinks/>}
                    <FormItems/>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default FormGenerator;
