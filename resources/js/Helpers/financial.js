export const getTax = (id, taxes) => {
    if (taxes.length) {
        return taxes.find(tax => tax.id === id);
    }
    return false;
}

export const computeTax = (tax, orderLine) => {
    if (tax.computation === 'fixed') {
        orderLine.tax_amount = tax.amount * orderLine.quantity;
        orderLine.taxable_amount = orderLine.subtotal;
        if (tax.included_in_price) {
            orderLine.taxable_amount = orderLine.taxable_amount - orderLine.tax_amount;
        } else {
            orderLine.subtotal = orderLine.subtotal + orderLine.tax_amount;
        }
    } else if (tax.computation === 'percentage_of_price') {
        orderLine.tax_amount = (orderLine.subtotal * tax.amount) / 100;
        orderLine.taxable_amount = orderLine.subtotal;
        if (tax.included_in_price) {
            orderLine.taxable_amount = orderLine.taxable_amount - orderLine.tax_amount;
        } else {
            orderLine.subtotal = orderLine.subtotal + orderLine.tax_amount;
        }
    }
    return orderLine;
}
