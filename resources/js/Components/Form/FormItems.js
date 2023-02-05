import RowForm from "../Grid/RowForm"
import ColForm from "../Grid/ColForm"
import FormItemText from "../FormItem/FormItemText"
import FormItemNumber from "../FormItem/FormItemNumber"
import FormItemSelect from "../FormItem/FormItemSelect"
import React from "react"
import {Divider, Tabs} from "antd"
import FormItemCheckbox from "../FormItem/FormItemCheckbox"
import FormItemUpload from "../FormItem/FormItemUpload"
import FormItemTextArea from "../FormItem/FormItemTextArea";

const {TabPane} = Tabs;

const FormItems = (props) => {
    const formItems = props.formItems;
    const items = [];

    function generateFields(fields) {
        return fields.map((field) => {
            if (field.type === 'text') {
                return (
                    <FormItemText
                        key={field.name}
                        {...field}
                    />
                )
            }
            if (field.type === 'textarea') {
                return (
                    <FormItemTextArea
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
            if (field.type === 'checkbox') {
                return (
                    <FormItemCheckbox
                        key={field.name}
                        {...field}
                    />
                )
            }
            if (field.type === 'select') {
                if (field.hasOwnProperty('query')) {
                    return (
                        <FormItemSelect
                            key={field.name}
                            {...field}
                            {...props.options[field.query.name]}
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
            if (field.type === 'upload') {
                return (
                    <FormItemUpload
                        key={field.name}
                        {...field}
                    />
                )
            }
        });
    }

    function generateColumns(row, rowKey) {
        const columns = [];
        for (let columnKey of Object.keys(row)) {
            const fields = row[columnKey];
            columns.push(
                <ColForm key={`${rowKey}-${columnKey}`}>
                    {generateFields(fields)}
                </ColForm>
            );
        }
        return columns;
    }

    function generateTabPanes(tab, tabKey) {
        const tabPanes = [];
        for (let tabPaneKey of Object.keys(tab)) {
            if (tabPaneKey.includes('tab_pane')) {
                const tabPaneItems = generateTabPaneItems(tab, tabKey, tabPaneKey);
                tabPanes.push(
                    <TabPane key={`${tabKey}-${tabPaneKey}`} tab={tab[tabPaneKey].name}>
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
            if (tabPaneItem.includes('row')) {
                tabPaneItems.push(generateRow(tab[tabPaneKey][tabPaneItem], `${tabKey}-${tabPaneKey}`));
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
    }
    return items;
};

export default React.memo(FormItems);
