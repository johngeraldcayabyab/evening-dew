<?php

namespace App\Exports;

use App\Models\SalesOrder;
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
        $salesOrderQuery = SalesOrderLine::query()->with(['salesOrder', 'product']);
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
            'status' => in_array("paid", explode(",", $row->salesOrder->steps)) ? 'Paid' : '',
            'number' => $row->salesOrder->number,
            'sku' => $row->product->internal_reference,
            'quantity' => $row->quantity,
            'customer' => $row->salesOrder->customer_name,
            'delivery_phone' => $row->salesOrder->delivery_phone,
            'delivery_address' => $row->salesOrder->shipping_method === 'delivery' ? $row->salesOrder->delivery_address : null,
            'delivery_city' => $row->salesOrder->deliveryCity ? $row->salesOrder->deliveryCity->name : '',
            'notes' => $row->salesOrder->notes,
            'source_document' => $row->salesOrder->source_document,
            'box_description' => $row->product->sales_description,
            'shipping_method' => $row->salesOrder->shipping_method,
            'select_time' => $row->salesOrder->select_time,
        ];
    }

    public function headings(): array
    {
        return [
            'Status',
            'Order Number',
            'SKU',
            'QTY',
            'Customer',
            'Contact',
            'Address',
            'City',
            'Notes',
            'Source Document',
            'Box Description',
            'Shipping Method',
            'Time',
        ];
    }
}
