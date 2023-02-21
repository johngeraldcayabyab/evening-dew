import {Switch} from "react-router-dom"
import Routes from "./Routes"
import {uuidv4} from "../Helpers/string"
import TableGenerator from "./TableGenerator"
import FormGenerator from "./Form/FormGenerator"

const Switcher = (props) => {
    const manifest = props.manifest;
    return (
        <Switch>
            {
                manifest.form &&
                <Routes
                    key={uuidv4()}
                    path={`/${manifest.displayName}/create`}
                    component={() => <FormGenerator {...manifest}/>}
                />
            }
            {
                (manifest.form && !manifest.form.hasOwnProperty('updatable')) &&
                <Routes
                    key={uuidv4()}
                    path={`/${manifest.displayName}/:id`}
                    component={() => <FormGenerator {...manifest}/>}
                />
            }
            {
                manifest.table &&
                <Routes
                    key={uuidv4()}
                    path={`/${manifest.displayName}`}
                    component={() => <TableGenerator {...manifest}/>}
                />
            }
        </Switch>
    )
};

export default Switcher;
