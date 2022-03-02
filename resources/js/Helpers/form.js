import FormLabel from "../components/Typography/FormLabel";

export const formItemFieldProps = (props, specialFieldProps = {}) => {
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

    if (props.errors[props.name]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = props.errors[props.name];
    } else if (props.errors[`${props.listName}.${props.groupName}.${props.name}`]) {
        formItemProps.validateStatus = 'error';
        formItemProps.help = props.errors[`${props.listName}.${props.groupName}.${props.name}`];
    }

    const fieldProps = {
        disabled: props.formDisabled,
        size: props.size ? props.size : 'small',
        placeholder: props.placeholder ? props.placeholder : null,
        ...specialFieldProps
    };

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


const snakeToCamel = s => s.replace(/(_\w)/g, k => k[1].toUpperCase());

export const removeTransactionLines = (remove, form, dynamicName, name, setState) => {
    if (form.getFieldsValue()[dynamicName] && form.getFieldsValue()[dynamicName][name]) {
        if (form.getFieldsValue()[dynamicName][name].id) {

            const newState = {};


            setState((prevState) => {

                let newState = {
                    ...prevState
                };

                newState[`${snakeToCamel(dynamicName)}OptionReload`] = [];
                newState[`${snakeToCamel(dynamicName)}Deleted`] = [...prevState[`${snakeToCamel(dynamicName)}Deleted`], form.getFieldsValue()[dynamicName][name].id];

                // {
                // ...prevState,
                //     salesOrderLinesOptionReload: [],
                //     deletedSalesOrderLines: [...prevState.deletedSalesOrderLines, form.getFieldsValue().sales_order_lines[name].id],
                // }
                return newState
            });
        }
    }
    remove(name);
}


export const isOnlyOneProperty = (changedSalesOrderLine) => {
    let keys = Object.keys(changedSalesOrderLine);
    if (keys.length === 1) {
        return true;
    }
    return false;
}
