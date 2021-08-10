import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import {MeasureCategory} from "../MeasureCategory/MeasureCategory";
import MeasureCategoryForm from "../MeasureCategory/MeasureCategoryForm";

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
                </ul>

                <hr/>

                <Switch>

                    <Route exact path="/">
                        <h1>Home</h1>
                    </Route>

                    <Switch>
                        <Route exact key={'measures_categories'} path="/measures_categories">
                            <MeasureCategory/>
                        </Route>
                        <Route exact key={'measures_categories_create'}
                               path="/measures_categories/create">
                            <MeasureCategoryForm/>
                        </Route>
                        <Route exact key={'measures_categories_update'}
                               path="/measures_categories/:id">
                            <MeasureCategoryForm/>
                        </Route>
                    </Switch>

                </Switch>
            </div>
        </BrowserRouter>
    )
};

render(<App/>, document.getElementById('root'));
