<?php

namespace App\Listeners;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidated;
use App\Models\OperationType;
use App\Models\Product;
use App\Models\SalesOrderTransfer;
use App\Models\Transfer;
use App\Models\TransferLine;
use App\Services\MeasurementConversion;

class GenerateTransferFromValidatedSalesOrder
{
    public function handle(SalesOrderValidated $event)
    {
        $salesOrder = $event->salesOrder;
        $operationTypeDelivery = OperationType::defaultDelivery();
        if (!$operationTypeDelivery) {
            return;
        }
        $salesOrderLines = $salesOrder->salesOrderLines;
        if ($salesOrder->salesOrderTransfer()->exists()) {
            return;
        }
        if (!count($salesOrderLines)) {
            return;
        }
        $transfer = $this->createTransferAndLines($operationTypeDelivery, $salesOrder);
        $salesOrderTransfer = new SalesOrderTransfer();
        $salesOrderTransfer->sales_order_id = $salesOrder->id;
        $salesOrderTransfer->transfer_id = $transfer->id;
        $salesOrderTransfer->save();
    }

    private function createTransferAndLines($operationType, $salesOrder)
    {
        $transfer = Transfer::create([
            'contact_id' => $salesOrder->customer_id,
            'operation_type_id' => $operationType->id,
            'source_location_id' => $operationType->default_source_location_id,
            'scheduled_date' => now()->format(SystemSetting::DATE_TIME_FORMAT),
            'responsible_id' => $salesOrder->salesperson_id,
            'source_document' => $salesOrder->number,
            'shipping_method' => $salesOrder->shipping_method,
            'status' => Transfer::DRAFT,
        ]);
        $lines = $salesOrder->salesOrderLines->map(function ($salesOrderLine) {
            $transferDemand = MeasurementConversion::convertSalesMeasurement($salesOrderLine->product_id, $salesOrderLine->measurement_id, $salesOrderLine->quantity);
            return [
                'product_id' => $salesOrderLine->product_id,
                'description' => $salesOrderLine->description,
                'demand' => $transferDemand,
                'measurement_id' => Product::find($salesOrderLine->product_id)->measurement_id,
            ];
        });
        if (count($lines)) {
            TransferLine::massUpsert($lines, $transfer);
        }
        return $transfer;
    }
}
