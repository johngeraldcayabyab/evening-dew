import FormLabel from "../Components/Typography/FormLabel";
import React, {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";

export const formItemFieldProps = (props, specialFieldProps = {}) => {
    const formContext = useContext(FormContext);
    const formItemProps = {
        label: props.label ? <FormLabel>{props.label}</FormLabel> : null,
        name: props.name,
        rules: [
            {required: props.required, message: props.message ? props.message : 'This field is required'}
        ],
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
    }

    const fieldProps = {
        disabled: formContext.formState.formDisabled,
        size: props.size ? props.size : 'small',
        placeholder: props.placeholder ? props.placeholder : null,
        ...specialFieldProps
    };

    if (props.hasOwnProperty('overrideDisabled') && props.overrideDisabled && !formContext.formState.formDisabled) {
        if (typeof props.overrideDisabled === 'function') {
            fieldProps.disabled = props.overrideDisabled(formContext);
        } else {
            fieldProps.disabled = true;
        }
    }

    if (props.isListField) {
        formItemProps.isListField = true;
        formItemProps.fieldKey = props.fieldKey;
        delete formItemProps.labelCol;
        formItemProps.wrapperCol = {span: 24};
        formItemProps.style = props.style;
        formItemProps.name = [props.groupName, props.name];
        if (formContext.formState.errors[`${props.listName}.${props.fieldKey}.${props.name}`]) {
            formItemProps.validateStatus = 'error';
            formItemProps.help = formContext.formState.errors[`${props.listName}.${props.fieldKey}.${props.name}`];
        }
    }

    return [formItemProps, fieldProps];
};

export const isLineFieldExecute = (changedValues, allValues, lineName, field, callback) => {
    const line = getChangedLineField(changedValues, lineName, field);
    if (line && line[field]) {
        callback(line, allValues);
    }
};

export const getChangedLineField = (changedValues, lineName, field) => {
    let lines = getPresentLines(changedValues, lineName);
    let line;
    if (lines) {
        line = getChangedLine(lines, field);
    }
    if (isOnlyTwoProperty(line)) {
        return line;
    }
    return false;
}

export const getPresentLines = (changedValues, lineName) => {
    if (changedValues.hasOwnProperty(lineName)) {
        return changedValues[lineName];
    }
    return false;
}

export const getChangedLine = (lines, field) => {
    let changedLine;
    lines.forEach((line, key) => {
        changedLine = {...line, key: key};
    });
    if (changedLine && changedLine.hasOwnProperty(field)) {
        return changedLine;
    }
    return false;
}

export const getPersistedKey = (line, options) => {
    let key = 0;
    for (let persistedKey in options) {
        if (options.hasOwnProperty(persistedKey)) {
            if (line.key === key) {
                return persistedKey;
            }
            key++;
        }
    }
};

export const isOnlyTwoProperty = (line) => {
    if (line === undefined) {
        return false;
    }
    let keys = Object.keys(line);
    if (keys.length === 2) {
        return true;
    }
    return false;
}


export const getFieldFromInitialValues = (initialValues, tableField) => {
    let field = initialValues;
    const fields = tableField.split('.');
    fields.pop();
    fields.push('id');
    fields.forEach((query) => {
        if (field && query in field) {
            field = field[query];
        } else {
            field = null;
        }
    });
    return field;
}
