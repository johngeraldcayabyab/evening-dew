import RowForm from "../Grid/RowForm"
import ColForm from "../Grid/ColForm"
import FormItemText from "../FormItem/FormItemText"
import FormItemNumber from "../FormItem/FormItemNumber"
import FormItemSelect from "../FormItem/FormItemSelect"
import React, {useContext} from "react"
import {Divider, Tabs} from "antd"
import FormItemCheckbox from "../FormItem/FormItemCheckbox"
import FormItemUpload from "../FormItem/FormItemUpload"
import FormItemTextArea from "../FormItem/FormItemTextArea";
import {FormContext} from "../../Contexts/FormContext"
import FormLineParent from "../FormLines/FormLineParent"
import FormItemLineId from "../FormItem/FormItemLineId"
import {VISIBILITY_CREATED, VISIBILITY_CREATING} from "../../consts"
import FormItemStatus from "../FormItem/FormItemStatus"
import FormItemDate from "../FormItem/FormItemDate"

const FormItems = () => {
    const formContext = useContext(FormContext);
    const options = formContext.options;
    const formItems = formContext.manifest.form;
    const items = [];

    function generateItemText(field) {
        return (
            <FormItemText
                key={field.key ? field.key : field.name}
                {...field}
            />
        )
    }

    function generateTextArea(field) {
        return (
            <FormItemTextArea
                key={field.name}
                {...field}
            />
        )
    }

    function generateItemNumber(field) {
        return (
            <FormItemNumber
                key={field.name}
                {...field}
            />
        )
    }

    function generateCheckbox(field) {
        return (
            <FormItemCheckbox
                key={field.name}
                {...field}
            />
        )
    }

    function generateSelect(field) {
        if (field.hasOwnProperty('query') && field.hasOwnProperty('listName')) {
            return (
                <FormItemSelect
                    key={field.name}
                    {...field}
                    optionAggregate={options[`${field.name}-lineOptions`]}
                    dropdownRender={options[`${field.name}-lineOptions`]}
                />
            )
        } else if (field.hasOwnProperty('query')) {
            return (
                <FormItemSelect
                    key={field.name}
                    {...field}
                    {...options[`${field.name}-options`]}
                    dropdownRender={options[`${field.name}-options`]}
                />
            )
        }
        if (field.optionsState) {
            field.options = formContext.manifest.initialState.queries[field.optionsState.replace('queries.', '')].options;
            return (
                <FormItemSelect
                    key={field.name}
                    {...field}
                />
            )
        }
        return (
            <FormItemSelect
                key={field.name}
                {...field}
            />
        )
    }

    function generateUpload(field) {
        return (
            <FormItemUpload
                key={field.name}
                {...field}
            />
        )
    }

    function generateStatus(field) {
        return (
            <FormItemStatus
                key={field.name}
                {...field}
            />
        )
    }

    function generateDate(field) {
        return (
            <FormItemDate
                key={field.name}
                {...field}
            />
        )
    }

    function generateFields(fields) {
        if (!Array.isArray(fields)) {
            return null;
        }
        return fields.map((field) => {
            switch (field.type) {
                case 'text':
                    return generateItemText(field);
                case 'textarea':
                    return generateTextArea(field);
                case 'number':
                    return generateItemNumber(field);
                case 'checkbox':
                    return generateCheckbox(field);
                case 'select':
                    return generateSelect(field);
                case 'upload':
                    return generateUpload(field);
                case 'status':
                    return generateStatus(field);
                case 'date':
                    return generateDate(field);
                case 'divider':
                    return generateDivider(field, field.name);
                case 'component':
                    return field.component;
                default:
                    console.warn(`Unsupported field type: ${field.type}`);
                    return <div key={field.name}>Unsupported field: {field.type}</div>;
            }
        });
    }

    function generateColumns(row, rowKey) {
        const columns = [];
        for (let columnKey of Object.keys(row)) {
            const column = row[columnKey];
            columns.push(
                <ColForm key={`${rowKey}-${columnKey}`}>
                    {generateFields(column)}
                </ColForm>
            );
        }
        return columns;
    }

    function generateTabPanes(tab, tabKey) {
        const tabPanes = [];
        for (let tabPaneKey of Object.keys(tab)) {
            if (tabPaneKey.includes('tab_pane')) {
                const tabPane = tab[tabPaneKey];
                if (onlyVisibleOnCreated(tabPane)) {
                    continue;
                }
                const tabPaneItems = generateTabPaneItems(tab, tabKey, tabPaneKey);
                tabPanes.push({
                    key: `${tabKey}-${tabPaneKey}`,
                    label: tabPane.name,
                    children: tabPaneItems
                });
            }
        }
        return tabPanes;
    }

    function checkVisibility(item) {

    }

    function onlyVisibleOnCreated(item) {
        return item.hasOwnProperty('visibility') && item.visibility === VISIBILITY_CREATED && !formContext.id;
    }

    function onlyVisibleOnCreating(item) {
        return item.hasOwnProperty('visibility') && item.visibility === VISIBILITY_CREATING && formContext.id;
    }

    function generateTabPaneItems(tab, tabKey, tabPaneKey) {
        const tabPaneItems = [];
        for (let tabPaneItem of Object.keys(tab[tabPaneKey])) {
            if (tabPaneItem.includes('divider')) {
                tabPaneItems.push(generateDivider(tab[tabPaneKey][tabPaneItem], `${tabKey}-${tabPaneKey}-${tabPaneItem}`))
            }
            if (tabPaneItem.includes('row')) {
                tabPaneItems.push(generateRow(tab[tabPaneKey][tabPaneItem], `${tabKey}-${tabPaneKey}-${tabPaneItem}`));
            }
            if (tabPaneItem.includes('form_line')) {
                tabPaneItems.push(generateLine(tab[tabPaneKey][tabPaneItem], `${tabKey}-${tabPaneKey}-${tabPaneItem}`));
            }
        }
        return tabPaneItems;
    }

    function generateRow(row, rowKey) {
        const columns = generateColumns(row, rowKey);
        return (
            <RowForm key={rowKey}>
                {columns}
            </RowForm>
        );
    }

    function generateTab(tab, tabKey) {
        const tabPanes = generateTabPanes(tab, tabKey);
        const defaultActiveKey = tabPanes.hasOwnProperty('defaultActiveKey') ? tabPanes.defaultActiveKey : 'tab_pane_1';
        return (
            <Tabs
                defaultActiveKey={defaultActiveKey}
                key={tabKey}
                items={tabPanes}
            />
        )
    }

    function generateDivider(divider, dividerKey) {
        if (divider.hasOwnProperty('label')) {
            return (
                <Divider key={dividerKey} orientation={divider.orientation}>
                    {divider.label}
                </Divider>
            )
        }
        return <Divider key={dividerKey}/>
    }

    function generateLine(line, lineKey) {
        const lines = [];
        const listName = line.listName;
        const lineFields = line.fields.map((lineField) => {
            lineField['listName'] = listName;
            return lineField;
        });
        const fields = generateFields(lineFields);
        lines.push(
            <RowForm key={lineKey}>
                <ColForm lg={24}>
                    <FormLineParent
                        columns={line.columns}
                        listName={listName}
                    >
                        <FormItemLineId name={'id'}/>
                        {fields}
                    </FormLineParent>
                </ColForm>
            </RowForm>
        );
        return lines;
    }

    for (let itemKey of Object.keys(formItems)) {
        const item = formItems[itemKey];
        if (itemKey.includes('divider')) {
            items.push(generateDivider(item, itemKey))
        }
        if (itemKey.includes('row')) {
            if (onlyVisibleOnCreating(item)) {
                continue;
            }
            items.push(generateRow(item, itemKey));
        }
        if (itemKey.includes('tab')) {
            items.push(generateTab(item, itemKey))
        }
        if (itemKey.includes('form_line')) {
            items.push(generateLine(item, itemKey));
        }
    }
    return items;
};

export default React.memo(FormItems);
