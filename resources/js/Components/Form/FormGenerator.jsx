import {useNavigate, useParams} from "react-router-dom"
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
import {GET} from "../../consts"

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);
    const useFetch = useFetchHook();
    const [state, setState] = useState({
        ...manifest.initialState,
        id: id
    });
    const navigate = useNavigate();

    let customQueries = [];
    const options = {};
    const onChangeValuesFunctions = [];
    loopThroughObjRecurs(manifest.form, (key, value, object) => {
        if (object.hasOwnProperty('fields')) {
            object.fields.map((lineField) => {
                lineField['listName'] = object.listName;
            });
        }
        if (object.hasOwnProperty('query')) {
            customQueries.push(object);
        }
        if (object.hasOwnProperty('onValueChange')) {
            onChangeValuesFunctions.push(object);
        }
    });


    customQueries.forEach((field) => {
        const fieldName = field.name.replace('_id', '');
        const query = field.query;
        const params = query.hasOwnProperty('params') ? query.params : {};
        if (field.hasOwnProperty('listName')) {
            options[`${field.name}-lineOptions`] = useOptionLineHook(query.url, `${fieldName}.${query.field}`, field.listName, params);
        } else {
            options[`${field.name}-options`] = useOptionHook(query.url, `${fieldName}.${query.field}`, params);
        }
    });

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
        navigate: navigate
    };

    if (onChangeValuesFunctions.length) {
        formContextProviderValues['onChangeValuesFunctions'] = onChangeValuesFunctions;
    }

    /*
    * TODO - fix double rendering due to deps
    * */
    useEffect(() => {
        for (const option in options) {
            options[option].getInitialOptions(formState);
        }

        if (!formState.initialLoad) {
            if (manifest.initialState && manifest.initialState.hasOwnProperty('queries')) {
                const queries = manifest.initialState.queries;
                for (let key in queries) {
                    if (queries.hasOwnProperty(key)) {
                        useFetch(queries[key].url, GET, queries[key].params).then(response => {
                            const options = response.data.map((data) => ({
                                ...data,
                                value: data.id,
                                label: data.slug
                            }));
                            const theState = state;
                            state.queries[key].options = options;
                            setState((prevState) => ({
                                ...prevState,
                                ...theState
                            }))
                        });
                    }
                }
            }
        }

        // if (manifest && manifest.form && manifest.form.afterRender) {
        //     manifest.form.afterRender(formContextProviderValues);
        // }

    }, [formState.initialLoad]);


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
