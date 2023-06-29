import {FormContext} from "../../Contexts/FormContext"
import FormLabel from "../../Components/Typography/FormLabel"
import {Form, Table} from "antd"
import {useContext} from "react"
import {insertDecimal} from "../../Helpers/string"

const SalesOrderBreakDown = () => {
    const formContext = useContext(FormContext);
    const salesOrderLines = Form.useWatch('sales_order_lines', formContext.form) ?? [];
    const discountRate = Form.useWatch('discount_rate', formContext.form) ?? 0;
    const discountType = Form.useWatch('discount_type', formContext.form) ?? 0;
    const globalSettings = JSON.parse(localStorage.getItem('globalSettings'));
    const currency = globalSettings.hasOwnProperty('currency') ? globalSettings.currency : null;
    const currencySymbol = `${currency.symbol ? currency.symbol : ''} `;
    const salesOrderLinesComputation = [];
    salesOrderLines.forEach((salesOrderLine) => {
        if (salesOrderLine) {
            salesOrderLine.taxable_amount = 0;
            salesOrderLine.tax_amount = 0;
            salesOrderLine.subtotal = salesOrderLine.quantity * salesOrderLine.unit_price;
            if (salesOrderLine.tax_id) {
                const tax = getTax(salesOrderLine.tax_id, formContext.state.queries.taxes.options);
                if (tax.computation === 'fixed') {
                    salesOrderLine.tax_amount = tax.amount * salesOrderLine.quantity;
                    salesOrderLine.taxable_amount = salesOrderLine.subtotal;
                    if (tax.included_in_price) {
                        salesOrderLine.taxable_amount = salesOrderLine.taxable_amount - salesOrderLine.tax_amount;
                    } else {
                        salesOrderLine.subtotal = salesOrderLine.subtotal + salesOrderLine.tax_amount;
                    }
                } else if (tax.computation === 'percentage_of_price') {
                    salesOrderLine.tax_amount = (salesOrderLine.subtotal * tax.amount) / 100;
                    salesOrderLine.taxable_amount = salesOrderLine.subtotal;
                    if (tax.included_in_price) {
                        salesOrderLine.taxable_amount = salesOrderLine.taxable_amount - salesOrderLine.tax_amount;
                    } else {
                        salesOrderLine.subtotal = salesOrderLine.subtotal + salesOrderLine.tax_amount;
                    }
                }
            }
            salesOrderLinesComputation.push(salesOrderLine);
        }
    });

    let breakdown = salesOrderLinesComputation.map((salesOrderLine) => ({
        taxableAmount: salesOrderLine.taxable_amount,
        taxAmount: salesOrderLine.tax_amount,
        discount: 0,
        total: salesOrderLine.subtotal
    }));
    if (salesOrderLinesComputation.length) {
        breakdown = breakdown.reduce((salesOrderLine, preBreakDown) => ({
            taxableAmount: salesOrderLine.taxableAmount + preBreakDown.taxableAmount,
            taxAmount: salesOrderLine.taxAmount + preBreakDown.taxAmount,
            discount: 0,
            total: salesOrderLine.total + preBreakDown.total
        }))
    }
    if (discountType === 'fixed' && discountRate) {
        breakdown.discount = discountRate;
        breakdown.total = breakdown.total - breakdown.discount;
    } else if (discountType === 'percentage' && discountRate) {
        breakdown.discount = (breakdown.total * discountRate) / 100;
        breakdown.total = breakdown.total - breakdown.discount;
    }


    function getTax(id, taxes) {
        if (taxes.length) {
            return taxes.find(tax => tax.id === id);
        }
        return false;
    }

    const dataSource = [
        {
            key: 'taxable_amount',
            label: 'Taxable Amount:',
            value: currencySymbol + insertDecimal(breakdown.taxableAmount ?? 0),
        },
        {
            key: 'tax_amount',
            label: 'Tax Amount:',
            value: currencySymbol + insertDecimal(breakdown.taxAmount ?? 0),
        },
        {
            key: 'discount',
            label: 'Discount:',
            value: currencySymbol + insertDecimal(breakdown.discount ?? 0),
        },
        {
            key: 'total',
            label: 'Total:',
            value: currencySymbol + insertDecimal(breakdown.total ?? 0),
        },
    ];

    return (
        <Table
            dataSource={dataSource}
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
