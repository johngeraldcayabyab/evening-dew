import {Button, Modal} from "antd"
import {useContext, useState} from "react"
import TableGenerator from "./TableAndKanban/TableGenerator"
import {FormContext} from "../Contexts/FormContext"

export const TableModal = (props) => {
    const formContext = useContext(FormContext);
    const manifest = props.selectProps.query.manifest;
    manifest.returnRecordValue = (record, rowIndex) => {
        if (record && record.id) {
            const values = {};
            values[props.selectProps.name] = record.id;
            if (props.selectProps.isListField) {
                formContext.options[`${props.selectProps.name}-lineOptions`].getOptions({id: record.id}, props.selectProps.groupName);
                const listValues = formContext.form.getFieldsValue()[props.selectProps.listName];
                listValues[props.selectProps.groupName] = values
                const formLineUpdatedValues = {};
                formLineUpdatedValues[props.selectProps.listName] = listValues;
                formContext.form.setFieldsValue(formLineUpdatedValues);
            } else {
                formContext.options[`${props.selectProps.name}-options`].getOptions({id: record.id});
                formContext.form.setFieldsValue(values);
            }
        }
        handleOk();
    };
    const [open, setOpen] = useState(false);
    const showModal = () => {
        if (props.selectRef.current) {
            props.selectRef.current.focus();
            props.selectRef.current.blur();
        }
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="link" onClick={showModal}>
                Search more..
            </Button>
            <Modal
                title="Search "
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
            >
                <TableGenerator {...manifest}/>
            </Modal>
        </>
    );
};
