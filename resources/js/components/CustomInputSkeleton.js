import {Skeleton} from "antd";

const CustomInputSkeleton = () => {
    return (
        <Skeleton.Input
            className={'ant-skeleton-element-custom'}
            style={{display: 'block', width: '100%'}}
            active={true}
            size={'small'}
        />
    )
};

export default CustomInputSkeleton;
