<?php

namespace App\Exports;

use App\Models\SalesOrderLine;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SalesOrderLineExport implements FromQuery, ShouldAutoSize, WithMapping, WithHeadings
{
    use Exportable;

    public function __construct($param)
    {
        $this->param = $param;
    }

    public function query()
    {
        $shippingFrom = null;
        $shippingTo = null;
        $isShippingDate = isset($this->param['shipping_date']);
        if ($isShippingDate) {
            $shippingDateRange = explode(',', $this->param['shipping_date']);
            $shippingFrom = Carbon::parse($shippingDateRange[0]);
            $shippingTo = Carbon::parse($shippingDateRange[1]);
        }
        $salesOrderQuery = SalesOrderLine::query();
        if ($isShippingDate) {
            $salesOrderQuery = $salesOrderQuery->whereHas('salesOrder', function ($query) use ($shippingFrom, $shippingTo) {
                return $query->whereBetween('shipping_date', [$shippingFrom, $shippingTo]);
            });
        }
        return $salesOrderQuery->orderBy('created_at', 'desc');
    }

    public function map($row): array
    {
        return [
            'number' => $row->salesOrder->number,
            'customer' => $row->salesOrder->customer->name,
            'quantity' => $row->quantity,
            'sku' => $row->product->internal_reference,
            'name' => $row->product->name,
            'delivery_address' => $row->salesOrder->delivery_address,
            'delivery_city' => $row->salesOrder->deliveryCity ? $row->salesOrder->deliveryCity->name : '',
            'delivery_phone' => $row->salesOrder->delivery_phone,
            'notes' => $row->salesOrder->notes,
        ];
    }

    public function headings(): array
    {
        return [
            'Number',
            'Customer',
            'Quantity',
            'SKU',
            'Name',
            'Address',
            'City',
            'Contact',
            'Notes',
        ];
    }
}
