import {Skeleton} from "antd";
import {useEffect, useState} from "react";

const CustomInputSkeleton = (props) => {

    const [state, setState] = useState({
        size: 'small'
    });

    useEffect(() => {
        setState((prevState) => {
            if (props.size === 'medium') {
                prevState.size = 'default';
            } else if (props.size === 'large') {
                prevState.size = 'large';
            }
            return {...prevState};
        });
    }, [props.size]);

    return (
        <Skeleton.Input
            className={'ant-skeleton-element-custom'}
            style={{display: 'block', width: '100%'}}
            active={true}
            size={state.size}
        />
    )
};

export default CustomInputSkeleton;
