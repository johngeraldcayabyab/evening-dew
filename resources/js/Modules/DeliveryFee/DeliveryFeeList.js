import React from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import CustomTable from "../../Components/CustomTable";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import CustomPagination from "../../Components/CustomPagination";
import TableSearchInput from "../../Components/TableSearchInput";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {ListContextProvider} from "../../Contexts/ListContext";
import {Tag} from "antd";

const DeliveryFeeList = () => {
    const [tableState, tableActions] = useListHook(manifest);
    return (
        <ListContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Fee',
                    dataIndex: 'product',
                    key: 'product',
                    sorter: true,
                    searchFilter: true,
                    render: (text, record) => {
                        return record.product.sales_price;
                    }
                },
                {
                    title: 'Enabled',
                    dataIndex: 'is_enabled',
                    key: 'is_enabled',
                    sorter: true,
                    searchFilter: true,
                    render: (text, record) => {
                        if(record.is_enabled){
                            return <Tag color={'success'}>Yes</Tag>;
                        }
                        return <Tag color={'default'}>No</Tag>;
                    }
                },
            ]
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={<TableSearchInput/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={<CustomPagination/>}
            />
            <CustomTable/>
        </ListContextProvider>
    )
};

export default DeliveryFeeList;
