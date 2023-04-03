import Text from "antd/es/typography/Text"

const SequenceNumber = (props) => {
    const text = props.text;
    const record = props.record;
    const field = props.field;
    const fieldValue = record[field];
    return (
        <Text strong>
            <span style={{fontSize: '12px'}}>
                {fieldValue}
            </span>
        </Text>
    );
};

export default SequenceNumber;
