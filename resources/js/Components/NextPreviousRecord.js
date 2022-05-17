import {Button, Radio} from "antd";
import {Link} from "react-router-dom";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";

const NextPreviousRecord = () => {
    const formContext = useContext(FormContext);

    return (
        <Radio.Group value={'small'}>
            <Button type={'link'}>
                <Link
                    to={`/cities/${formContext.formState.initialValues.next_record}`}>
                    <LeftOutlined/>
                </Link>
            </Button>
            <Button type={'link'}>
                <Link
                    to={`/cities/${formContext.formState.initialValues.previous_record}`}>
                    <RightOutlined/>
                </Link>
            </Button>
        </Radio.Group>
    )
}

export default NextPreviousRecord;
