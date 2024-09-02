<?php

namespace App\Services;

class Financial
{
    public static function computeSalesOrderLineSubtotal($salesOrderLine, $taxes)
    {
        if (!$salesOrderLine || !$salesOrderLine->quantity || !$salesOrderLine->unit_price) {
            return $salesOrderLine;
        }
        $salesOrderLine->taxable_amount = 0;
        $salesOrderLine->tax_amount = 0;
        $salesOrderLine->subtotal = $salesOrderLine->quantity * $salesOrderLine->unit_price;
        $salesOrderLine->subtotal = self::computeLineDiscount($salesOrderLine)['subtotal'];
        if ($salesOrderLine->tax_id) {
            $tax = $salesOrderLine->tax;
            $salesOrderLine = self::computeTax($tax, $salesOrderLine);
        }
        return $salesOrderLine;
    }

    public static function computeTax($tax, $orderLine)
    {
        $orderLine->taxable_amount = $orderLine->subtotal;
        if ($tax->computation === 'fixed') {
            $orderLine->tax_amount = $tax->amount;
            if ($tax->included_in_price) {
                $orderLine->taxable_amount = $orderLine->taxable_amount - $orderLine->tax_amount;
            } else {
                $orderLine->subtotal = $orderLine->subtotal + $orderLine->tax_amount;
            }
        } else if ($tax->computation === 'percentage_of_price') {
            $orderLine->tax_amount = ($orderLine->subtotal * $tax->amount) / 100;
            if ($tax->included_in_price) {
                $orderLine->taxable_amount = $orderLine->taxable_amount - $orderLine->tax_amount;
            } else {
                $orderLine->subtotal = $orderLine->subtotal + $orderLine->tax_amount;
            }
        }
        return $orderLine;
    }

    public static function computeLineDiscount($line)
    {
        $computation = [
            'subtotal' => $line->subtotal,
            'discount' => 0
        ];
        $discountType = $line->discount_type;
        $discountRate = (float)$line->discount_rate;
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

