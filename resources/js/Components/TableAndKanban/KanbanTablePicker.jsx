import {Button} from "antd";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {TableContext} from "../../Contexts/TableContext";
import {useContext} from "react";
import {KANBAN, TABLE} from "../../consts";

const KanbanTablePicker = () => {
    const tableContext = useContext(TableContext);
    return (
        <>
            <Button disabled={true} size={'small'} onClick={() => {
                tableContext.setState((prevState) => ({
                    ...prevState,
                    mode: KANBAN
                }));
            }}><AppstoreOutlined/></Button>
            <Button size={'small'} onClick={() => {
                tableContext.setState((prevState) => ({
                    ...prevState,
                    mode: TABLE
                }));
            }}><BarsOutlined/></Button>
        </>
    )
};

export default KanbanTablePicker;
