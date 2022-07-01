import {useContext} from "react";
import {AppContext} from "../App";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Space} from "antd";

const AvatarUser = () => {
    const appContext = useContext(AppContext);
    if (appContext.appState.user.hasOwnProperty('avatar') && appContext.appState.user.avatar) {
        return (
            <Space size={'small'}>
                <Avatar src={appContext.appState.user.avatar}/><span>{appContext.appState.user.name}</span>
            </Space>
        );
    }
    return (
        <Avatar><UserOutlined/></Avatar>
    );
};

export default AvatarUser;
