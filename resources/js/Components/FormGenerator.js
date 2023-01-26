import {useParams} from "react-router-dom"
import {Divider, Form} from "antd"
import useFormHook from "../Hooks/useFormHook"
import {FormContextProvider} from "../Contexts/FormContext";
import CustomBreadcrumb from "./CustomBreadcrumb"
import FormButtons from "./FormButtons/FormButtons"
import NextPreviousRecord from "./NextPreviousRecord"
import ControlPanel from "./ControlPanel"
import RowForm from "./Grid/RowForm"
import ColForm from "./Grid/ColForm"
import FormItemText from "./FormItem/FormItemText"
import FormItemNumber from "./FormItem/FormItemNumber"
import FormItemSelect from "./FormItem/FormItemSelect"
import FormCard from "./FormCard"
import {snakeToCamel, uuidv4} from "../Helpers/string"
import CustomForm from "./CustomForm"
import React, {useEffect} from "react"
import useOptionHook from "../Hooks/useOptionHook"

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);

    const urlQueries = manifest.form.urlQueries;

    const options = {};
    urlQueries.forEach((urlQuery) => {
        const module = snakeToCamel(urlQuery.query.split('.')[0]);
        options[module] = useOptionHook(urlQuery.url, urlQuery.query);
    });



    useEffect(() => {
        for (const option in options) {
            options[option].getInitialOptions(formState);
        }
    }, [formState.initialLoad]);

    const fields = manifest.form.fields.map((row) => {
        if (row === 'divider') {
            return <Divider key={uuidv4()}/>;
        }
        return (
            <RowForm key={uuidv4()}>
                {row.map((columns) => {
                    return (
                        <ColForm key={uuidv4()}>
                            {columns.map((field) => {
                                return fielder(field);
                            })}
                        </ColForm>
                    )
                })}
            </RowForm>
        );
    });


    function fielder(field) {
        if (field.type === 'text') {
            return (
                <FormItemText
                    key={uuidv4()}
                    {...field}
                />
            )
        }
        if (field.type === 'number') {
            return (
                <FormItemNumber
                    key={uuidv4()}
                    {...field}
                />
            )
        }
        if (field.type === 'select') {
            if (field.query) {
                const properties = {
                    ...field,
                    ...options[field.query]
                }
                return (
                    <FormItemSelect
                        key={uuidv4()}
                        {...properties}
                    />
                )
            }
            console.log('may');
            return (
                <FormItemSelect
                    key={uuidv4()}
                    {...field}
                />
            )
        }
        return '';
    }

    return (
        <FormContextProvider
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
                    {fields}
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

export default FormGenerator;
