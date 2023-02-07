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
import FormLinks from "../FormLinks";

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);

    const urlQueries = [];
    const lineUrlQueries = [];

    const options = {};
    const lineOptions = {};

    function getTabPaneItemQuery(tab, tabKey, tabPaneKey) {
        for (let tabPaneItem of Object.keys(tab[tabPaneKey])) {
            if (tabPaneItem.includes('row')) {
                getRowQuery(tab[tabPaneKey][tabPaneItem]);
            }
        }
    }

    function getTabPaneQuery(tab, tabKey) {
        for (let tabPaneKey of Object.keys(tab)) {
            if (tabPaneKey.includes('tab_pane')) {
                getTabPaneItemQuery(tab, tabKey, tabPaneKey);
            }
        }
    }

    function getTabQuery(tab, tabKey) {
        getTabPaneQuery(tab, tabKey);
    }

    function getFieldQuery(fields) {
        fields.map((field) => {
            if (field.hasOwnProperty('query')) {
                urlQueries.push(field);
            }
        });
    }

    function getColumnQuery(row) {
        for (let columnKey of Object.keys(row)) {
            const fields = row[columnKey];
            getFieldQuery(fields);
        }
    }

    function getRowQuery(row) {
        getColumnQuery(row);
    }

    function getLineQuery(fields) {
        fields.map((field) => {
            if (field.hasOwnProperty('query')) {
                lineUrlQueries.push(field);
            }
        });
    }

    for (let itemKey of Object.keys(manifest.form)) {
        const item = manifest.form[itemKey];
        if (itemKey.includes('row')) {
            getRowQuery(item);
        }
        if (itemKey.includes('tab')) {
            getTabQuery(item, itemKey);
        }
        if (itemKey.includes('line')) {
            getLineQuery(item.fields);
            // console.log(item, itemKey);
        }
    }

    urlQueries.forEach((field) => {
        options[`${field.name}-options`] = useOptionHook(field.query.url, field.query.field);
    });

    lineUrlQueries.forEach((field) => {

    });

    // lineUrlQueries.forEach


    useEffect(() => {
        for (const option in options) {
            options[option].getInitialOptions(formState);
        }
        for (const lineOption in lineOptions) {
            lineOption.getInitialOptions(formState, lineOption.listName);
            // options[option].getInitialOptions(formState);
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
                {manifest.formLinks && <FormLinks links={manifest.formLinks}/>}
                <FormItems formItems={manifest.form} options={options}/>
            </FormCard>
        </CustomForm>
    </FormContextProvider>);
};

export default FormGenerator;
