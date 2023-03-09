import {useContext} from "react";
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Space} from "antd";
import {AppContext} from "../Contexts/AppContext"

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
