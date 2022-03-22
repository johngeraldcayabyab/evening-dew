import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const FilterDropdown = (props) => {
    return (
        <div style={{padding: 8}}>
            <Input
                placeholder={`Search ${props.dataIndex}`}
                value={props.selectedKeys}
                onChange={e => props.setSelectedKeys(e.target.value ? e.target.value : null)}
                onPressEnter={() => {
                    props.confirm();
                }}
                style={{marginBottom: 8, display: 'block'}}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        props.confirm();
                    }}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => {
                        props.clearFilters();
                        props.confirm();
                    }}
                    size={"small"}
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </Space>
        </div>
    )
};

export default FilterDropdown;
