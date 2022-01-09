import {Route, Switch} from "react-router-dom";
import Login from "./Login";

const LoginRoute = () => {
    return (
        <Switch>
            <Route exact key={`login`} path={`/login`}>
                <Login/>
            </Route>
        </Switch>
    )
};

export default LoginRoute;
