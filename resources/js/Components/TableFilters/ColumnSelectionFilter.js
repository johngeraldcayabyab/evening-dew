import {Checkbox, Space} from "antd";
import React from "react";
import {uuidv4} from "../../Helpers/string";
import {COLUMN_SELECTION} from "../../consts";

const ColumnSelectionFilter = (props) => {
    const columns = props.state.columns;
    return (
        <div style={{padding: 8}}>
            <Space
                direction="vertical"
                size="middle"
            >
                {columns.map((column) => {
                    if (column.key !== COLUMN_SELECTION) {
                        return (
                            <Checkbox key={uuidv4()} checked={!column.hidden} onClick={() => {
                                const newColumns = columns.map((newColumn) => {
                                    if (column.dataIndex === newColumn.dataIndex) {
                                        if (newColumn.hasOwnProperty('hidden')) {
                                            delete newColumn.hidden;
                                        } else {
                                            newColumn.hidden = true;
                                        }
                                    }
                                    return newColumn;
                                });
                                props.setState(prevState => ({
                                    ...prevState,
                                    columns: newColumns
                                }));
                            }}>{column.title}</Checkbox>
                        )
                    }
                })}
            </Space>
        </div>
    );
};

export default ColumnSelectionFilter;
