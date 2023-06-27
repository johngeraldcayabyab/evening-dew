import {FormContext} from "../../Contexts/FormContext"
import FormLabel from "../../Components/Typography/FormLabel"
import {Table} from "antd"
import {useContext} from "react"

const SalesOrderBreakDown = () => {
    const formContext = useContext(FormContext);
    return (
        <Table
            dataSource={[
                {
                    key: '1',
                    label: 'Taxable Amount:',
                    value: formContext.state.breakdown.taxableAmount,
                },
                {
                    key: '2',
                    label: 'Tax Amount:',
                    value: formContext.state.breakdown.taxAmount,

                },
                {
                    key: '3',
                    label: 'Total:',
                    value: formContext.state.breakdown.total,
                },
            ]}
            columns={[
                {
                    title: 'Label',
                    dataIndex: 'label',
                    key: 'label',
                    align: 'right',
                    render: (text, record) => {
                        return (<FormLabel>{text}</FormLabel>)
                    }
                },
                {
                    title: 'Value',
                    dataIndex: 'value',
                    key: 'value',
                    align: 'right',
                },
            ]}
            showHeader={false}
            pagination={false}
            size={'small'}
        />
    )
}

export default SalesOrderBreakDown;
