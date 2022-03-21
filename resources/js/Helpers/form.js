import FormLabel from "../Components/Typography/FormLabel";
import {Button, Form} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import RowForm from "../Components/Grid/RowForm";
import ColForm from "../Components/Grid/ColForm";
import {FormContext} from "../Contexts/FormContext";

export const formItemFieldProps = (props, specialFieldProps = {}) => {
    const formContext = useContext(FormContext);
    const formItemProps = {
        label: props.label ? <FormLabel>{props.label}</FormLabel> : null,
        name: props.name,
        rules: [{required: props.required, message: props.message}],
        colon: false,
        labelCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : {span: 8},
        wrapperCol: props.size === 'large' || props.size === 'medium' ? {
            span: 24,
            style: {flex: '0 0 100%'}
        } : {span: 16},
    };

    if (formContext.formState.errors[props.name]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = formContext.formState.errors[props.name];
    } else if (formContext.formState.errors[`${props.listName}.${props.groupName}.${props.name}`]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = formContext.formState.errors[`${props.listName}.${props.groupName}.${props.name}`];
    }

    const fieldProps = {
        disabled: formContext.formState.formDisabled,
        size: props.size ? props.size : 'small',
        placeholder: props.placeholder ? props.placeholder : null,
        ...specialFieldProps
    };

    if (props.overrideDisabled) {
        fieldProps.disabled = true;
    }

    if (props.isListField) {
        formItemProps.isListField = true;
        formItemProps.fieldKey = props.fieldKey;
        delete formItemProps.labelCol;
        formItemProps.wrapperCol = {span: 24};
        formItemProps.style = props.style;
        formItemProps.name = [props.groupName, props.name];
    }

    // console.log(props);

    return [formItemProps, fieldProps];
};

export const checkIfADynamicInputChangedAndDoSomething = (changedValues, allValues, dynamicName, dynamicProperty, callback) => {
    if (checkIfADynamicInputChanged(changedValues, dynamicName)) {
        const transactionLines = allValues[dynamicName];
        let changedTransactionLine = getSpecificInputChange(changedValues, dynamicName, dynamicProperty);
        if (changedTransactionLine) {
            callback(changedTransactionLine, transactionLines);
        }
    }
}


export const checkIfADynamicInputChanged = (changedValues, dynamicName) => {
    if (changedValues[dynamicName] && !changedValues[dynamicName].some(item => item === undefined || item.id)) {
        return true;
    }
    return false;
}

export const getSpecificInputChange = (changedValues, dynamicName, dynamicProperty) => {
    let changedSalesOrderLine = false;
    changedValues[dynamicName].forEach((salesOrderLine, key) => {
        if (salesOrderLine && salesOrderLine[dynamicProperty]) {
            if (isOnlyOneProperty(salesOrderLine)) {
                changedSalesOrderLine = {
                    key: key,
                };
                changedSalesOrderLine[dynamicProperty] = salesOrderLine[dynamicProperty]
            }
        }
    });
    return changedSalesOrderLine;
}

export const isOnlyOneProperty = (changedSalesOrderLine) => {
    let keys = Object.keys(changedSalesOrderLine);
    if (keys.length === 1) {
        return true;
    }
    return false;
}


const snakeToCamel = s => s.replace(/(_\w)/g, k => k[1].toUpperCase());

export const DynamicFieldRemoveButton = (props) => {
    return (
        <ColForm lg={1}>
            {!props.formState.formDisabled &&
            <MinusCircleOutlined onClick={(item) => {
                if (props.form.getFieldsValue()[props.dynamicName] && props.form.getFieldsValue()[props.dynamicName][props.name]) {
                    if (props.form.getFieldsValue()[props.dynamicName][props.name].id) {
                        props.setState((prevState) => {
                            let newState = {
                                ...prevState
                            };
                            newState[`${snakeToCamel(props.dynamicName)}OptionReload`] = [];
                            newState[`${snakeToCamel(props.dynamicName)}Deleted`] = [...prevState[`${snakeToCamel(props.dynamicName)}Deleted`], props.form.getFieldsValue()[props.dynamicName][props.name].id];
                            return newState
                        });
                    }
                }
                props.remove(props.name);
            }}/>}
        </ColForm>
    )
}

export const DynamicFieldAddButton = (props) => {
    return (
        <Form.Item>
            {!props.formState.formDisabled &&
            <Button type="dashed" onClick={() => {
                props.add();
            }} block
                    icon={<PlusOutlined/>}>
                {props.label}
            </Button>}
        </Form.Item>
    )
}

export const GenerateDynamicColumns = (props) => {
    const columnLength = props.columns.length;
    const width = 100 / columnLength;
    const columns = props.columns.map((column) => {
        return (<FormLabel key={column} style={{display: 'inline-block', width: `${width}%`}}>{column}</FormLabel>);
    });
    return (
        <RowForm>
            <ColForm lg={23}>
                {columns}
            </ColForm>
            <ColForm lg={1}>
            </ColForm>
        </RowForm>
    );
}
