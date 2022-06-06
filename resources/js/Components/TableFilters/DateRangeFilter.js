import {Button, DatePicker, Input, Space} from "antd";
import {replaceUnderscoreWithSpace, titleCase} from "../../Helpers/string";
import {SearchOutlined} from "@ant-design/icons";
import moment from "moment";

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const DateRangeFilter = (props) => {
    return (
        <div style={{padding: 8}}>
            <RangePicker
                onChange={e => {
                    console.log(e[0].format(dateFormat));
                    console.log(e[1].format(dateFormat));
                    // console.log(e);
                }}
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


    return (
        <RangePicker
            // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
        />
    )
}

export default DateRangeFilter;
