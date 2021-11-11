import React from 'react';
import {render} from 'react-dom';
import {Layout} from "antd";
import {BrowserRouter, Route} from 'react-router-dom';
import MeasurementCategoryRoute from "../MeasurementCategory/MeasurementCategoryRoute";
import MenuRoute from "../Menu/MenuRoute";
import {Content} from "antd/lib/layout/layout";
import CustomBreadcrumb from "./CustomBreadcrumb";
import MeasurementRoute from "../Measurement/MeasurementRoute";
import CustomMenu from "./CustomMenu";


const App = () => {
    return (
        <BrowserRouter>
            <Layout style={{height: '100%'}}>
                <CustomMenu/>
                <Content className="site-layout" style={{padding: '0 25px', marginTop: 64}}>
                    <CustomBreadcrumb/>
                    <div className="site-layout-background" style={{minHeight: 380}}>
                        <Route exact path="/">
                            <h1>Home</h1>
                        </Route>
                        <MeasurementCategoryRoute/>
                        <MeasurementRoute/>
                        <MenuRoute/>
                    </div>
                </Content>
            </Layout>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));
