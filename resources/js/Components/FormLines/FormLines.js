// import LineAddButton from "./LineAddButton";
import RowForm from "../Grid/RowForm";
import ColForm from "../Grid/ColForm";
// import LineRemoveButton from "./LineRemoveButton";
// import GenerateColumnLines from "./GenerateColumnLines";
import {Form} from "antd";
import React from "react";

const FormLines = (props) => {
    const ChildModify = (childProps) => {
        return React.Children.map(childProps.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    ...childProps.restField,
                    groupName: childProps.groupName,
                    listName: props.lineName,
                    style: {display: 'inline-block', width: `${100 / props.columns.length}%`}
                });
            }
            return child;
        });
    };

    return (
        <>
            <GenerateColumnLines
                columns={props.columns}
            />
            <RowForm>
                <ColForm lg={24}>
                    <Form.List name={props.lineName}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}) => {
                                    return (
                                        <RowForm key={key}>
                                            <ColForm lg={23}>
                                                <ChildModify groupName={name} restField={restField}>
                                                    {props.children}
                                                </ChildModify>
                                            </ColForm>
                                            <ColForm lg={1}>
                                                <LineRemoveButton
                                                    remove={remove}
                                                    form={props.form}
                                                    dynamicName={props.lineName}
                                                    groupName={name}
                                                    formState={props.formState}
                                                    setState={props.setState}
                                                />
                                            </ColForm>
                                        </RowForm>
                                    )
                                })}
                                <LineAddButton
                                    formState={props.formState}
                                    add={add}
                                    label={props.lineAddLabel}
                                />
                            </>
                        )}
                    </Form.List>
                </ColForm>
            </RowForm>
        </>
    )
};

export default FormLines;
