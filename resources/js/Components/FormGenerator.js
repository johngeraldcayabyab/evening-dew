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
import {snakeToCamel, uuidv4} from "../Helpers/string"
import CustomForm from "./CustomForm"
import React, {useEffect, useState} from "react"
import useOptionHook from "../Hooks/useOptionHook"
import useOptionChad from "../Hooks/useOptionChad"

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);
    const regionOptions = useOptionHook('/api/regions', 'region.region');
    // const [formGeneratorState, setFormGeneratorState] = useState({
    //     fields: [],
    //     options: []
    // });

    // const options = {};
    // manifest.form.fields.forEach(row => {
    //     row.forEach((columns) => {
    //         columns.forEach((field) => {
    //             if (field.type === 'select' && field.query) {
    //                 options[field.query.name] = useOptionChad(field.query.url, field.query.field);
    //             }
    //         });
    //     });
    // });

    useEffect(() => {
        regionOptions.getInitialOptions(formState);
        // manifest.form.fields.forEach(row => {
        //     row.forEach((columns) => {
        //         columns.forEach((field) => {
        //             if (field.type === 'select' && field.query) {
        //                 options[field.query.name].getInitialOptions(formState);
        //             }
        //         });
        //     });
        // });
    }, [formState.initialLoad]);

    const Items = (props) => {
        const fields = props.fields;
        return fields.map((row, key) => {
            if (row === 'divider') {
                return <Divider key={`divider`}/>;
            }
            return (
                <RowForm key={uuidv4()}>
                    {row.map((columns) => (
                        <ColForm key={uuidv4()}>
                            {columns.map((field) => {
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
                                            {...props.shimay}
                                        />
                                    )
                                }
                            })}
                        </ColForm>
                    ))}
                </RowForm>
            );
        });
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
                    <Items fields={manifest.form.fields} shimay={regionOptions}/>
                </FormCard>
            </CustomForm>
        </FormContextProvider>
    );
};

const FieldsGenerated = () => {


};

export default FormGenerator;
