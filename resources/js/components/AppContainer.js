import {Layout, message} from "antd";
import {AppContext} from "./App";
import React, {useContext, useEffect} from "react";
import {useHistory} from "react-router";

const AppContainer = (props) => {
    const appContext = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        if (!appContext.appState.isLogin) {
            if (location.pathname !== '/login') {
                message.error('Please login first!');
                history.push('/login');
            }
        }
    }, []);

    return (
        <Layout style={{height: '100%', background: '#ffffff'}}>
            {props.children}
        </Layout>
    )
};

export default AppContainer;
