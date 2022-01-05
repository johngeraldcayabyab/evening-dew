import React, {useRef} from 'react';
import useListState from "../Hooks/useListState";
import manifest from "./__manifest__.json";
import TableCreateButton from "../components/ActionButtons/TableCreateButton";
import ControlPanel from "../components/ControlPanel";
import CustomTable from "../components/CustomTable";
import ActionsDropdownButton from "../components/ActionButtons/ActionsDropdownButton";
import CustomPagination from "../components/CustomPagination";
import TableSearchInput from "../components/TableSearchInput";
import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const MeasurementList = () => {

    const searchInput = useRef(null);

    function getColumnSearchProps(dataIndex) {
        return {
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div style={{padding: 8}}>
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                            Reset
                        </Button>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                confirm({closeDropdown: false});
                                // this.setState({
                                //     searchText: selectedKeys[0],
                                //     searchedColumn: dataIndex,
                                // });
                            }}
                        >
                            Filter
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
            onFilter: (value, record) => {
                return true;
                console.log(value);
                // return record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '';
            },
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => searchInput.select(), 100);
                }
            },
            // render: text =>
            //     this.state.searchedColumn === dataIndex ? (
            //         <Highlighter
            //             highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
            //             searchWords={[this.state.searchText]}
            //             autoEscape
            //             textToHighlight={text ? text.toString() : ''}
            //         />
            //     ) : (
            //         text
            //     ),
        }
    }

    function handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        // this.setState({
        //     searchText: selectedKeys[0],
        //     searchedColumn: dataIndex,
        // });
    }

    function handleReset(clearFilters) {
        clearFilters();
        // this.setState({searchText: ''});
    }

    const [tableState, tableActions, columns] = useListState(manifest, [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
                ...getColumnSearchProps('name')
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: true,
            },
            {
                title: 'Ratio',
                dataIndex: 'ratio',
                key: 'ratio',
                sorter: true,
            },
            {
                title: 'Rounding Precision',
                dataIndex: 'rounding_precision',
                key: 'rounding_precision',
                sorter: true,
            },
            {
                title: 'Category',
                dataIndex: 'measurement_category',
                key: 'measurement_category',
                sorter: true,
                render: (text, record) => {
                    return record.measurement_category.name;
                }
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                sorter: true,
            }
        ]
    );

    return (
        <React.Fragment>
            <ControlPanel
                topColTwoRight={
                    <TableSearchInput
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColOneLeft={<TableCreateButton manifest={manifest}/>}
                bottomColOneRight={
                    <ActionsDropdownButton
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
                bottomColTwoRight={
                    <CustomPagination
                        {...tableState}
                        {...tableActions}
                        manifest={manifest}
                    />
                }
            />
            <CustomTable
                {...tableState}
                {...tableActions}
                columns={columns}
                manifest={manifest}
            />
        </React.Fragment>
    )
};

export default MeasurementList;
