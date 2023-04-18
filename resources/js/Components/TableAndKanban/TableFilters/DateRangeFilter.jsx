import {Button, DatePicker, Input, Space} from "antd";
import {replaceUnderscoreWithSpace, titleCase} from "../../../Helpers/string";
import {SearchOutlined} from "@ant-design/icons";
// import moment from "moment";

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const DateRangeFilter = (props) => {
    return (
        <div style={{padding: 8}}>
            <RangePicker
                onChange={e => {
                    const date1 = e[0].format('YYYY-MM-DD') + ' 00:00:00';
                    const date2 = e[1].format('YYYY-MM-DD') + ' 23:59:59';
                    return props.setSelectedKeys(`${date1},${date2}`);
                }}
                style={{marginBottom: 8, display: 'block'}}
                // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                format={dateFormat}
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
}

export default DateRangeFilter;
