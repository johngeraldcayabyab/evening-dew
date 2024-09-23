import {FormContext} from "../../Contexts/FormContext"
import FormLabel from "../../Components/Typography/FormLabel"
import {Form, Table} from "antd"
import {useContext} from "react"
import {toCurrency} from "../../Helpers/string"
import {getBreakdownView} from "../../Helpers/settings"

const SalesOrderBreakDown = (props) => {
    const formContext = useContext(FormContext);
    const viewableBreakdown = getBreakdownView('sales_order');
    const salesOrderLines = Form.useWatch('sales_order_lines', formContext.form) ?? [];
    const discountRate = Form.useWatch('discount_rate', formContext.form) ?? 0;
    const discountType = Form.useWatch('discount_type', formContext.form) ?? 0;

    const breakdownComputedWithDiscount = {
        discount: 0,
        taxable_amount: 0,
        tax_amount: 0,
        subtotal: 0
    };

    salesOrderLines.forEach(salesOrderLine => {
        if (!salesOrderLine) {
            return;
        }
        if (salesOrderLine.discount) {
            breakdownComputedWithDiscount.discount += salesOrderLine.discount;
        }
        if (salesOrderLine.taxable_amount) {
            breakdownComputedWithDiscount.taxable_amount += salesOrderLine.taxable_amount;
        }
        if (salesOrderLine.tax_amount) {
            breakdownComputedWithDiscount.tax_amount += salesOrderLine.tax_amount;
        }
        if (salesOrderLine.subtotal) {
            breakdownComputedWithDiscount.subtotal += salesOrderLine.subtotal;
        }
        console.log(salesOrderLine);
    });

    const breakdownSource = [
        {
            key: 'discount',
            label: 'Discount:',
            value: toCurrency(breakdownComputedWithDiscount.discount),
        },
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
            key: 'total',
            label: 'Total:',
            value: toCurrency(breakdownComputedWithDiscount.subtotal),
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

// function computeBreakdown(salesOrderLinesComputedFormatted) {
//     const breakdownInitial = {
//         taxable_amount: 0,
//         tax_amount: 0,
//         total_discountable: 0,
//         total_non_discountable: 0,
//     };
//     if (salesOrderLinesComputedFormatted.length) {
//         salesOrderLinesComputedFormatted.forEach(breakBot => {
//             breakdownInitial.taxable_amount = breakdownInitial.taxable_amount + breakBot.taxable_amount;
//             breakdownInitial.tax_amount = breakdownInitial.tax_amount + breakBot.tax_amount;
//             if (breakBot.can_be_discounted) {
//                 breakdownInitial.total_discountable = breakdownInitial.total_discountable + breakBot.total;
//             } else {
//                 breakdownInitial.total_non_discountable = breakdownInitial.total_non_discountable + breakBot.total;
//             }
//         });
//     }
//     return breakdownInitial;
// }

export default SalesOrderBreakDown;
