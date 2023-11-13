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
    // return breakdownComputed;


    const discountedComputation = {
        taxable_amount: breakdownComputed.taxableAmount, tax_amount: breakdownComputed.taxAmount, discount: 0, total: 0,
    };

    // there should be another option for discount calculation
    // where should it calculate the discount. the taxable amount or the total amount
    if (discountType === 'fixed' && discountRate) {
        discountedComputation.discount = discountRate;
        discountedComputation.total = breakdownComputed.totalDiscountable - discountedComputation.discount;
    } else if (discountType === 'percentage' && discountRate) {
        discountedComputation.discount = (breakdownComputed.totalDiscountable * discountRate) / 100;
        discountedComputation.total = breakdownComputed.totalDiscountable - discountedComputation.discount;
    } else {
        discountedComputation.total = breakdownComputed.totalDiscountable;
    }


    discountedComputation.total = discountedComputation.total + breakdownComputed.totalNonDiscountable;
    return discountedComputation;
}
