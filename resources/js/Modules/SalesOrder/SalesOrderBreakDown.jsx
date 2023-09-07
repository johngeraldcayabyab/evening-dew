import {FormContext} from "../../Contexts/FormContext"
import FormLabel from "../../Components/Typography/FormLabel"
import {Form, Table} from "antd"
import {useContext} from "react"
import {toCurrency} from "../../Helpers/string"
import {computeDiscount, computeTax, getTax} from "../../Helpers/financial"

const SalesOrderBreakDown = (props) => {
    const formContext = useContext(FormContext);
    const salesOrderLines = Form.useWatch('sales_order_lines', formContext.form) ?? [];
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings'));
    const discountRate = Form.useWatch('discount_rate', formContext.form) ?? 0;
    const discountType = Form.useWatch('discount_type', formContext.form) ?? 0;
    const salesOrderLinesComputation = [];
    const taxes = formContext.state.queries.taxes.options;
    const viewableBreakdown = globalSettings.hasOwnProperty('sales_order_breakdown_view') ? globalSettings.sales_order_breakdown_view.split(',') : null;
    salesOrderLines.forEach((salesOrderLine, key) => {
        if (salesOrderLine) {
            salesOrderLine.taxable_amount = 0;
            salesOrderLine.tax_amount = 0;
            salesOrderLine.subtotal = salesOrderLine.quantity * salesOrderLine.unit_price;
            salesOrderLine.can_be_discounted = salesOrderLine.product.can_be_discounted;
            if (salesOrderLine.tax_id) {
                const tax = getTax(salesOrderLine.tax_id, taxes);
                salesOrderLine = computeTax(tax, salesOrderLine);
            }
            salesOrderLinesComputation.push(salesOrderLine);
        }
    });

    let breakdown = salesOrderLinesComputation.map((salesOrderLine) => ({
        taxableAmount: salesOrderLine.taxable_amount,
        taxAmount: salesOrderLine.tax_amount,
        discount: 0,
        total: salesOrderLine.subtotal,
        can_be_discounted: salesOrderLine.can_be_discounted
    }));
    if (salesOrderLinesComputation.length) {
        breakdown = breakdown.reduce((salesOrderLine, preBreakDown) => ({
            taxableAmount: salesOrderLine.taxableAmount + preBreakDown.taxableAmount,
            taxAmount: salesOrderLine.taxAmount + preBreakDown.taxAmount,
            discount: 0,
            total: salesOrderLine.total + preBreakDown.total
        }));
    }
    breakdown = computeDiscount(discountType, discountRate, breakdown);

    const breakdownSource = [
        {
            key: 'taxable_amount',
            label: 'Taxable Amount:',
            value: toCurrency(breakdown.taxableAmount),
        },
        {
            key: 'tax_amount',
            label: 'Tax Amount:',
            value: toCurrency(breakdown.taxAmount),
        },
        {
            key: 'discount',
            label: 'Discount:',
            value: toCurrency(breakdown.discount),
        },
        {
            key: 'total',
            label: 'Total:',
            value: toCurrency(breakdown.total),
        },
    ];

    const filteredBreakdownSource = [];

    breakdownSource.forEach(breakdownLine => {
        if (viewableBreakdown.includes(breakdownLine.key)) {
            filteredBreakdownSource.push(breakdownLine);
        }
    });

    return (
        <Table
            style={props.style}
            dataSource={filteredBreakdownSource}
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
