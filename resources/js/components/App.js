import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {Skeleton, Menu, Layout, Breadcrumb} from "antd";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import MeasureCategoryRoute from "../MeasureCategory/MeasureCategoryRoute";
import MenuRoute from "../Menu/MenuRoute";
import {Content, Footer, Header} from "antd/lib/layout/layout";

const {SubMenu} = Menu;

const App = () => {
    const [appState, setAppState] = useState({
        menus: [],
        loading: true
    });
    const [menus, setMenus] = useState([]);

    useEffect(async () => {
        let responseData = await fetch(`/api/menus`)
            .then(response => response.json())
            .then(data => (data));
        setMenus(responseData);
        setAppState({
            menus: responseData,
            loading: false
        })
    }, []);

    return (
        <BrowserRouter>
            <Layout>
                <Skeleton loading={appState.loading} paragraph={{rows: 0, witdh: '100%'}} active>
                    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                        <div className="logo"/>
                        <Menu theme={'dark'} mode={'horizontal'}>
                            {menus.length && menus.map((menu) => {
                                return (
                                    <Menu.Item key={menu.id}>
                                        <Link to={menu.url}>{menu.label}</Link>
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    </Header>
                </Skeleton>

                <Content className="site-layout" style={{padding: '0 25px', marginTop: 64}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{minHeight: 380}}>
                        <Route exact path="/">
                            <h1>Home</h1>
                        </Route>
                        <MeasureCategoryRoute/>
                        <MenuRoute/>
                    </div>
                </Content>

                {/*<Footer style={{textAlign: 'center'}}>Evening Dew ©2021</Footer>*/}
            </Layout>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));
