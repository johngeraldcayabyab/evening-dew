import React, {useState} from 'react';
import {render} from 'react-dom';
import {DatePicker, message} from 'antd';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import {UnitOfMeasureCategory} from "../UnitOfMeasureCategory/UnitOfMeasureCategory";
import UnitOfMeasureCategoryForm from "../UnitOfMeasureCategory/UnitOfMeasureCategoryForm";
// import './index.css';

const App = () => {

    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/units_of_measure_categories">Unit Of Measures Category Table</Link>
                    </li>
                    <li>
                        <Link to="/units_of_measure_categories/create">Unit Of Measures Category Form</Link>
                    </li>
                </ul>

                <hr/>

                <Switch>

                    <Route exact path="/">
                        <h1>Home</h1>
                    </Route>

                    <Switch>
                        <Route exact key={'units_of_measure_categories'} path="/units_of_measure_categories">
                            <UnitOfMeasureCategory/>
                        </Route>
                        <Route exact key={'units_of_measure_categories_create'} path="/units_of_measure_categories/create">
                            <UnitOfMeasureCategoryForm/>
                        </Route>
                        <Route exact key={'units_of_measure_categories_update'} path="/units_of_measure_categories/:id">
                            <UnitOfMeasureCategoryForm/>
                        </Route>
                    </Switch>

                </Switch>
            </div>
        </Router>
    )
};

render(<App/>, document.getElementById('root'));
