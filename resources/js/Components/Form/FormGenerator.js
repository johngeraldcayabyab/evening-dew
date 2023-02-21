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
import useFetchCatcherHook from "../../Hooks/useFetchCatcherHook"
import StatusBar from "../StatusBar"

const FormGenerator = (manifest) => {
    let {id} = useParams();
    const [form] = Form.useForm();
    const [formState, formActions] = useFormHook(id, form, manifest, manifest.form.initialValue);
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const [state, setState] = useState(manifest.initialState);

    const urlQueries = [];
    const options = {};

    function getTabPaneItemQuery(tab, tabKey, tabPaneKey) {
        for (let tabPaneItem of Object.keys(tab[tabPaneKey])) {
            if (tabPaneItem.includes('row')) {
                getRowQuery(tab[tabPaneKey][tabPaneItem]);
            }
            if (tabPaneItem.includes('form_line')) {
                getLineQuery(tab[tabPaneKey][tabPaneItem].fields);
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
        if (!Array.isArray(fields)) {
            return;
        }
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
                urlQueries.push(field);
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
        }
    }

    urlQueries.forEach((field) => {
        if (field.hasOwnProperty('listName')) {
            const tableField = field.name.replace('_id', '');
            options[`${field.name}-lineOptions`] = useOptionLineHook(field.query.url, `${tableField}.${field.query.field}`, field.listName);
        } else {
            const tableField = field.name.replace('_id', '');
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
        fetchCatcher: fetchCatcher,
        options: options,
        state: state,
        setState: setState,
    };

    if (manifest.form.hasOwnProperty('onValuesChange')) {
        formContextProviderValues['onValuesChange'] = manifest.form.onValuesChange;
    }

    return (<FormContextProvider
            value={formContextProviderValues}
        >
            <CustomForm>
                <ControlPanel
                    topColOneLeft={<CustomBreadcrumb/>}
                    bottomColOneLeft={<FormButtons/>}
                    bottomColTwoRight={<NextPreviousRecord/>}
                />
                {manifest.statuses && <StatusBar statuses={manifest.statuses}/>}
                <FormCard>
                    {manifest.formLinks && <FormLinks links={manifest.formLinks}/>}
                    <FormItems/>
                </FormCard>
            </CustomForm>
        </FormContextProvider>);
};

export default FormGenerator;
