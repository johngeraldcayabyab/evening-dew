import {Input, Tooltip} from "antd";
import React, {useCallback} from "react";
import {SearchOutlined} from "@ant-design/icons";

const TableSearchInput = () => {

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 250);
        };
    };

    const handleChange = (value) => {
        // props.renderData();
    };

    const optimizedFn = useCallback(debounce(handleChange), []);

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
