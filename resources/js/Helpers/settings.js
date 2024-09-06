import {resetThenRedirect} from "./reset"

export const getGlobalSettings = () => {
    return JSON.parse(localStorage.getItem('globalSettings'));
};

export const getComputationSettings = (module) => {
    const globalSettings = getGlobalSettings();
    const salesOrderComputationOrder = globalSettings.hasOwnProperty(`${module}_computation_order`) ? globalSettings[`${module}_computation_order`] : null;
    const salesOrderTaxComputationOrder = globalSettings.hasOwnProperty(`${module}_tax_computation_order`) ? globalSettings[`${module}_tax_computation_order`] : null;
    const salesOrderDiscountComputationOrder = globalSettings.hasOwnProperty(`${module}_discount_computation_order`) ? globalSettings[`${module}_discount_computation_order`] : null;
    if (!salesOrderComputationOrder || !salesOrderTaxComputationOrder || !salesOrderDiscountComputationOrder) {
        resetThenRedirect('sales order computation has not been initialized');
    }
    return {
        salesOrderComputationOrder: salesOrderComputationOrder,
        salesOrderTaxComputationOrder: salesOrderTaxComputationOrder,
        salesOrderDiscountComputationOrder: salesOrderDiscountComputationOrder,
    };
}
