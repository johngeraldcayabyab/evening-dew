import {computeTax, getTax} from "./financial"

export const computeSalesOrderLineSubtotal = (salesOrderLine, taxes) => {
    if (salesOrderLine) {
        salesOrderLine.taxable_amount = 0;
        salesOrderLine.tax_amount = 0;
        if (salesOrderLine.quantity && salesOrderLine.unit_price) {
            salesOrderLine.subtotal = salesOrderLine.quantity * salesOrderLine.unit_price;
            if (salesOrderLine.tax_id) {
                const tax = getTax(salesOrderLine.tax_id, taxes);
                salesOrderLine = computeTax(tax, salesOrderLine);
            }
        }
        const discountType = salesOrderLine.discount_type;
        const discountRate = parseFloat(salesOrderLine.discount_rate);
        if (discountType && discountRate) {
            if (discountType === 'fixed') {
                salesOrderLine.subtotal = salesOrderLine.subtotal - discountRate;
            } else if (discountType === 'percentage') {
                salesOrderLine.subtotal = salesOrderLine.subtotal - ((salesOrderLine.subtotal * discountRate) / 100);
            }
        }
    }
    return salesOrderLine;
}
