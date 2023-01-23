import {Button, Select, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const SelectFilter = (props) => {
    return (
        <div style={{padding: 8}}>
            <Space direction={"vertical"}>
                <Select
                    defaultValue={0}
                    style={{width: '100%'}}
                    onChange={(value) => {
                        props.setSelectedKeys(value ? value : null);
                        props.confirm();
                    }}
                    options={[
                        {label: 'Please select', value: 0},
                        ...props.options
                    ]}
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
                            props.setSelectedKeys(0);
                            props.clearFilters();
                            props.confirm();
                        }}
                        size={"small"}
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                </Space>
            </Space>
        </div>
    )
};

export default SelectFilter;
