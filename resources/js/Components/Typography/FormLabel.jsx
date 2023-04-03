import {Typography} from "antd";

const FormLabel = (props) => {
    return (
        <Typography.Text style={{fontSize: "13px", ...props.style}} strong>{props.children}</Typography.Text>
    )
}

export default FormLabel;
