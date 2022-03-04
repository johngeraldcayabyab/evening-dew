import {objectHasValue} from "../Helpers/object";
import RowForm from "./Grid/RowForm";
import ColForm from "./Grid/ColForm";
import {Link} from "react-router-dom";
import {Button} from "antd";

const FormLinks = (props) => {
    let links = [];
    if (objectHasValue(props.formState.initialValues)) {
        props.links.forEach((link) => {
            if (objectHasValue(props.formState.initialValues[link.link])) {
                links.push(link);
            }
        });
        if (links.length) {
            return (
                <div style={{
                    borderBottom: '1px solid #cccccc',
                    paddingBottom: '11px',
                    marginBottom: '10px'
                }}>
                    <RowForm align={'right'}>
                        <ColForm lg={24} style={{textAlign: 'right'}}>
                            {links.map(link => (
                                <Link
                                    to={`/transfers/${props.formState.initialValues[link.link][link.id]}`}>
                                    <Button
                                        htmlType={"button"}
                                        type={"ghost"}
                                        size={'default'}
                                    >
                                        {link.label}
                                    </Button>
                                </Link>
                            ))}
                        </ColForm>
                    </RowForm>
                </div>
            )
        }
    }
    return null;
};

export default FormLinks;
