import {GET} from "../consts";
import useFetchHook from "../Hooks/useFetchHook";
import useFetchCatcherHook from "../Hooks/useFetchCatcherHook";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";

const AvatarUser = () => {
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();
    const appContext = useContext(AppContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        useFetch(`/api/users`, GET, {
            email: appContext.appState.userEmail,
        }).then((response) => {
            setUser(response.data[0]);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }, []);


    if (user.hasOwnProperty('avatar') && user.avatar) {
        return (
            <Avatar src={user.avatar}/>
        );
    }

    return (
        <Avatar><UserOutlined/></Avatar>
    );
};

export default AvatarUser;
