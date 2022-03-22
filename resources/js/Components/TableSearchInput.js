import {Input, Tooltip} from "antd";
import React, {useCallback} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {debounce} from "../Helpers/debounce";

const TableSearchInput = () => {
    const handleChange = (value) => {
        // props.renderData();
    };

    const optimizedFn = useCallback(debounce(handleChange, this), []);

    return (
        <Input
            onChange={(e) => optimizedFn(e.target.value)}
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
