import {DatePicker, Input, Tooltip} from "antd";
import React, {useCallback} from "react";
import {SearchOutlined} from "@ant-design/icons";
import {debounce} from "../Helpers/debounce";
import moment from "moment";

const {RangePicker} = DatePicker;

const DATE_TIME_FORMAT = 'Y-m-d H:i:s';

const TableSearchInput = () => {
    const handleChange = (value) => {
        // props.renderData();
    };

    const optimizedFn = useCallback(debounce(handleChange, this), []);

    return (
        <RangePicker
            defaultValue={[moment(new Date(), DATE_TIME_FORMAT), moment(new Date(), DATE_TIME_FORMAT)]}
            style={{'width': '100%'}}
            size={'small'}
        />
    )

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
