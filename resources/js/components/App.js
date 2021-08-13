import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import MeasureCategoryRoute from "../MeasureCategory/MeasureCategoryRoute";
import MenuRoute from "../Menu/MenuRoute";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/measures_categories">Measures Category Table</Link>
                    </li>
                    <li>
                        <Link to="/measures_categories/create">Measures Category Form</Link>
                    </li>

                    <li>
                        <Link to="/menus">Menus</Link>
                    </li>
                    <li>
                        <Link to="/menus/create">Menus Form</Link>
                    </li>
                </ul>

                <hr/>

                <Switch>
                    <Route exact path="/">
                        <h1>Home</h1>
                    </Route>
                    <MeasureCategoryRoute/>
                    <MenuRoute/>
                </Switch>
            </div>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));
