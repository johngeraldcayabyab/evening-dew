import {Button} from "antd";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {TableContext} from "../Contexts/TableContext";
import {useContext} from "react";
import {KANBAN, TABLE} from "../consts";

const KanbanTablePicker = () => {
    const listContext = useContext(TableContext);
    return (
        <>
            <Button size={'small'} onClick={() => {
                listContext.setDataState((prevState) => ({
                    ...prevState,
                    mode: KANBAN
                }));
            }}><AppstoreOutlined/></Button>
            <Button size={'small'} onClick={() => {
                listContext.setDataState((prevState) => ({
                    ...prevState,
                    mode: TABLE
                }));
            }}><BarsOutlined/></Button>
        </>
    )
};

export default KanbanTablePicker;
