import {Link} from "react-router-dom";

const CustomFormItemLink = (props) => {
    if (props.formDisabled) {
        return (
            <Link to={props.url.replace('/api', '').replace('option', props.initialValues[props.name])}>
                {props.children}
            </Link>
        )
    }
    return props.children
};

export default CustomFormItemLink;
