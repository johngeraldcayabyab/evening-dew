import {Button, Popconfirm, Space} from "antd";
import useFetchHook from "../Hooks/useFetchHook";
import useFetchCatcherHook from "../Hooks/useFetchCatcherHook";
import {PUT} from "../consts";
import manifest from "./SameDay/__manifest__.json";
import {TableContext} from "../Contexts/TableContext";
import {useContext} from "react";

const CustomSmNorthSteps = (props) => {
    const listContext = useContext(TableContext);
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    function handleStatusChange(e, record, value) {
        e.stopPropagation();
        useFetch(`api/${manifest.moduleName}/${record.id}/status`, PUT, {
            steps: value,
        }).then(() => {
            listContext.tableActions.renderData(listContext.tableState.params);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    return (<Space size={1}>
        <Button type={props.record.steps.includes("paid") ? 'primary' : 'default'} size={'small'} onClick={(e) => {
            e.stopPropagation();
            // handleStatusChange(e, props.record, 'paid')
        }}>
            <Popconfirm
                title={`Are you sure you want to change the paid status?`}
                okText={
                    'Yes'
                }
                onConfirm={(e) => {
                    handleStatusChange(e, props.record, 'paid');
                }}
                cancelText="No"
            >
                Paid
            </Popconfirm>
        </Button>
        <Button type={props.record.steps.includes("kitchen") ? 'primary' : 'default'} size={'small'} onClick={(e) => {
            handleStatusChange(e, props.record, 'kitchen')
        }}>Kitchen</Button>
        <Button type={props.record.steps.includes("delivered") ? 'primary' : 'default'} size={'small'} onClick={(e) => {
            handleStatusChange(e, props.record, 'delivered')
        }}>Ready for Pickup</Button>
    </Space>)
};

export default CustomSmNorthSteps;
