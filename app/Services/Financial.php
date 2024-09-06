<?php

namespace App\Services;

use App\Models\Option;
use App\Models\Tax;

class Financial
{
    public static function computeInvoiceLineSubtotal($invoiceLine)
    {
        $computationSettings = Option::getComputationSettings('invoice');
        if (!$invoiceLine || !$invoiceLine['quantity'] || !$invoiceLine['unit_price']) {
            return $invoiceLine;
        }
        $invoiceLine['taxable_amount'] = 0;
        $invoiceLine['tax_amount'] = 0;
        $invoiceLine['subtotal'] = $invoiceLine['quantity'] * $invoiceLine['unit_price'];
        $invoiceLine = self::computeTax($invoiceLine, $computationSettings);
        return $invoiceLine;
    }

    public static function computePurchaseLineSubtotal($purchaseLine)
    {
        $computationSettings = Option::getComputationSettings('purchase');
        if (!$purchaseLine || !$purchaseLine['quantity'] || !$purchaseLine['unit_price']) {
            return $purchaseLine;
        }
        $purchaseLine['taxable_amount'] = 0;
        $purchaseLine['tax_amount'] = 0;
        $purchaseLine['subtotal'] = $purchaseLine['quantity'] * $purchaseLine['unit_price'];
        $purchaseLine = self::computeTax($purchaseLine, $computationSettings);
        return $purchaseLine;
    }

    public static function computeSalesOrderLineSubtotal($salesOrderLine)
    {
        $computationSettings = Option::getComputationSettings('sales_order');
        if (!$salesOrderLine || !$salesOrderLine['quantity'] || !$salesOrderLine['unit_price']) {
            return $salesOrderLine;
        }
        $salesOrderLine['taxable_amount'] = 0;
        $salesOrderLine['tax_amount'] = 0;
        $salesOrderLine['subtotal'] = $salesOrderLine['quantity'] * $salesOrderLine['unit_price'];
        if ($computationSettings['computation_order'] === 'discount') {
            $salesOrderLine['subtotal'] = self::computeLineDiscount($salesOrderLine, $computationSettings)['subtotal'];
            $salesOrderLine = self::computeTax($salesOrderLine, $computationSettings);
        } else if ($computationSettings['computation_order'] === 'tax') {
            $salesOrderLine = self::computeTax($salesOrderLine, $computationSettings);
            $salesOrderLine['subtotal'] = self::computeLineDiscount($salesOrderLine, $computationSettings)['subtotal'];
        }
        return $salesOrderLine;
    }

    public static function computeTax($line, $computationSettings)
    {
        if (!isset($line['tax_id']) || $line['tax_id']) {
            return $line;
        }
        $tax = Tax::find($line['tax_id']);
        $taxComputationOrder = $computationSettings['tax_computation_order'];
        $line['taxable_amount'] = $line['subtotal'];
        if ($tax->computation === 'fixed') {
            if ($taxComputationOrder === 'subtotal') {
                $line['tax_amount'] = $tax->amount;
                if ($tax->included_in_price) {
                    $line['taxable_amount'] = $line['taxable_amount'] - $line['tax_amount'];
                } else {
                    $line['subtotal'] = $line['subtotal'] + $line['tax_amount'];
                }
            } else if ($taxComputationOrder === 'unit_price') {
                $line['tax_amount'] = 0;
                for ($i = 0; $i < $line['quantity']; $i++) {
                    if ($tax->included_in_price) {
                        $line['taxable_amount'] -= $tax->amount;
                    } else {
                        $line['tax_amount'] += $tax->amount;
                    }
                }
                if (!$tax->included_in_price) {
                    $line['subtotal'] += $line['tax_amount'];
                }
            }
        } else if ($tax->computation === 'percentage_of_price') {
            if ($taxComputationOrder === 'subtotal') {
                $line['tax_amount'] = ($line['subtotal'] * $tax->amount) / 100;
                if ($tax->included_in_price) {
                    $line['taxable_amount'] = $line['taxable_amount'] - $line['tax_amount'];
                } else {
                    $line['subtotal'] = $line['subtotal'] + $line['tax_amount'];
                }
            } else if ($taxComputationOrder === 'unit_price') {
                $line['tax_amount'] = 0;
                for ($i = 0; $i < $line['quantity']; $i++) {
                    $unitTaxAmount = ($line['unit_price'] * $tax->amount) / 100;
                    if ($tax->included_in_price) {
                        $line['taxable_amount'] -= $unitTaxAmount;
                    } else {
                        $line['tax_amount'] += $unitTaxAmount;
                    }
                }
                if (!$tax->included_in_price) {
                    $line['subtotal'] += $line['tax_amount'];
                }
            }
        }
        return $line;
    }

    public static function computeLineDiscount($line, $computationSettings)
    {
        $discountComputationOrder = $computationSettings['discount_computation_order'];
        $computation = [
            'subtotal' => $line['subtotal'],
            'discount' => 0
        ];
        if (!isset($line['discount_type']) || !isset($line['discount_rate'])) {
            return $computation;
        }
        $discountType = $line['discount_type'];
        $discountRate = (float)$line['discount_rate'];
        if (!$discountType || !$discountRate) {
            return $computation;
        }
        if ($discountType === 'fixed') {
            if ($discountComputationOrder === 'subtotal') {
                $computation['discount'] = $discountRate;
            } else if ($discountComputationOrder === 'unit_price') {
                for ($i = 0; $i < $line['quantity']; $i++) {
                    $computation['discount'] += $line['discount_rate'];
                }
            }
            $computation['subtotal'] = $computation['subtotal'] - $discountRate;
        } else if ($discountType === 'percentage') {
            if ($discountComputationOrder === 'subtotal') {
                $computation['discount'] = ($computation['subtotal'] * $discountRate) / 100;
            } else if ($discountComputationOrder === 'unit_price') {
                for ($i = 0; $i < $line['quantity']; $i++) {
                    $computation['discount'] += ($line['unit_price'] * $discountRate) / 100;
                }
            }
            $computation['subtotal'] = $computation['subtotal'] - $computation['discount'];
        }
        return $computation;
    }
}

