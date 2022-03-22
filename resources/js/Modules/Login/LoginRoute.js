import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import {uuidv4} from "../../Helpers/string";

const LoginRoute = () => {
    return (
        <Switch>
            <Route exact key={uuidv4()} path={`/login`}>
                <Login/>
            </Route>
        </Switch>
    )
};

export default LoginRoute;
