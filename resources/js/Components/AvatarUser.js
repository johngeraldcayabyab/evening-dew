import {useContext} from "react";
import {AppContext} from "../App";
import {UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

const AvatarUser = () => {
    const appContext = useContext(AppContext);
    if (appContext.appState.user.hasOwnProperty('avatar') && appContext.appState.user.avatar) {
        return (
            <Avatar src={appContext.appState.user.avatar}/>
        );
    }
    return (
        <Avatar><UserOutlined/></Avatar>
    );
};

export default AvatarUser;
