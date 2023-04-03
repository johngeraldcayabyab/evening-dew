import {Route} from "react-router-dom"
import {uuidv4} from "../Helpers/string"

const Routes = (props) => {
    return (
        <Route
            exact
            key={uuidv4()}
            path={props.path}
            component={props.component}
        />
    )
};

export default Routes;
