import React, {useContext} from "react";
import {Content} from "antd/es/layout/layout";
import CustomMenu from './CustomMenu';
import {NavLink, Outlet} from "react-router-dom";
import {AppContext} from "../Contexts/AppContext";
import {Menu} from "antd";
import {uuidv4} from "../Helpers/string";

const ContentContainer = () => {
    const appContext = useContext(AppContext);

    const items = appContext.manifests.map(manifest => ({
        label: <NavLink to={manifest.moduleName}>{manifest.moduleName}</NavLink>,
        key: uuidv4()
    }));

    return (
        <>
            <Content style={{marginTop: '50px', borderTop: 'none'}}>
                <Menu mode="horizontal" items={items}/>
                <Outlet/>
            </Content>
        </>
    )
};

export default ContentContainer;
