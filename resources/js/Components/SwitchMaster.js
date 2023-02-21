import Switcher from "./Switcher"
import {uuidv4} from "../Helpers/string"

const SwitchMaster = (props) => {
    return (
        props.switches.map((switched) => {
            return (
                <Switcher key={uuidv4()} manifest={switched}/>
            )
        })
    );
};

export default SwitchMaster;
