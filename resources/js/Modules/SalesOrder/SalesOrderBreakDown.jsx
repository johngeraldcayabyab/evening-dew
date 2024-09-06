import {FormContext} from "../../Contexts/FormContext"
import FormLabel from "../../Components/Typography/FormLabel"
import {Form, Table} from "antd"
import {useContext} from "react"
import {toCurrency} from "../../Helpers/string"
import {
    computeDiscount,
    computeLineDiscount,
    computeSalesOrderLineSubtotal,
    getComputationSettings
} from "../../Helpers/financial"
import {getGlobalSettings} from "../../Helpers/settings"

const SalesOrderBreakDown = (props) => {
    const formContext = useContext(FormContext);
    const salesOrderLines = Form.useWatch('sales_order_lines', formContext.form) ?? [];
    const globalSettings = getGlobalSettings();
    const discountRate = Form.useWatch('discount_rate', formContext.form) ?? 0;
    const discountType = Form.useWatch('discount_type', formContext.form) ?? 0;
    const taxes = formContext.state.queries.taxes.options;
    const viewableBreakdown = globalSettings.hasOwnProperty('sales_order_breakdown_view') ? globalSettings.sales_order_breakdown_view.split(',') : null;

    const salesOrderLinesComputation = [];
    const salesOrderComputationSettings = getComputationSettings('sales_order');
    salesOrderLines.forEach((salesOrderLine) => {
        if (salesOrderLine && salesOrderLine.quantity && salesOrderLine.unit_price) {
            const salesOrderLineCompute = computeSalesOrderLineSubtotal(salesOrderLine, taxes, salesOrderComputationSettings);
            salesOrderLineCompute.can_be_discounted = salesOrderLine.product ? salesOrderLine.product.can_be_discounted : 1;
            salesOrderLinesComputation.push(salesOrderLineCompute);
        }
    });
    const salesOrderLinesComputedFormatted = salesOrderLinesComputation.map((salesOrderLineCompute) => ({
        taxable_amount: salesOrderLineCompute.taxable_amount,
        tax_amount: salesOrderLineCompute.tax_amount,
        total: salesOrderLineCompute.subtotal,
        can_be_discounted: salesOrderLineCompute.can_be_discounted
    }));
    const breakdownComputed = computeBreakdown(salesOrderLinesComputedFormatted);
    const breakdownComputedWithDiscount = computeDiscount(discountType, discountRate, breakdownComputed);


    if (salesOrderLines && salesOrderLines.length) {
        let totalLineDiscounts = 0;
        salesOrderLines.forEach(salesOrderLine => {
            if (salesOrderLine) {
                totalLineDiscounts += computeLineDiscount(salesOrderLine, salesOrderComputationSettings).discount;
            }
        });
        breakdownComputedWithDiscount.discount = breakdownComputedWithDiscount.discount + totalLineDiscounts;
    }


    const breakdownSource = [
        {
            key: 'taxable_amount',
            label: 'Taxable Amount:',
            value: toCurrency(breakdownComputedWithDiscount.taxable_amount),
        },
        {
            key: 'tax_amount',
            label: 'Tax Amount:',
            value: toCurrency(breakdownComputedWithDiscount.tax_amount),
        },
        {
            key: 'discount',
            label: 'Discount:',
            value: toCurrency(breakdownComputedWithDiscount.discount),
        },
        {
            key: 'total',
            label: 'Total:',
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
        taxable_amount: 0,
        tax_amount: 0,
        total_discountable: 0,
        total_non_discountable: 0,
    };
    if (salesOrderLinesComputedFormatted.length) {
        salesOrderLinesComputedFormatted.forEach(breakBot => {
            breakdownInitial.taxable_amount = breakdownInitial.taxable_amount + breakBot.taxable_amount;
            breakdownInitial.tax_amount = breakdownInitial.tax_amount + breakBot.tax_amount;
            if (breakBot.can_be_discounted) {
                breakdownInitial.total_discountable = breakdownInitial.total_discountable + breakBot.total;
            } else {
                breakdownInitial.total_non_discountable = breakdownInitial.total_non_discountable + breakBot.total;
            }
        });
    }
    return breakdownInitial;
}

export default SalesOrderBreakDown;
