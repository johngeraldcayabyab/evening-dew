import {Button, Checkbox, Dropdown} from "antd";
import React, {useContext, useState} from "react";
import {COLUMN_SELECTION} from "../../../consts";
import {MoreOutlined} from "@ant-design/icons";
import {TableContext} from "../../../Contexts/TableContext"

const ColumnSelectionFilter = () => {
    const [open, setOpen] = useState(false);
    const tableContext = useContext(TableContext);
    const handleMenuClick = (e) => {
        if (e.key === '3') {
            setOpen(false);
        }
    };
    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    function toggleColumn(column) {
        return tableContext.state.columns.map((newColumn) => {
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

    const items = tableContext.state.columns.map((column) => {
        if (column.key !== COLUMN_SELECTION && column.key !== 'column_actions') {
            return ({
                key: `${column.key}-column-item`,
                label: (
                    <Checkbox
                        key={`${column.key}-column-item-checkbox`}
                        checked={!column.hidden}
                        onClick={() => {
                            const columns = toggleColumn(column);
                            tableContext.setState(prevState => ({
                                ...prevState,
                                columns: columns
                            }));
                        }}>
                        {column.title}
                    </Checkbox>
                )
            })
        }
    });

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleMenuClick,
            }}
            onOpenChange={handleOpenChange}
            open={open}
        >
            <Button size={'small'} type={'text'} onClick={(e) => e.preventDefault()}>
                <MoreOutlined style={{color: 'grey', fontSize: '15px'}}/>
            </Button>
        </Dropdown>
    );
};

export default ColumnSelectionFilter;
