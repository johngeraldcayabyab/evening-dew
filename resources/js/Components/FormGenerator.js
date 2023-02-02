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
import FormItemSelectChad from "./FormItem/FormItemSelectChad"
import FormCard from "./FormCard"
import CustomForm from "./CustomForm"
import React, {useEffect, useState} from "react"
import useOptionHook from "../Hooks/useOptionHook"
import useOptionChad from "../Hooks/useOptionChad"

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);

    const regionOptions = useOptionHook('/api/regions', 'region.region');


    useEffect(() => {
        regionOptions.getInitialOptions(formState);
    }, [formState.initialLoad]);


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
                    <Items formItems={manifest.form} regionOptions={regionOptions}/>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

const Items = React.memo((props) => {
    const formItems = props.formItems;
    const rows = [];
    for (let rowKey of Object.keys(formItems)) {

        const row = formItems[rowKey];

        const cols = [];

        rows.push(
            <RowForm key={rowKey}>
                {cols}
            </RowForm>
        );

        for (let colKey of Object.keys(row)) {
            const col = row[colKey];
            cols.push(
                <ColForm key={`${rowKey}-${colKey}`}>
                    {col.map((field) => {
                        if (field.type === 'text') {
                            return (
                                <FormItemText
                                    key={field.name}
                                    {...field}
                                />
                            )
                        }
                        if (field.type === 'number') {
                            return (
                                <FormItemNumber
                                    key={field.name}
                                    {...field}
                                />
                            )
                        }
                        if (field.type === 'select') {
                            return (
                                <FormItemSelectChad
                                    key={field.name}
                                    {...field}
                                    {...props.regionOptions}
                                />
                            )
                        }
                    })}
                </ColForm>
            );
        }
    }
    return rows;
});

export default FormGenerator;
