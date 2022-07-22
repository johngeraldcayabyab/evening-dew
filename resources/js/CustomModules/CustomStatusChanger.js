import {Button, Space} from "antd";
import {useContext} from 'react';
import useFetchHook from "../Hooks/useFetchHook";
import useFetchCatcherHook from "../Hooks/useFetchCatcherHook";
import {TableContext} from "../Contexts/TableContext";
import {COLUMN_SELECTION, DATE_RANGE, DELETE, SEARCH, PUT} from "../consts";

const CustomStatusChanger = (props) => {
    const listContext = useContext(TableContext);

    const record = props.record;
    const useFetch = useFetchHook();
    const fetchCatcher = useFetchCatcherHook();

    function handleStatusChange(e, record, value) {
        e.stopPropagation();
        useFetch(`api/${listContext.manifest.moduleName}/${record.id}/status`, PUT, {
            status: value
        }).then(() => {
            // console.log(tableState.params);
            listContext.tableActions.renderData();
        }).catch((responseErr) => {
            // handleFormErrors(responseErr);
        });
    }


    return (
        <Space size={1}>
            <Button type={record.status === 'Paid' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
                handleStatusChange(e, record, 'Paid')
            }}>Paid</Button>
            <Button type={record.status === 'Sticker' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
                handleStatusChange(e, record, 'Sticker')
            }}>Sticker</Button>
            <Button type={record.status === 'Kitchen' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
                handleStatusChange(e, record, 'Kitchen')
            }}>Kitchen</Button>
            <Button type={record.status === 'Delivered' ? 'primary' : 'default'} size={'small'} onClick={(e) => {
                handleStatusChange(e, record, 'Delivered')
            }}>Delivered</Button>
        </Space>
    )
};

export default CustomStatusChanger;
