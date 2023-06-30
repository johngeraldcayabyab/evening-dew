import {computeTax, getTax} from "./tax"

export const computeSalesOrderLineSubtotal = (salesOrderLines) => {
    return salesOrderLines.map((salesOrderLine) => {
        salesOrderLine.taxable_amount = 0;
        salesOrderLine.tax_amount = 0;
        salesOrderLine.subtotal = salesOrderLine.quantity * salesOrderLine.unit_price;
        if (salesOrderLine.tax_id) {
            const tax = getTax(salesOrderLine.tax_id, formContext.state.queries.taxes.options);
            salesOrderLine = computeTax(tax, salesOrderLine);
        }
        return salesOrderLine;
    });
}
