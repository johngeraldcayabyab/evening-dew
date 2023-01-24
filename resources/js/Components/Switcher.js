import {Switch} from "react-router-dom"
import Routes from "./Routes"
import {uuidv4} from "../Helpers/string"

const Switcher = (props) => {
    return (
        <Switch>
            {props.routes.map((route) => {
                return (
                    <Routes
                        key={uuidv4()}
                        path={route.path}
                        component={route.component}
                    />
                )
            })}
        </Switch>
    )
};

export default Switcher;
