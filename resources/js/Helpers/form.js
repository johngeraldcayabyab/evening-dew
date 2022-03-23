import FormLabel from "../Components/Typography/FormLabel";
import React, {useContext} from "react";
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

export const getSpecificLine = (changedValues) => {
    let lines = getPresentLines(changedValues);
    let line;
    if (lines) {
        line = getChangedLine(lines);
    }
    if (isOnlyTwoProperty(line)) {
        return line;
    }
    return false;
}

export const getPresentLines = (changedValues) => {
    if (changedValues.hasOwnProperty('transfer_lines')) {
        return changedValues.transfer_lines;
    }
    return false;
}

export const getChangedLine = (lines) => {
    let changedLine;
    lines.forEach((line, key) => {
        changedLine = {...line, key: key};
    });
    if (changedLine && changedLine.hasOwnProperty('product_id')) {
        return changedLine;
    }
    return false;
}

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

export const isOnlyTwoProperty = (line) => {
    let keys = Object.keys(line);
    if (keys.length === 2) {
        return true;
    }
    return false;
}


export const isOnlyOneProperty = (changedSalesOrderLine) => {
    let keys = Object.keys(changedSalesOrderLine);
    if (keys.length === 1) {
        return true;
    }
    return false;
}
