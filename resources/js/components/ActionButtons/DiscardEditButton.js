import {Button} from "antd";

const DiscardEditButton = (props) => {
    if (props.id && !props.formState.formDisabled) {
        return (
            <Button
                htmlType={"button"}
                type={"primary"}
                className={"custom-button"}
                size={'small'}
                onClick={() => {
                    props.formActions.toggleEditMode();
                    props.form.resetFields();
                }}
            >
                Discard
            </Button>
        )
    }
    return null;
};

export default DiscardEditButton;
