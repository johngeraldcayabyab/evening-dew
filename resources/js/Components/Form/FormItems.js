import RowForm from "../Grid/RowForm"
import ColForm from "../Grid/ColForm"
import FormItemText from "../FormItem/FormItemText"
import FormItemNumber from "../FormItem/FormItemNumber"
import FormItemSelect from "../FormItem/FormItemSelect"
import React from "react"
import {Divider} from "antd"

const FormItems = (props) => {
    const formItems = props.formItems;
    const rows = [];
    for (let rowKey of Object.keys(formItems)) {
        const row = formItems[rowKey];
        const cols = [];
        if (rowKey.includes('divider')) {
            rows.push(<Divider key={rowKey}/>)
        }
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
                    })}
                </ColForm>
            );
        }
    }
    return rows;
};

export default React.memo(FormItems);
