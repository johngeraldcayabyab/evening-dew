import {Button, Checkbox, Dropdown, Menu, Space} from "antd";
import React, {useState} from "react";
import {uuidv4} from "../../Helpers/string";
import {COLUMN_SELECTION} from "../../consts";
import {MoreOutlined} from "@ant-design/icons";

const ColumnSelectionFilter = (props) => {
    const [visible, setVisible] = useState(false);

    const handleMenuClick = (e) => {
        if (e.key === '3') {
            setVisible(false);
        }
    };

    const handleVisibleChange = (flag) => {
        setVisible(flag);
    };


    const columns = props.state.columns;

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={
                columns.map((column) => {
                    if (column.key !== COLUMN_SELECTION) {
                        return ({
                            key: uuidv4(),
                            label: (
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
                        })
                    }
                })
            }
        />
    );

    return (
        <Dropdown overlay={menu} size={'small'} onVisibleChange={handleVisibleChange} visible={visible}>
            <Button size={'small'} type={'text'} onClick={(e) => e.preventDefault()}>
                <MoreOutlined style={{color: 'grey', fontSize: '15px'}}/>
            </Button>
        </Dropdown>
    )
};

export default ColumnSelectionFilter;
