<?php

namespace App\Services;

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
        $invoiceLine = self::computeTax($invoiceLine);
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
        $purchaseLine = self::computeTax($purchaseLine);
        return $purchaseLine;
    }

    public static function computeSalesOrderLineSubtotal($salesOrderLine)
    {
        if (!$salesOrderLine || !$salesOrderLine['quantity'] || !$salesOrderLine['unit_price']) {
            return $salesOrderLine;
        }
        $salesOrderLine['taxable_amount'] = 0;
        $salesOrderLine['tax_amount'] = 0;
        $salesOrderLine['subtotal'] = $salesOrderLine['quantity'] * $salesOrderLine['unit_price'];
        $salesOrderLine = self::computeLineDiscount($salesOrderLine);
        $salesOrderLine = self::computeTax($salesOrderLine);
        return $salesOrderLine;
    }

    public static function computeTax($line)
    {
        if (!isset($line['tax_id']) || !$line['tax_id']) {
            return $line;
        }
        $tax = Tax::find($line['tax_id']);
        if (!$tax) {
            return $line;
        }
        $line['taxable_amount'] = $line['subtotal'];
        if ($tax->computation === 'fixed') {
            $line['tax_amount'] = $tax['amount'];
            if ($tax['included_in_price']) {
                $line['taxable_amount'] = $line['taxable_amount'] - $line['tax_amount'];
            } else {
                $line['subtotal'] = $line['subtotal'] + $line['tax_amount'];
            }
        } else if ($tax->computation === 'percentage_of_price') {
            $line['tax_amount'] = ($line['subtotal'] * $tax['amount']) / 100;
            if ($tax['included_in_price']) {
                $line['taxable_amount'] = $line['taxable_amount'] - $line['tax_amount'];
            } else {
                $line['subtotal'] = $line['subtotal'] + $line['tax_amount'];
            }
        }
        return $line;
    }

    public static function computeLineDiscount($line)
    {
        $computation = [
            'discounted_unit_price' => $line['unit_price'],
            'subtotal' => $line['subtotal'],
            'discount' => 0
        ];
        if (!isset($line['discount_type']) || !isset($line['discount_rate'])) {
            return array_merge($line, $computation);
        }
        $discountType = $line['discount_type'];
        $discountRate = (float)$line['discount_rate'];
        if (!$discountType || !$discountRate) {
            return array_merge($line, $computation);
        }
        if ($discountType === 'fixed') {
            $computation['discounted_unit_price'] -= $line['discount_rate'];
            $computation['discount'] = $line['discount_rate'] * $line['quantity'];
            $computation['subtotal'] -= $computation['discount'];
        } else if ($discountType === 'percentage') {
            $computation['discounted_unit_price'] -= ($line['unit_price'] * $discountRate) / 100;
            $computation['discount'] = ($line['unit_price'] * $discountRate / 100) * $line['quantity'];
            $computation['subtotal'] -= $computation['discount'];
        }
        return array_merge($line, $computation);
    }
}

