import {Skeleton} from "antd";

const CustomInputSkeleton = (props) => {
    return (
        <Skeleton.Input
            className={'ant-skeleton-element-custom'}
            style={{display: 'block', width: '100%'}}
            active={true}
            size={props.size ? props.size : 'small'}
        />
    )
};

export default CustomInputSkeleton;
