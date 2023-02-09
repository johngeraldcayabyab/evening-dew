import {Switch} from "react-router-dom"
import Routes from "./Routes"
import {uuidv4} from "../Helpers/string"
import TableGenerator from "./TableGenerator"
import FormGenerator from "./Form/FormGenerator"

const Switcher = (props) => {
    return (<Switch>
        {props.routes.map((route) => {
            if (route.path.includes('create') || route.path.includes(':id')) {
                return (
                    <Routes
                        key={uuidv4()}
                        path={route.path}
                        component={() => <FormGenerator {...route.manifest()}/>}
                    />
                )
            } else {
                return (
                    <Routes
                        key={uuidv4()}
                        path={route.path}
                        component={() => <TableGenerator {...route.manifest()}/>}
                    />
                )
            }
        })}
    </Switch>)
};

export default Switcher;
