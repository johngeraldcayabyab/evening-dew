import FormLabel from "../Components/Typography/FormLabel";
import React, {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";
import {SELECT_PAGE_SIZE} from "../consts"

export const formItemFieldProps = (props, specialFieldProps = {}) => {
    const formContext = useContext(FormContext);
    const formState = formContext.formState;
    const formItemProps = {
        label: props.label ? <FormLabel>{props.label}</FormLabel> : null,
        name: props.name,
        rules: [
            {
                required: props.required,
                message: props.message ? props.message : `${props.label ? props.label : props.placeholder} is required`
            }
        ],
        colon: false,
        labelCol: props.size === 'large' || props.size === 'medium' ? {span: 24} : {span: 8},
        wrapperCol: props.size === 'large' || props.size === 'medium' ? {
            span: 24,
            style: {flex: '0 0 100%'}
        } : {span: 16},
    };

    if (formState.errors[props.name]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = formState.errors[props.name];
    }

    const fieldProps = {
        disabled: formState.formDisabled,
        size: props.size ? props.size : 'small',
        placeholder: props.placeholder ? props.placeholder : null,
        ...specialFieldProps
    };

    if (props.hasOwnProperty('overrideDisabled') && props.overrideDisabled && !formState.formDisabled) {
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




    //Cannot spread the object directly to fieldsprops since antd automatically adds the synthetic events
    const eventHandlers = Object.keys(props)
        .filter(key  => key.startsWith("handle"))
        .reduce((accumulator, currentValue)=>{
            accumulator[currentValue] = props[currentValue];
            return accumulator;
        },{});

    Object.keys(eventHandlers).forEach(key =>{
        let eventHandler = key.substring(6,key.length);
        eventHandler = eventHandler[0].toLowerCase() + eventHandler.substring(1,eventHandler.length);
        //Do not override synthetic events if automatically added by antd
        if(!fieldProps.hasOwnProperty(eventHandler)){
            fieldProps[eventHandler]=eventHandlers[key];
        }

    })


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
    return keys.length === 2;
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

export const getField = (tableField) => {
    return tableField.split('.').slice(-1)[0];
}

export const payloadMaker = (params, customParams, tableField) => {
    const field = getField(tableField);
    let payload = {
        page_size: SELECT_PAGE_SIZE,
        selected_fields: ['id', 'slug', 'tag'],
        orderByColumn: field,
        orderByDirection: 'asc',
    };
    if (typeof params === 'string') {
        payload[field] = params;
    } else if (typeof params === 'object') {
        payload = {
            ...payload,
            ...params
        };
        if (customParams) {
            payload = {
                ...payload,
                ...customParams
            }
        }
    }
    return payload;
}
