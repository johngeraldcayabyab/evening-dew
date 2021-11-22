import {Button} from "antd";

const SaveCreateButton = (props) => {
    if (!props.id && !props.formState.formDisabled) {
        return (
            <Button
                htmlType={"submit"}
                type={"primary"}
                size={'default'}
            >
                Save
            </Button>
        )
    }
    return null;
};

export default SaveCreateButton;
