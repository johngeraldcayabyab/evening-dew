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
        if (salesOrderLine && salesOrderLine.quantity && salesOrderLine.unit_price) {
            const salesOrderLineCompute = computeSalesOrderLineSubtotal(salesOrderLine, taxes);
            salesOrderLineCompute.can_be_discounted = salesOrderLine.product ? salesOrderLine.product.can_be_discounted : 1;
            salesOrderLinesComputation.push(salesOrderLineCompute);
        }
    });
    const salesOrderLinesComputedFormatted = salesOrderLinesComputation.map((salesOrderLineCompute) => ({
        taxableAmount: salesOrderLineCompute.taxable_amount,
        taxAmount: salesOrderLineCompute.tax_amount,
        total: salesOrderLineCompute.subtotal,
        can_be_discounted: salesOrderLineCompute.can_be_discounted
    }));
    const breakdownComputed = computeBreakdown(salesOrderLinesComputedFormatted);
    const breakdownComputedWithDiscount = computeDiscount(discountType, discountRate, breakdownComputed);
    const breakdownSource = [
        {
            key: 'taxable_amount',
            label: 'Taxable Amount:',
            // value: 0,
            value: toCurrency(breakdownComputedWithDiscount.taxableAmount),
        },
        {
            key: 'tax_amount',
            label: 'Tax Amount:',
            // value: 0,
            value: toCurrency(breakdownComputedWithDiscount.taxAmount),
        },
        {
            key: 'discount',
            label: 'Discount:',
            // value: 0,
            value: toCurrency(breakdownComputedWithDiscount.discount),
        },
        {
            key: 'total',
            label: 'Total:',
            // value: 0,
            value: toCurrency(breakdownComputedWithDiscount.total),
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

function computeBreakdown(salesOrderLinesComputedFormatted) {
    const breakdownInitial = {
        taxableAmount: 0,
        taxAmount: 0,
        totalDiscountable: 0,
        totalNonDiscountable: 0,
    };
    if (salesOrderLinesComputedFormatted.length) {
        salesOrderLinesComputedFormatted.forEach(breakBot => {
            breakdownInitial.taxableAmount = breakdownInitial.taxableAmount + breakBot.taxableAmount;
            breakdownInitial.taxAmount = breakdownInitial.taxAmount + breakBot.taxAmount;
            if (breakBot.can_be_discounted) {
                breakdownInitial.totalDiscountable = breakdownInitial.totalDiscountable + breakBot.total;
            } else {
                breakdownInitial.totalNonDiscountable = breakdownInitial.totalNonDiscountable + breakBot.total;
            }
        });
    }
    return breakdownInitial;
}

export default SalesOrderBreakDown;
