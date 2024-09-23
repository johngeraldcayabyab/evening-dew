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

    const breakdownComputation = {
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
            breakdownComputation.discount += salesOrderLine.discount;
        }
        if (salesOrderLine.taxable_amount) {
            breakdownComputation.taxable_amount += salesOrderLine.taxable_amount;
        }
        if (salesOrderLine.tax_amount) {
            breakdownComputation.tax_amount += salesOrderLine.tax_amount;
        }
        if (salesOrderLine.subtotal) {
            breakdownComputation.subtotal += salesOrderLine.subtotal;
        }
    });

    if (discountType === 'fixed' && discountRate) {
        breakdownComputation.discount += discountRate;
        breakdownComputation.subtotal -= discountRate;
    } else if (discountType === 'percentage' && discountRate) {
        breakdownComputation.discount = (breakdownComputation.subtotal * discountRate) / 100;
        breakdownComputation.subtotal -= breakdownComputation.discount;
    }

    const breakdownSource = [
        {
            key: 'discount',
            label: 'Discount:',
            value: toCurrency(breakdownComputation.discount),
        },
        {
            key: 'taxable_amount',
            label: 'Taxable Amount:',
            value: toCurrency(breakdownComputation.taxable_amount),
        },
        {
            key: 'tax_amount',
            label: 'Tax Amount:',
            value: toCurrency(breakdownComputation.tax_amount),
        },
        {
            key: 'total',
            label: 'Total:',
            value: toCurrency(breakdownComputation.subtotal),
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
