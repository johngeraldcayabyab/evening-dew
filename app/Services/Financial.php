<?php

namespace App\Services;

use App\Models\Option;
use App\Models\Tax;

class Financial
{
    public static function computeInvoiceLineSubtotal($invoiceLine)
    {
        if (!$invoiceLine || !$invoiceLine['quantity'] || !$invoiceLine['unit_price']) {
            return $invoiceLine;
        }
        $invoiceLine['taxable_amount'] = 0;
        $invoiceLine['tax_amount'] = 0;
        $invoiceLine['subtotal'] = $invoiceLine['quantity'] * $invoiceLine['unit_price'];
        if (isset($invoiceLine['tax_id']) && $invoiceLine['tax_id']) {
            $tax = Tax::find($invoiceLine['tax_id']);
            $invoiceLine = self::computeTax($tax, $invoiceLine);
        }
        return $invoiceLine;
    }

    public static function computePurchaseLineSubtotal($purchaseLine)
    {
        if (!$purchaseLine || !$purchaseLine['quantity'] || !$purchaseLine['unit_price']) {
            return $purchaseLine;
        }
        $purchaseLine['taxable_amount'] = 0;
        $purchaseLine['tax_amount'] = 0;
        $purchaseLine['subtotal'] = $purchaseLine['quantity'] * $purchaseLine['unit_price'];
        if (isset($purchaseLine['tax_id']) && $purchaseLine['tax_id']) {
            $tax = Tax::find($purchaseLine['tax_id']);
            $purchaseLine = self::computeTax($tax, $purchaseLine);
        }
        return $purchaseLine;
    }

    public static function computeSalesOrderLineSubtotal($salesOrderLine)
    {
        $salesOrderComputationSettings = Option::getSalesOrderComputationSettings();
        if (!$salesOrderLine || !$salesOrderLine['quantity'] || !$salesOrderLine['unit_price']) {
            return $salesOrderLine;
        }
        $salesOrderLine['taxable_amount'] = 0;
        $salesOrderLine['tax_amount'] = 0;
        $salesOrderLine['subtotal'] = $salesOrderLine['quantity'] * $salesOrderLine['unit_price'];
        $salesOrderLine['subtotal'] = self::computeLineDiscount($salesOrderLine)['subtotal'];
        if (isset($salesOrderLine['tax_id']) && $salesOrderLine['tax_id']) {
            $tax = Tax::find($salesOrderLine['tax_id']);
            $salesOrderLine = self::computeTax($tax, $salesOrderLine);
        }
        return $salesOrderLine;
    }

    public static function computeTax($tax, $orderLine)
    {
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

