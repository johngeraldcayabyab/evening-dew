import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const TableFilterButton = (props) => {
    return (
        <div style={{padding: 8}}>
            <Input
                ref={node => {
                    this.searchInput = node;
                }}
                placeholder={`Search ${props.dataIndex}`}
                value={props.selectedKeys[0]}
                onChange={e => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => props.handleSearch(props.selectedKeys, confirm, dataIndex)}
                style={{marginBottom: 8, display: 'block'}}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => props.handleSearch(props.selectedKeys, confirm, props.dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90}}
                >
                    Search
                </Button>
                <Button onClick={() => props.handleReset(props.clearFilters)} size="small" style={{width: 90}}>
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
    )
}

export default TableFilterButton;
