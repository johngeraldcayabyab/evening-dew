import React, {useContext} from "react";
import ColForm from "../Grid/ColForm";
import {FormContext} from "../../Contexts/FormContext";

const FormLineTest = (props) => {
    const formContext = useContext(FormContext);
    const listName = props.listName;
    const restGroup = {...props.restField, groupName: props.groupName};
    const width = 100 / (props.children.length - 1);
    return (
        <ColForm lg={23}>
            {React.Children.map(props.children, child => {
                if (React.isValidElement(child)) {
                    let style = {display: 'inline-block', width: `${width}%`};
                    if (child.props.name === 'id') {
                        style = {display: 'none', position: 'absolute', top: '-9999%'};
                    }
                    let childProps = {
                        ...props,
                        listName: listName,
                        style: style,
                        ...restGroup
                    };
                    if (child.props.optionAggregate) {
                        childProps = {
                            ...childProps,
                            ...child.props.optionAggregate.aggregate(child.props.optionAggregate, restGroup.fieldKey, formContext.formState, listName),
                        };
                    }
                    const cloneChild = React.cloneElement(child, childProps);
                    return (
                        <>
                            {cloneChild}
                        </>
                    );
                }
                return child;
            })}
        </ColForm>
    )
};

export default FormLineTest;