import {FormContext} from "../../Contexts/FormContext"
import {insertDecimal} from "../../Helpers/string"
import FormLabel from "../../Components/Typography/FormLabel"
import {Table} from "antd"
import {useContext} from "react"

const SalesOrderBreakDown = () => {
    const formContext = useContext(FormContext);

    // const initialValues = formContext.formState.initialValues;
    // const dataSource = initialValues.sales_order_lines ? initialValues.sales_order_lines.map((salesOrderLines) => {
    //     // return {
    //     //     key: salesOrderLines.id,
    //     //     product: salesOrderLines.product.name,
    //     //     quantity: salesOrderLines.quantity,
    //     //     unit_price: '₱ ' + insertDecimal(salesOrderLines.unit_price),
    //     //     subtotal: '₱ ' + insertDecimal(salesOrderLines.subtotal)
    //     // }
    // }) : [];
    //
    // function computeSubtotal(changedSalesOrderLine, allValues) {
    //     const salesOrderLines = allValues.sales_order_lines;
    //     let salesOrderLine = salesOrderLines[changedSalesOrderLine.key];
    //     if (changedSalesOrderLine.hasOwnProperty('unit_price')) {
    //         salesOrderLine.subtotal = salesOrderLine.quantity * changedSalesOrderLine.unit_price;
    //     } else if (changedSalesOrderLine.hasOwnProperty('quantity')) {
    //         salesOrderLine.subtotal = changedSalesOrderLine.quantity * salesOrderLine.unit_price;
    //     }
    //     salesOrderLines[changedSalesOrderLine.key] = salesOrderLine;
    //     form.setFieldsValue({
    //         sales_order_lines: salesOrderLines
    //     });
    //     const total = computeTotal(salesOrderLines);
    //     setState((prevState) => ({
    //         ...prevState,
    //         breakdown: {
    //             untaxedAmount: total,
    //             tax: 0,
    //             total: total,
    //         }
    //     }));
    // }
    //
    // function computeTotal(salesOrderLines) {
    //     return salesOrderLines.map((salesOrderLine) => (salesOrderLine.subtotal)).reduce((total, subtotal) => (total + subtotal));
    // }

    return (
        <Table
            dataSource={[
                {
                    key: '1',
                    label: 'Untaxed amount:',
                    // value: state.breakdown.untaxedAmount,
                    value: 11,
                },
                {
                    key: '2',
                    label: 'Taxed:',
                    // value: state.breakdown.tax,
                    value: 21,
                },
                {
                    key: '3',
                    label: 'Total:',
                    // value: state.breakdown.total,
                    value: 31,
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
