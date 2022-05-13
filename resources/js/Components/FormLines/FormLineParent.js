import LineColumn from "./LineColumn";
import {Form} from "antd";
import FormLine from "./FormLine";
import RowForm from "../Grid/RowForm";
import RemoveLineButton from "./RemoveLineButton";
import AddLineButton from "./AddLineButton";
import React from "react";

const FormLineParent = (props) => {
    return (
        <>
            <LineColumn
                columns={props.columns}
            />
            <Form.List name={props.listName}>
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name, ...restField}) => (
                            <RowForm key={key}>
                                <FormLine
                                    restField={restField}
                                    groupName={name}
                                    listName={props.listName}
                                >
                                    {props.children}
                                </FormLine>
                                <RemoveLineButton
                                    remove={() => {
                                        remove(name);
                                    }}
                                    listName={props.listName}
                                    name={name}
                                />
                            </RowForm>
                        ))}
                        <AddLineButton add={add} label={'Add a component'}/>
                    </>
                )}
            </Form.List>
            <Form.List name={`${props.listName}_deleted`}>
                {(fields, {add, remove}) => (
                    <>
                    </>
                )}
            </Form.List>
        </>
    );
}

export default FormLineParent;
