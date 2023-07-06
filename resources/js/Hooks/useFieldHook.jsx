import React, {useContext} from "react"
import {FormContext} from "../Contexts/FormContext"
import FormLabel from "../Components/Typography/FormLabel"

const useFieldHook = (props, specialFieldProps = {}) => {
    const formContext = useContext(FormContext);
    const formState = formContext.formState;
    const formItemProps = {
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

    if (props.label) {
        formItemProps.label = <FormLabel>{props.label}</FormLabel>;
    }

    if (formState.errors && formState.errors[props.name]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = formState.errors[props.name];
    }

    const fieldProps = {
        readOnly: props.readOnly,
        disabled: props.disabled || formState.formDisabled,
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
        if (formContext.formState.errors && formContext.formState.errors[`${props.listName}.${props.fieldKey}.${props.name}`]) {
            formItemProps.validateStatus = 'error';
            formItemProps.help = formContext.formState.errors[`${props.listName}.${props.fieldKey}.${props.name}`];
        }
    }

    return [formItemProps, fieldProps];
};

export default useFieldHook;
