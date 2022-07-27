import {Button, Space} from "antd";
import useFetchHook from "../Hooks/useFetchHook";
import useFetchCatcherHook from "../Hooks/useFetchCatcherHook";
import {PUT} from "../consts";
import manifest from "./SameDay/__manifest__.json";
import {TableContext} from "../Contexts/TableContext";
import {useContext} from "react";

const CustomStatusChanger = (props) => {
    const listContext = useContext(TableContext);
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    function handleStatusChange(e, record, value) {
        e.stopPropagation();
        useFetch(`api/${manifest.moduleName}/${record.id}/status`, PUT, {
            status: value,
        }).then(() => {
            listContext.tableActions.renderData(listContext.tableState.params);
        }).catch((responseErr) => {
            fetchCatcher.get(responseErr);
        });
    }

    return (<Space size={1}>
        <Button type={props.record.status === 'Paid' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
            handleStatusChange(e, props.record, 'Paid')
        }}>Paid</Button>
        <Button type={props.record.status === 'Sticker' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
            handleStatusChange(e, props.record, 'Sticker')
        }}>Sticker</Button>
        <Button type={props.record.status === 'Kitchen' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
            handleStatusChange(e, props.record, 'Kitchen')
        }}>Kitchen</Button>
        <Button type={props.record.status === 'Delivered' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
            handleStatusChange(e, props.record, 'Delivered')
        }}>Delivered</Button>
    </Space>)
};

export default CustomStatusChanger;
