import {Button} from "antd";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";

const KanbanTablePicker = () => {
    return (
        <>
            <Button size={'small'}><AppstoreOutlined/></Button>
            <Button size={'small'}><BarsOutlined/></Button>
        </>
    )
};

export default KanbanTablePicker;
