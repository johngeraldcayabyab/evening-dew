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

const {TabPane} = Tabs;

const FormItems = (props) => {
    const formContext = useContext(FormContext);
    const formItems = props.formItems;
    const items = [];

    function generateItemText(field) {
        return (
            <FormItemText
                key={field.name}
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
                    optionAggregate={props.options[`${field.name}-lineOptions`]}
                    dropdownRender={props.options[`${field.name}-lineOptions`]}
                />
            )
        } else if (field.hasOwnProperty('query')) {
            return (
                <FormItemSelect
                    key={field.name}
                    {...field}
                    {...props.options[`${field.name}-options`]}
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

    function generateFields(fields) {
        return fields.map((field) => {
            if (field.type === 'text') {
                return generateItemText(field);
            }
            if (field.type === 'textarea') {
                return generateTextArea(field);
            }
            if (field.type === 'number') {
                return generateItemNumber(field);
            }
            if (field.type === 'checkbox') {
                return generateCheckbox(field);
            }
            if (field.type === 'select') {
                return generateSelect(field);
            }
            if (field.type === 'upload') {
                return generateUpload(field);
            }
            if (field.type === 'divider') {
                return generateDivider(field, field.name);
            }
            return null;
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
                if (tabPane.visibility === 'created' && !formContext.id) {
                    continue;
                }
                const tabPaneItems = generateTabPaneItems(tab, tabKey, tabPaneKey);
                tabPanes.push(
                    <TabPane key={`${tabKey}-${tabPaneKey}`} tab={tabPane.name}>
                        {tabPaneItems}
                    </TabPane>
                )
            }
        }
        return tabPanes;
    }

    function generateTabPaneItems(tab, tabKey, tabPaneKey) {
        const tabPaneItems = [];
        for (let tabPaneItem of Object.keys(tab[tabPaneKey])) {
            if (tabPaneItem.includes('divider')) {
                tabPaneItems.push(generateDivider(tab[tabPaneKey][tabPaneItem], `${tabKey}-${tabPaneKey}`))
            }
            if (tabPaneItem.includes('row')) {
                tabPaneItems.push(generateRow(tab[tabPaneKey][tabPaneItem], `${tabKey}-${tabPaneKey}`));
            }
            if (tabPaneItem.includes('form_line')) {
                tabPaneItems.push(generateLine(tab[tabPaneKey][tabPaneItem], `${tabKey}-${tabPaneKey}`));
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
            >
                {tabPanes}
            </Tabs>
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
        const fields = generateFields(line.fields);
        lines.push(
            <RowForm key={lineKey}>
                <ColForm lg={24}>
                    <FormLineParent
                        columns={line.columns}
                        listName={line.listName}
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
