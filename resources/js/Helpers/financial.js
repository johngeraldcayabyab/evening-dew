export const getTax = (id, taxes) => {
    if (taxes.length) {
        return taxes.find(tax => tax.id === id);
    }
    return false;
}

export const computeTax = (taxes, line) => {
    if (!line.tax_id) {
        return line;
    }
    const tax = getTax(line.tax_id, taxes);
    if (!tax) {
        return line;
    }
    line.taxable_amount = line.subtotal;
    if (tax.computation === 'fixed') {
        line.tax_amount = tax.amount;
        if (tax.included_in_price) {
            line.taxable_amount = line.taxable_amount - line.tax_amount;
        } else {
            line.subtotal = line.subtotal + line.tax_amount;
        }
    } else if (tax.computation === 'percentage_of_price') {
        line.tax_amount = (line.subtotal * tax.amount) / 100;
        if (tax.included_in_price) {
            line.taxable_amount = line.taxable_amount - line.tax_amount;
        } else {
            line.subtotal = line.subtotal + line.tax_amount;
        }
    }
    return line;
}

export const computeLineDiscount = (line) => {
    const computation = {
        discounted_unit_price: line.unit_price,
        subtotal: line.subtotal,
        discount: 0
    };
    const discountType = line.discount_type;
    const discountRate = parseFloat(line.discount_rate);
    if (!discountType || !discountRate) {
        return {
            ...line,
            ...computation
        };
    }
    if (discountType === 'fixed') {
        computation.discounted_unit_price -= line.discount_rate;
        computation.discount = line.discount_rate * line.quantity;
        computation.subtotal -= computation.discount;
    } else if (discountType === 'percentage') {
        computation.discounted_unit_price -= (line.unit_price * discountRate) / 100;
        computation.discount = (line.unit_price * discountRate / 100) * line.quantity;
        computation.subtotal -= computation.discount;
    }
    return {
        ...line,
        ...computation
    };
}

export const computeSalesOrderLineSubtotal = (salesOrderLine, taxes) => {
    if (!salesOrderLine?.quantity || !salesOrderLine.unit_price) {
        return salesOrderLine;
    }
    salesOrderLine.taxable_amount = 0;
    salesOrderLine.tax_amount = 0;
    salesOrderLine.subtotal = salesOrderLine.quantity * salesOrderLine.unit_price;
    salesOrderLine = computeLineDiscount(salesOrderLine);
    salesOrderLine = computeTax(taxes, salesOrderLine);
    return salesOrderLine;
}
