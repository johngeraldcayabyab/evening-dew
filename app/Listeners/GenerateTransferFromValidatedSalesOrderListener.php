<?php

namespace App\Listeners;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidatedEvent;
use App\Jobs\MatchSalesOrderToTransferLineJob;
use App\Models\OperationType;
use App\Models\Product;
use App\Models\SalesOrderTransfer;
use App\Models\SalesOrderTransferLine;
use App\Models\Transfer;
use App\Models\TransferLine;
use App\Services\MeasurementConversion;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateTransferFromValidatedSalesOrderListener implements ShouldQueue
{
    public function handle(SalesOrderValidatedEvent $event)
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
        $salesOrderTransfer = $this->createSalesOrderTransfer($salesOrder, $transfer);
        SalesOrderTransferLine::matchSalesOrderOrTransferLines(
            $salesOrderTransfer,
            $salesOrder,
            $transfer,
            $salesOrderLines,
            new TransferLine(),
            'transfer_id'
        );
        MatchSalesOrderToTransferLineJob::dispatch($salesOrder);
    }

    private function createSalesOrderTransfer($salesOrder, $transfer)
    {
        $salesOrderTransfer = new SalesOrderTransfer();
        $salesOrderTransfer->sales_order_id = $salesOrder->id;
        $salesOrderTransfer->transfer_id = $transfer->id;
        $salesOrderTransfer->save();
        return $salesOrderTransfer;
    }

    private function createTransferAndLines($operationType, $salesOrder)
    {
        $transfer = new Transfer();
        $transfer->contact_id = $salesOrder->customer_id;
        $transfer->operation_type_id = $operationType->id;
        $transfer->source_location_id = $operationType->default_source_location_id;
        $transfer->scheduled_date = now()->format(SystemSetting::DATE_TIME_FORMAT);
        $transfer->responsible_id = $salesOrder->salesperson_id;
        $transfer->source_document = $salesOrder->number;
        $transfer->shipping_method = $salesOrder->shipping_method;
        $transfer->status = Transfer::DRAFT;
        $transfer->save();
        $this->createTransferLines($transfer, $salesOrder);
        return $transfer;
    }

    private function createTransferLines($transfer, $salesOrder): void
    {
        $transferLinesDataCreate = [];
        $salesOrderLines = $salesOrder->salesOrderLines;
        foreach ($salesOrderLines as $salesOrderLine) {
            $transferDemand = MeasurementConversion::convertSalesMeasurement($salesOrderLine->product_id, $salesOrderLine->measurement_id, $salesOrderLine->quantity);
            $transferLinesDataCreate[] = [
                'product_id' => $salesOrderLine->product_id,
                'description' => $salesOrderLine->description,
                'demand' => $transferDemand,
                'measurement_id' => Product::find($salesOrderLine->product_id)->measurement_id,
                'created_at' => $salesOrderLine->created_at,
            ];
        }
        if (count($transferLinesDataCreate)) {
            TransferLine::massUpsert($transferLinesDataCreate, $transfer);
        }
    }
}
