import FilterDropdown from "./FilterDropdown";
import {SearchOutlined} from "@ant-design/icons";

const FilterGenerator = (props) => {
    return {
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <FilterDropdown
                dataIndex={props.dataIndex}
                setSelectedKeys={setSelectedKeys}
                selectedKeys={selectedKeys}
                confirm={confirm}
                clearFilters={clearFilters}
            />
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
    }
};

export default FilterGenerator;
