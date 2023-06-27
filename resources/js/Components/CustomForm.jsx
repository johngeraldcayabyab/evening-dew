import {Form} from "antd";
import {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";
import {isLineFieldExecute} from "../Helpers/form"

const CustomForm = (props) => {
    const formContext = useContext(FormContext);
    return (
        <Form
            form={formContext.form}
            onFinish={formContext.onFinish}
            size={'small'}
            labelAlign={'left'}
            labelCol={{span: 8}}
            labelWrap={true}
            wrapperCol={{span: 16}}
            onValuesChange={(changedValues, values) => {
                if (formContext.onChangeValuesFunctions) {
                    formContext.onChangeValuesFunctions.forEach((field) => {
                        if (field.hasOwnProperty('listName')) {
                            isLineFieldExecute(changedValues, values, field.listName, field.name, (changedLine, allValues) => {
                                field.onValueChange(changedValues, values, formContext, changedLine, allValues);
                            });
                        } else {
                            if (changedValues[field.name]) {
                                field.onValueChange(changedValues, values, formContext);
                            }
                        }
                    });
                }
            }}
            className={'custom-form'}
        >
            {props.children}
        </Form>
    );
}

export default CustomForm;
