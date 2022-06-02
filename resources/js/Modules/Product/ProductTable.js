import React, {useState} from 'react';
import useListHook from "../../Hooks/useListHook";
import manifest from "./__manifest__.json";
import TableCreateButton from "../../Components/TableButtons/TableCreateButton";
import ControlPanel from "../../Components/ControlPanel";
import ActionsDropdownButton from "../../Components/TableButtons/ActionsDropdownButton";
import TableSearchInput from "../../Components/TableSearchInput";
import CustomPagination from "../../Components/CustomPagination";
import CustomBreadcrumb from "../../Components/CustomBreadcrumb";
import {TableContextProvider} from "../../Contexts/TableContext";
import Cardination from "../../Components/Cardination";
import KanbanTablePicker from "../../Components/KanbanTablePicker";
import {Col, Row} from "antd";
import CustomTable from "../../Components/CustomTable";
import {KANBAN, TABLE} from "../../consts";

const ProductTable = () => {
    const [tableState, tableActions] = useListHook(manifest);
    const [dataState, setDataState] = useState({
        mode: KANBAN
    });
    return (
        <TableContextProvider value={{
            manifest: manifest,
            tableState: tableState,
            tableActions: tableActions,
            dataState: dataState,
            setDataState: setDataState,
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Internal Reference',
                    dataIndex: 'internal_reference',
                    key: 'internal_reference',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Sales Price',
                    dataIndex: 'sales_price',
                    key: 'sales_price',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Cost',
                    dataIndex: 'cost',
                    key: 'cost',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Measurement',
                    dataIndex: 'measurement',
                    key: 'measurement',
                    sorter: true,
                    searchFilter: true,
                    render: (text, record) => {
                        return record.measurement.name;
                    }
                },
                {
                    title: 'Product Category',
                    dataIndex: 'product_category',
                    key: 'product_category',
                    sorter: true,
                    searchFilter: true,
                    render: (text, record) => {
                        return record.product_category.category;
                    }
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    sorter: true,
                    searchFilter: true,
                },
                {
                    title: 'Created At',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: true,
                },
            ],
            kanban: {
                title: 'name',
                avatar: 'avatar',
                description: [
                    {
                        key: 'internal_reference',
                        render: (record) => {
                            return record.internal_reference ? `[${record.internal_reference}]` : null;
                        }
                    },
                    {
                        key: 'sales_price',
                        render: (record) => {
                            return `Price: $${record.sales_price}`;
                        }
                    },
                    {
                        key: 'quantity',
                        render: (record) => {
                            return `On hand: ${record.quantity} ${record.measurement.name}`;
                        }
                    }
                ]
            }
        }}>
            <ControlPanel
                topColOneLeft={<CustomBreadcrumb/>}
                topColTwoRight={<TableSearchInput/>}
                bottomColOneLeft={<TableCreateButton/>}
                bottomColOneRight={<ActionsDropdownButton/>}
                bottomColTwoRight={
                    <Row align={'right'}>
                        <Col span={20}><CustomPagination/></Col>
                        <Col span={4}><KanbanTablePicker/></Col>
                    </Row>
                }
            />
            {dataState.mode === TABLE ? <CustomTable/> : null}
            {dataState.mode === KANBAN ? <Cardination/> : null}
        </TableContextProvider>
    )
};

export default ProductTable;

