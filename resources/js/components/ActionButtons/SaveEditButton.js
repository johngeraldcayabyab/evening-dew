import {Button} from "antd";

const SaveEditButton = (props) => {
    if (props.id && !props.formState.formDisabled) {
        return (
            <Button
                htmlType={"submit"}
                type={"primary"}
                // className={"custom-button"}
                size={'default'}
            >
                Save
            </Button>
        )
    }
    return null;
};

export default SaveEditButton;
