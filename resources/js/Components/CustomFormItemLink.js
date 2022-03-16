import {Link} from "react-router-dom";
import {objectHasValue} from "../Helpers/object";

const CustomFormItemLink = (props) => {
    if (props.formDisabled) {
        if (props.isListField) {
            if (objectHasValue(props.initialValues)) {
                return (
                    <Link
                        to={props.url.replace('/api', '') + '/' + props.initialValues[props.listName][props.groupName][props.name]}>
                        {props.children}
                    </Link>
                )
            }
        }
        return (
            <Link to={props.url.replace('/api', '') + '/' + props.initialValues[props.name]}>
                {props.children}
            </Link>
        )
    }
    return props.children
};

export default CustomFormItemLink;
