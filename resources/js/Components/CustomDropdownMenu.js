import {Divider, Input, Space, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const CustomDropdownMenu = (props) => {
    // console.log(props);
    return (
        <>
            {props.menu}
            <Divider style={{margin: '8px 0'}}/>
            <Space align="center" style={{padding: '0 8px 4px'}}>
                <Input placeholder="Please enter item"
                       value={props.value}
                       onChange={props.onChange}
                       onPressEnter={props.onCreate}
                />
                <Typography.Link style={{whiteSpace: 'nowrap'}} onClick={props.onCreate}>
                    <PlusOutlined/> Create
                </Typography.Link>
            </Space>
        </>
    )
};

export default CustomDropdownMenu;
