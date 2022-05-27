import {Button, Radio} from "antd";
import {Link} from "react-router-dom";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {FormContext} from "../Contexts/FormContext";

const NextPreviousRecord = () => {
    const formContext = useContext(FormContext);
    const nextRecord = formContext.formState.initialValues.next_record;
    const previousRecord = formContext.formState.initialValues.previous_record;
    const moduleName = formContext.manifest.moduleName;
    return (
        <Radio.Group value={'small'}>
            <Button type={'link'} disabled={!Number.isInteger(nextRecord)}>
                <Link
                    to={`/${moduleName}/${Number.isInteger(nextRecord) ? nextRecord : null}`}>
                    <LeftOutlined/>
                </Link>
            </Button>
            <Button type={'link'} disabled={!Number.isInteger(previousRecord)}>
                <Link
                    to={`/${moduleName}/${Number.isInteger(previousRecord) ? previousRecord : null}`}>
                    <RightOutlined/>
                </Link>
            </Button>
        </Radio.Group>
    )
}

export default NextPreviousRecord;
