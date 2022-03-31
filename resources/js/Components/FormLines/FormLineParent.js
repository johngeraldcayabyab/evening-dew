import LineColumn from "./LineColumn";
import {Form} from "antd";
import FormLineTest from "./FormLineTest";
import RowForm from "../Grid/RowForm";
import RemoveLineButton from "./RemoveLineButton";
import AddLineButton from "./AddLineButton";
import React from "react";

const FormLineParent = (props) => {
    return (
        <>
            <LineColumn
                columns={['Product', 'Quantity', 'Measurement']}
            />
            <Form.List name="material_lines">
                {(fields, {add, remove}) => (
                    <>
                        <FormLineTest listName={'material_lines'}>
                            {fields.map(({key, name, ...restField}) => (
                                <RowForm key={key}>
                                    <FormLineTest listName={'material_lines'}>

                                    </FormLineTest>
                                    {/*{React.Children.map(props.children, child => {*/}
                                    {/*    if (React.isValidElement(child)) {*/}
                                    {/*        let style = {display: 'inline-block', width: `${width}%`};*/}
                                    {/*        if (child.props.name === 'id') {*/}
                                    {/*            style = {display: 'none', position: 'absolute', top: '-9999%'};*/}
                                    {/*        }*/}
                                    {/*        const cloneChild = React.cloneElement(child, {*/}
                                    {/*            ...props,*/}
                                    {/*            listName: listName,*/}
                                    {/*            style: style,*/}
                                    {/*        });*/}
                                    {/*        return (*/}
                                    {/*            <>*/}
                                    {/*                {cloneChild}*/}
                                    {/*            </>*/}
                                    {/*        );*/}
                                    {/*    }*/}
                                    {/*    return child;*/}
                                    {/*})}*/}
                                </RowForm>
                            ))}
                        </FormLineTest>
                        <RemoveLineButton
                            remove={remove}
                            listName={'material_lines'}
                            name={name}
                        />
                        <AddLineButton add={add} label={'Add a component'}/>
                    </>
                )}
            </Form.List>
        </>
    );
}

export default FormLineParent;
