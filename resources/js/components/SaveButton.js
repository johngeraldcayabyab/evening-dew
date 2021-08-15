import {Button} from "antd";

const SaveButton = (props) => {
    if (props.id && !props.formState.formDisabled) {
        return (
            <Button
                htmlType={"submit"}
                type={"primary"}
                className={"custom-button"}
                size={'small'}
            >
                Save
            </Button>
        )
    }
    return null;
};

export default SaveButton;
