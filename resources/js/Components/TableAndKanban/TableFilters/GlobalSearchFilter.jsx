import {Input} from "antd"
import React, {useContext} from "react"
import {TableContext} from "../../../Contexts/TableContext"

const GlobalSearchFilter = () => {
    const listContext = useContext(TableContext);
    return (
        <Input
            placeholder={`Search..`}
            onChange={(e) => {
                const params = {};
                listContext.columns.forEach(column => {
                    if (column.hasOwnProperty('isGlobalSearch')) {
                        params[`global_${column.dataIndex}`] = e.target.value;
                    }
                });
                listContext.tableActions.renderData(params);
            }}
        />
    )
};

export default GlobalSearchFilter;
