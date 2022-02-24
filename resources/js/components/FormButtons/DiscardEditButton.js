import {Button} from "antd";

const DiscardEditButton = (props) => {
    if (props.id && !props.formState.formDisabled) {
        return (
            <Button
                htmlType={"button"}
                type={"primary"}
                size={'default'}
                onClick={() => {
                    props.formActions.toggleEditMode();
                    // props.form.resetFields();
                    props.form.setFieldsValue(props.formState.initialValues);
                }}
            >
                Discard
            </Button>
        )
    }
    return null;
};

export default DiscardEditButton;
