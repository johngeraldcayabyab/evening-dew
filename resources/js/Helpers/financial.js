export const getTax = (id, taxes) => {
    if (taxes.length) {
        return taxes.find(tax => tax.id === id);
    }
    return false;
}

export const computeTax = (tax, orderLine) => {
    orderLine.taxable_amount = orderLine.subtotal;
    if (tax.computation === 'fixed') {
        orderLine.tax_amount = tax.amount;
        if (tax.included_in_price) {
            orderLine.taxable_amount = orderLine.taxable_amount - orderLine.tax_amount;
        } else {
            orderLine.subtotal = orderLine.subtotal + orderLine.tax_amount;
        }
    } else if (tax.computation === 'percentage_of_price') {
        orderLine.tax_amount = (orderLine.subtotal * tax.amount) / 100;
        if (tax.included_in_price) {
            orderLine.taxable_amount = orderLine.taxable_amount - orderLine.tax_amount;
        } else {
            orderLine.subtotal = orderLine.subtotal + orderLine.tax_amount;
        }
    }
    return orderLine;
}

export const computeLineDiscount = (line) => {
    const computation = {
        subtotal: line.subtotal,
        discount: 0
    };
    const discountType = line.discount_type;
    const discountRate = parseFloat(line.discount_rate);
    if (!discountType || !discountRate) {
        return computation;
    }
    if (discountType === 'fixed') {
        computation.discount = discountRate;
        computation.subtotal = computation.subtotal - discountRate;
    } else if (discountType === 'percentage') {
        computation.discount = (computation.subtotal * discountRate) / 100;
        computation.subtotal = computation.subtotal - computation.discount;
    }
    return computation;
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

export const computeSalesOrderLineSubtotal = (salesOrderLine, taxes) => {
    if (!salesOrderLine || !salesOrderLine.quantity || !salesOrderLine.unit_price) {
        return salesOrderLine;
    }
    salesOrderLine.taxable_amount = 0;
    salesOrderLine.tax_amount = 0;
    salesOrderLine.subtotal = salesOrderLine.quantity * salesOrderLine.unit_price;
    salesOrderLine.subtotal = computeLineDiscount(salesOrderLine).subtotal;
    if (salesOrderLine.tax_id) {
        const tax = getTax(salesOrderLine.tax_id, taxes);
        salesOrderLine = computeTax(tax, salesOrderLine);
    }
    return salesOrderLine;
}
