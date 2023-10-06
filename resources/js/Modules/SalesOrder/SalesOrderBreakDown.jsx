import {FormContext} from "../../Contexts/FormContext"
import FormLabel from "../../Components/Typography/FormLabel"
import {Form, Table} from "antd"
import {useContext} from "react"
import {toCurrency} from "../../Helpers/string"
import {computeDiscount, computeTax, getTax} from "../../Helpers/financial"
import {computeSalesOrderLineSubtotal} from "../../Helpers/salesOrderLine"

const SalesOrderBreakDown = (props) => {
    const formContext = useContext(FormContext);
    const salesOrderLines = Form.useWatch('sales_order_lines', formContext.form) ?? [];
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings'));
    const discountRate = Form.useWatch('discount_rate', formContext.form) ?? 0;
    const discountType = Form.useWatch('discount_type', formContext.form) ?? 0;
    const taxes = formContext.state.queries.taxes.options;
    const viewableBreakdown = globalSettings.hasOwnProperty('sales_order_breakdown_view') ? globalSettings.sales_order_breakdown_view.split(',') : null;

    const salesOrderLinesComputation = [];
    salesOrderLines.forEach((salesOrderLine) => {
        if (salesOrderLine) {
            const salesOrderLineCompute = computeSalesOrderLineSubtotal(salesOrderLine, taxes);
            salesOrderLineCompute.can_be_discounted = salesOrderLine.product ? salesOrderLine.product.can_be_discounted : 1;
            salesOrderLinesComputation.push(salesOrderLineCompute);
        }
    });
    const initialBreakdown = salesOrderLinesComputation.map((salesOrderLineCompute) => ({
        taxableAmount: salesOrderLineCompute.taxable_amount,
        taxAmount: salesOrderLineCompute.tax_amount,
        discount: 0,
        total: salesOrderLineCompute.subtotal,
        can_be_discounted: salesOrderLineCompute.can_be_discounted
    }));
    const breakdownComputed = computeBreakdown(salesOrderLinesComputation, initialBreakdown);
    // const breakdownComputedWithDiscount = computeDiscount(discountType, discountRate, breakdownComputed);

    const breakdownSource = [
        {
            key: 'taxable_amount',
            label: 'Taxable Amount:',
            value: toCurrency(breakdownComputed.taxableAmount),
        },
        {
            key: 'tax_amount',
            label: 'Tax Amount:',
            value: toCurrency(breakdownComputed.taxAmount),
        },
        {
            key: 'discount',
            label: 'Discount:',
            value: toCurrency(breakdownComputed.discount),
        },
        {
            key: 'total',
            label: 'Total:',
            value: toCurrency(breakdownComputed.total),
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

function computeBreakdown(salesOrderLinesComputation, breakdown) {
    if (salesOrderLinesComputation.length) {
        return breakdown.reduce((salesOrderLine, preBreakDown) => {
            const newTaxableAmount = salesOrderLine.taxableAmount + preBreakDown.taxableAmount;
            const newTaxAmount = salesOrderLine.taxAmount + preBreakDown.taxAmount;
            const newTotal = salesOrderLine.total + preBreakDown.total;
            const newNonDiscountable = salesOrderLine.can_be_discounted ? salesOrderLine.total + preBreakDown.total : salesOrderLine.total;
            return {
                taxableAmount: newTaxableAmount,
                taxAmount: newTaxAmount,
                discount: 0,
                total: newTotal,
                total_non_discountable: newNonDiscountable
            };
        });
    }
    return breakdown;
}

export default SalesOrderBreakDown;
