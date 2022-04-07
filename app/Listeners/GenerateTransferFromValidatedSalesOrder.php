<?php

namespace App\Listeners;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidatedEvent;
use App\Models\GlobalSetting;
use App\Models\OperationType;
use App\Models\SalesOrderTransfer;
use App\Models\SalesOrderTransferLine;
use App\Models\Transfer;
use App\Models\TransferLine;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateTransferFromValidatedSalesOrder implements ShouldQueue
{
    public function handle(SalesOrderValidatedEvent $event)
    {
        $salesOrder = $event->salesOrder;
        $operationTypeDelivery = OperationType::defaultDelivery();
        if (!$operationTypeDelivery) {
            return;
        }
        $salesOrderLines = $salesOrder->salesOrderLines;
        if (!$salesOrder->salesOrderTransfer()->exists()) {
            if (count($salesOrderLines)) {
                $transfer = $this->createTransferAndLines($operationTypeDelivery, $salesOrder);
                $salesOrderTransfer = $this->createSalesOrderTransfer($salesOrder, $transfer);
                $this->createSalesOrderTransferLines($salesOrderTransfer, $salesOrder, $transfer, $salesOrderLines);
                return;
            }
            return;
        }
        $salesOrderTransfer = $salesOrder->salesOrderTransfer;
        $transferLinesData = [];
        $transfer = null;
        $newSalesOrderLine = [];
        foreach ($salesOrderLines as $salesOrderLine) {
            if ($salesOrderLine->salesOrderTransferLine()->exists()) {
                $transfer = $salesOrderLine->salesOrderTransferLine->transfer;
                $transferLine = $salesOrderLine->salesOrderTransferLine->transferLine;
                $transferLine->description = $salesOrderLine->description;
                $transferLine->demand = $salesOrderLine->quantity;
                $transferLine->measurement_id = $salesOrderLine->measurement_id;
                $transferLine = $transferLine->toArray();
                unset($transferLine['updated_at']);
                $transferLinesData[] = $transferLine;
            } else {
                $transferLinesData[] = [
                    'product_id' => $salesOrderLine->product_id,
                    'description' => $salesOrderLine->description,
                    'demand' => $salesOrderLine->quantity,
                    'measurement_id' => $salesOrderLine->measurement_id,
                    'created_at' => $salesOrderLine->created_at,
                ];
                $newSalesOrderLine[] = $salesOrderLine;
            }
        }
        if (count($transferLinesData)) {
            TransferLine::updateOrCreateMany($transferLinesData, $transfer->id);
            $this->createSalesOrderTransferLines($salesOrderTransfer, $salesOrder, $transfer, $newSalesOrderLine);
        }
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
            $transferLinesDataCreate[] = [
                'product_id' => $salesOrderLine->product_id,
                'description' => $salesOrderLine->description,
                'demand' => $salesOrderLine->quantity,
                'measurement_id' => $salesOrderLine->measurement_id,
                'created_at' => $salesOrderLine->created_at,
            ];
        }
        if (count($transferLinesDataCreate)) {
            TransferLine::updateOrCreateMany($transferLinesDataCreate, $transfer->id);
        }
    }

    private function createSalesOrderTransferLines
    (
        $salesOrderTransfer,
        $salesOrder,
        $transfer,
        $salesOrderLines
    )
    {
        $lines = [];
        foreach ($salesOrderLines as $salesOrderLine) {
            $transferLine = TransferLine::where('transfer_id', $transfer->id)
                ->where('product_id', $salesOrderLine->product_id)
                ->where('measurement_id', $salesOrderLine->measurement_id)
                ->where('created_at', $salesOrderLine->created_at)
                ->first();
            $lines[] = [
                'sales_order_id' => $salesOrder->id,
                'transfer_id' => $transfer->id,
                'sales_order_line_id' => $salesOrderLine->id,
                'transfer_line_id' => $transferLine->id,
                'sales_order_transfer_id' => $salesOrderTransfer->id,
            ];
        }
        if (count($lines)) {
            SalesOrderTransferLine::updateOrCreateMany($lines, $salesOrderTransfer->id);
        }
    }
}
