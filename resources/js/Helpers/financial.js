import {resetThenRedirect} from "./reset"
import {getGlobalSettings} from "./localstorage"

export const getTax = (id, taxes) => {
    if (taxes.length) {
        return taxes.find(tax => tax.id === id);
    }
    return false;
}

export const computeTax = (tax, orderLine, salesOrderComputationSettings) => {
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

export const computeLineDiscount = (line, salesOrderComputationSettings) => {
    const discountComputationOrder = salesOrderComputationSettings.salesOrderDiscountComputationOrder;
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
        if (discountComputationOrder === 'subtotal') {
            computation.discount = discountRate;
            console.log(1);
        } else if (discountComputationOrder === 'unit_price') {
            for (let i = 0; i < line.quantity; i++) {
                computation.discount += line.discount_rate;
            }
            console.log(2);
        }
        computation.subtotal = computation.subtotal - computation.discount;
    } else if (discountType === 'percentage') {
        if (discountComputationOrder === 'subtotal') {
            computation.discount = (computation.subtotal * discountRate) / 100;
            console.log(3);
        } else if (discountComputationOrder === 'unit_price') {
            for (let i = 0; i < line.quantity; i++) {
                computation.discount += (line.unit_price * discountRate) / 100;
            }
            console.log(4);
        }
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

export const computeSalesOrderLineSubtotal = (salesOrderLine, taxes, salesOrderComputationSettings) => {
    if (!salesOrderLine || !salesOrderLine.quantity || !salesOrderLine.unit_price) {
        return salesOrderLine;
    }
    salesOrderLine.taxable_amount = 0;
    salesOrderLine.tax_amount = 0;
    salesOrderLine.subtotal = salesOrderLine.quantity * salesOrderLine.unit_price;
    salesOrderLine.subtotal = computeLineDiscount(salesOrderLine, salesOrderComputationSettings).subtotal;
    if (salesOrderLine.tax_id) {
        const tax = getTax(salesOrderLine.tax_id, taxes);
        salesOrderLine = computeTax(tax, salesOrderLine, salesOrderComputationSettings);
    }
    return salesOrderLine;
}

export const getSalesOrderComputationSettings = () => {
    const globalSettings = getGlobalSettings();
    const salesOrderComputationOrder = globalSettings.hasOwnProperty('sales_order_computation_order') ? globalSettings.sales_order_computation_order : null;
    const salesOrderTaxComputationOrder = globalSettings.hasOwnProperty('sales_order_tax_computation_order') ? globalSettings.sales_order_tax_computation_order : null;
    const salesOrderDiscountComputationOrder = globalSettings.hasOwnProperty('sales_order_discount_computation_order') ? globalSettings.sales_order_discount_computation_order : null;
    if (!salesOrderComputationOrder || !salesOrderTaxComputationOrder || !salesOrderDiscountComputationOrder) {
        resetThenRedirect('sales order computation has not been initialized');
    }
    return {
        salesOrderComputationOrder: salesOrderComputationOrder,
        salesOrderTaxComputationOrder: salesOrderTaxComputationOrder,
        salesOrderDiscountComputationOrder: salesOrderDiscountComputationOrder,
    };
}
