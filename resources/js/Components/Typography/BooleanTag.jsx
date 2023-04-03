import {Tag} from "antd"

const BooleanTag = (props) => {
    const text = props.text;
    const record = props.record;
    const field = props.field;
    const fieldValue = record[field];
    const tag = props.tags.filter((tag) => {
        if (Number(tag.value) === Number(fieldValue)) {
            return tag;
        }
    })[0];
    return <Tag color={tag.color}>{tag.label}</Tag>;
};

export default BooleanTag;
