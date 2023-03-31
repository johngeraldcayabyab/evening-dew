import {Button, Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {replaceUnderscoreWithSpace, titleCase} from "../../Helpers/string";

const SearchFilter = (props) => {
    return (
        <div style={{padding: 8}}>
            <Space direction={"vertical"}>
                <Input
                    placeholder={`Search ${titleCase(replaceUnderscoreWithSpace(props.dataIndex))}`}
                    value={props.selectedKeys}
                    onChange={e => props.setSelectedKeys(e.target.value ? e.target.value : null)}
                    onPressEnter={(e) => {
                        props.confirm();
                        e.stopPropagation();
                    }}
                    // style={{marginBottom: 8, display: 'block'}}
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
            </Space>
        </div>
    )
};

export default SearchFilter;
