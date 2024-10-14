import {Button, Modal} from "antd"
import {useState} from "react"
import TableGenerator from "./TableAndKanban/TableGenerator"

export const TableModal = (props) => {
    const manifest = props.selectProps.query.manifest;
    manifest.returnRecordValue = (record, rowIndex) => {
        handleOk();
        console.log(record, rowIndex);
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
