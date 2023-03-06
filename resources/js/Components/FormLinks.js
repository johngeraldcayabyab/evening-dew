import {objectHasValue} from "../Helpers/object";
import RowForm from "./Grid/RowForm";
import ColForm from "./Grid/ColForm";
import {Link} from "react-router-dom";
import {Button} from "antd";
import {uuidv4} from "../Helpers/string";
import {FormContext} from "../Contexts/FormContext";
import {useContext} from "react";

const FormLinks = (props) => {
    const formContext = useContext(FormContext);
    const initialValues = formContext.formState.initialValues;

    let links = [];

    function labelizer(label) {
        if (typeof label === 'function') {
            return label(initialValues);
        }
        return label;
    }

    if (objectHasValue(initialValues)) {
        props.links.forEach((link) => {
            /**
             * this needs to be refactored
             */
            if (initialValues[link.value]) {
                links.push(link);
            }
        });
        if (!links.length) {
            return null;
        }
    }

    return (
        <div style={{
            borderBottom: '1px solid #cccccc',
            paddingBottom: '11px',
            marginBottom: '10px'
        }}>
            <RowForm align={'right'}>
                <ColForm lg={24} style={{textAlign: 'right'}}>
                    {links.map(link => {
                        if (link.module) {
                            return (
                                <Link
                                    key={uuidv4()}
                                    to={`/${link.module}?${link.param}=${initialValues[link.value]}`}>
                                    <Button
                                        htmlType={"button"}
                                        type={"ghost"}
                                        size={'default'}
                                    >
                                        {labelizer(link.label)}
                                    </Button>
                                </Link>
                            )
                        }
                        return (
                            <Button
                                key={uuidv4()}
                                htmlType={"button"}
                                type={"ghost"}
                                size={'default'}
                            >
                                {labelizer(link.label)}
                            </Button>
                        )
                    })}
                </ColForm>
            </RowForm>
        </div>
    );
};

export default FormLinks;
