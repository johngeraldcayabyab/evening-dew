import {Divider, Input, Space, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useContext} from "react"
import {isShowButton} from "../Helpers/object"
import {CREATE_ACCESS} from "../consts"
import {AppContext} from "../Contexts/AppContext"
import {TableModal} from "./TableModal"

const CustomDropdownMenu = (props) => {
    const appContext = useContext(AppContext);
    return (
        <>
            {props.menu}
            {isShowButton(appContext, props.meta.path.split('/').pop(), CREATE_ACCESS) &&
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
                    {props.selectProps.query.manifest &&
                        <>
                            <Divider style={{margin: '8px 0'}}/>
                            <Space align="center" style={{padding: '0 8px 4px'}}>
                                <TableModal {...props}/>
                            </Space>
                        </>
                    }
                </>
            }
        </>
    )
};

export default CustomDropdownMenu;
