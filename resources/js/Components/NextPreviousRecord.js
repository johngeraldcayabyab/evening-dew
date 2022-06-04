import {Button, Radio} from "antd";
import {Link} from "react-router-dom";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";

const NextPreviousRecord = () => {
    const formContext = useContext(FormContext);
    const nextRecord = formContext.formState.initialValues.next_record;
    const previousRecord = formContext.formState.initialValues.previous_record;
    const displayName = formContext.manifest.displayName;
    return (
        <Radio.Group value={'small'}>
            <Button type={'link'} disabled={!Number.isInteger(nextRecord)}>
                <Link
                    to={`/${displayName}/${Number.isInteger(nextRecord) ? nextRecord : null}`}>
                    <LeftOutlined/>
                </Link>
            </Button>
            <Button type={'link'} disabled={!Number.isInteger(previousRecord)}>
                <Link
                    to={`/${displayName}/${Number.isInteger(previousRecord) ? previousRecord : null}`}>
                    <RightOutlined/>
                </Link>
            </Button>
        </Radio.Group>
    )
}

export default NextPreviousRecord;
