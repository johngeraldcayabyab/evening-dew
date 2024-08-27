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


export const computeDiscount = (discountType, discountRate, breakdownComputed = {}) => {
    const discountedComputation = {
        taxable_amount: breakdownComputed.taxable_amount,
        tax_amount: breakdownComputed.tax_amount,
        discount: 0,
        total: 0,
    };

    // there should be another option for discount calculation
    // where should it calculate the discount. the taxable amount or the total amount
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
