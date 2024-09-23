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
        return line;
    }
    if (discountType === 'fixed') {
        computation.discounted_unit_price -= line.discount_rate;
        for (let i = 0; i < line.quantity; i++) {
            computation.discount += line.discount_rate;
        }
        computation.subtotal = computation.subtotal - computation.discount;
    } else if (discountType === 'percentage') {
        computation.discounted_unit_price = (line.unit_price * discountRate) / 100;
        for (let i = 0; i < line.quantity; i++) {
            computation.discount += (line.unit_price * discountRate) / 100;
        }
        computation.subtotal = computation.subtotal - computation.discount;
    }
    line.subtotal = computation.subtotal;
    return line;
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


export const computeDiscount = (discountType, discountRate, breakdownComputed = {}) => {
    const discountedComputation = {
        taxable_amount: breakdownComputed.taxable_amount,
        tax_amount: breakdownComputed.tax_amount,
        discount: 0,
        total: 0,
    };
    if (discountType === 'fixed' && discountRate) {
        discountedComputation.discount = discountRate;
        discountedComputation.total = breakdownComputed.total_discountable - discountedComputation.discount;
    } else if (discountType === 'percentage' && discountRate) {
        discountedComputation.discount = (breakdownComputed.total_discountable * discountRate) / 100;
        discountedComputation.total = breakdownComputed.total_discountable - discountedComputation.discount;
    } else {
        discountedComputation.total = breakdownComputed.total_discountable;
    }
    discountedComputation.total = discountedComputation.total + breakdownComputed.total_non_discountable;
    return discountedComputation;
}
