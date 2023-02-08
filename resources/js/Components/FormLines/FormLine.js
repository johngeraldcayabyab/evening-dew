import React, {useContext} from "react";
import ColForm from "../Grid/ColForm";
import {FormContext} from "../../Contexts/FormContext";

const FormLine = (props) => {
    const formContext = useContext(FormContext);
    const listName = props.listName;
    const restGroup = {...props.restField, groupName: props.groupName};
    const width = 100 / (props.children.length - 1);
    return (
        <ColForm lg={23}>
            {React.Children.map(props.children, child => {
                if (React.isValidElement(child)) {
                    let childProps = {
                        ...props,
                        listName: listName,
                        ...restGroup
                    };
                    if (child.props.name !== 'id') {
                        childProps.style = {display: 'inline-block', width: `${width}%`};
                    }
                    if (child.props.optionAggregate) {
                        childProps = {
                            ...childProps,
                            ...child.props.optionAggregate.aggregate(child.props.optionAggregate, restGroup.fieldKey, formContext.formState),
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

export default FormLine;
