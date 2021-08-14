import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import {Skeleton, Menu} from "antd";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import MeasureCategoryRoute from "../MeasureCategory/MeasureCategoryRoute";
import MenuRoute from "../Menu/MenuRoute";

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
            <div>
                <Skeleton loading={appState.loading} paragraph={{rows: 0, witdh: '100%'}} active>
                    <Menu mode={'horizontal'}>
                        {menus.length && menus.map((menu) => {
                            return (
                                <Menu.Item key={menu.id}>
                                    <Link to={menu.url}>{menu.label}</Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </Skeleton>

                <Route exact path="/">
                    <h1>Home</h1>
                </Route>
                <MeasureCategoryRoute/>
                <MenuRoute/>

            </div>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));
