import {useContext} from "react";
import {AppContext} from "../App";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Space} from "antd";

const AvatarUser = () => {
    const appContext = useContext(AppContext);
    return (
        <Space size={'small'}>
            {
                appContext.appState.user.hasOwnProperty('avatar') && appContext.appState.user.avatar
                    ?
                    <Avatar src={appContext.appState.user.avatar}/>
                    :
                    <Avatar><UserOutlined/></Avatar>
            }
            <span>{appContext.appState.user.name}</span>
        </Space>
    );
};

export default AvatarUser;
