import {Input} from "antd"
import React, {useContext} from "react"
import {TableContext} from "../../../Contexts/TableContext"

const GlobalSearchFilter = () => {
    const tableContext = useContext(TableContext);
    return (
        <Input
            placeholder={`Search..`}
            onChange={(e) => {
                const params = {};
                tableContext.manifest.table.columns.forEach(column => {
                    if (column.hasOwnProperty('isGlobalSearch')) {
                        params[`global_${column.dataIndex}`] = e.target.value;
                    }
                });
                tableContext.render(params);
            }}
        />
    )
};

export default GlobalSearchFilter;
