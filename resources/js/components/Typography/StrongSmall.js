import {Typography} from "antd";

const StrongSmall = (props) => {
    return (
        <Typography.Text style={{fontSize: "13px"}}> {props.children}</Typography.Text>
    )
}

export default StrongSmall;
