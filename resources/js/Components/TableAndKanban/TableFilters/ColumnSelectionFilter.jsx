import {Button, Checkbox, Dropdown, Menu} from "antd";
import React, {useState} from "react";
import {COLUMN_SELECTION} from "../../../consts";
import {MoreOutlined} from "@ant-design/icons";

const ColumnSelectionFilter = (props) => {
    const [open, setOpen] = useState(false);
    const columns = props.state.columns;

    function handleMenuClick(e) {
        if (e.key === '3') {
            setOpen(false);
        }
    }

    function handleOnOpenChange(flag) {
        setOpen(flag);
    }

    function toggleColumn(column) {
        return columns.map((newColumn) => {
            if (column.dataIndex === newColumn.dataIndex) {
                if (newColumn.hasOwnProperty('hidden')) {
                    delete newColumn.hidden;
                } else {
                    newColumn.hidden = true;
                }
            }
            return newColumn;
        });
    }

    const menuItems = columns.map((column) => {
        if (column.key !== COLUMN_SELECTION) {
            return ({
                key: `${column.key}-column-item`,
                label: (
                    <Checkbox
                        key={`${column.key}-column-item-checkbox`}
                        checked={!column.hidden}
                        onClick={() => {
                            props.setState(prevState => ({
                                ...prevState,
                                columns: toggleColumn(column)
                            }));
                        }}>
                        {column.title}
                    </Checkbox>
                )
            })
        }
    });

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={menuItems}
        />
    );

    return (
        <Dropdown
            menu={menu}
            size={'small'}
            onOpenChange={handleOnOpenChange}
            open={open}
        >
            <Button size={'small'} type={'text'} onClick={(e) => e.preventDefault()}>
                <MoreOutlined style={{color: 'grey', fontSize: '15px'}}/>
            </Button>
        </Dropdown>
    )
};

export default ColumnSelectionFilter;