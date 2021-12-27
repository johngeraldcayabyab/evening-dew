import {Input, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const TableSearchInput = () => {
    return (
        <Input
            size={'small'}
            placeholder="Enter your username"
            suffix={
                <Tooltip title="Extra information">
                    <SearchOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                </Tooltip>
            }
        />
    )
};

export default TableSearchInput;
