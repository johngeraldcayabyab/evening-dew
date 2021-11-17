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
                {/*<Content className="site-layout" style={{padding: '0 25px', marginTop: '50px'}}>*/}
                <Content className="site-layout" style={{marginTop: '50px'}}>
                    <MeasurementCategoryRoute/>
                    <MeasurementRoute/>
                    <MenuRoute/>
                </Content>
            </Layout>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));
