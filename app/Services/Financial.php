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
        $salesOrderLine['subtotal'] = self::computeLineDiscount($salesOrderLine)['subtotal'];
        $salesOrderLine = self::computeTax($salesOrderLine, $computationSettings);
        return $salesOrderLine;
    }

    public static function computeTax($orderLine, $computationSettings)
    {
        if (!isset($orderLine['tax_id']) || $orderLine['tax_id']) {
            return $orderLine;
        }
        $tax = Tax::find($orderLine['tax_id']);
        $orderLine['taxable_amount'] = $orderLine['subtotal'];
        if ($tax->computation === 'fixed') {
            $orderLine['tax_amount'] = $tax->amount;
            if ($tax->included_in_price) {
                $orderLine['taxable_amount'] = $orderLine['taxable_amount'] - $orderLine['tax_amount'];
            } else {
                $orderLine['subtotal'] = $orderLine['subtotal'] + $orderLine['tax_amount'];
            }
        } else if ($tax->computation === 'percentage_of_price') {
            $orderLine['tax_amount'] = ($orderLine['subtotal'] * $tax->amount) / 100;
            if ($tax->included_in_price) {
                $orderLine['taxable_amount'] = $orderLine['taxable_amount'] - $orderLine['tax_amount'];
            } else {
                $orderLine['subtotal'] = $orderLine['subtotal'] + $orderLine['tax_amount'];
            }
        }
        return $orderLine;
    }

    public static function computeLineDiscount($line)
    {
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
            $computation['discount'] = $discountRate;
            $computation['subtotal'] = $computation['subtotal'] - $discountRate;
        } else if ($discountType === 'percentage') {
            $computation['discount'] = ($computation['subtotal'] * $discountRate) / 100;
            $computation['subtotal'] = $computation['subtotal'] - $computation['discount'];
        }
        return $computation;
    }
}

