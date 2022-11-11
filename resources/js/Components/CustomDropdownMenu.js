import {Divider, Input, Space, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useContext} from "react"
import {AppContext} from "../App"
import {FormContext} from "../Contexts/FormContext"
import {isShowButton} from "../Helpers/object"
import {CREATE_ACCESS} from "../consts"

const CustomDropdownMenu = (props) => {

    console.log(props);

    const appContext = useContext(AppContext);
    const formContext = useContext(FormContext);
    return (
        <>
            {props.menu}
            {isShowButton(appContext, formContext, CREATE_ACCESS) &&
                <>
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
            }
        </>
    )
};

export default CustomDropdownMenu;
