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
        $inventoryDefaultWarehouse = GlobalSetting::latestFirst()->inventoryDefaultWarehouse;
        if ($inventoryDefaultWarehouse) {
            $operationType = OperationType::where('warehouse_id', $inventoryDefaultWarehouse->id)->where('type', OperationType::DELIVERY)->first(); //By default, it gets the latest operation type created
            if ($operationType) {
                $transfer = $this->createTransferAndLines($salesOrder, $operationType);
                SalesOrderTransfer::create([
                    'sales_order_id' => $salesOrder->id,
                    'transfer_id' => $transfer->id
                ]);
            }
        }
    }

    private function createTransferAndLines($salesOrder, $operationType)
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

    private function createTransferLines($transfer, $salesOrder)
    {
        $transferLinesDataCreate = [];
        $transferLinesDataUpdate = [];
        $salesOrderLines = $salesOrder->salesOrderLines;
        foreach ($salesOrderLines as $salesOrderLine) {
            if ($salesOrderLine->salesOrderTransferLine()->exists()) {
                $transferLinesDataUpdate[] = [
                    'id' => $salesOrderLine->salesOrderTransferLine->transfer_line_id,
                    'product_id' => $salesOrderLine->product_id,
                    'description' => $salesOrderLine->description,
                    'demand' => $salesOrderLine->quantity,
                    'measurement_id' => $salesOrderLine->measurement_id,
                ];
            } else {
                $transferLinesDataCreate[] = [
                    'product_id' => $salesOrderLine->product_id,
                    'description' => $salesOrderLine->description,
                    'demand' => $salesOrderLine->quantity,
                    'measurement_id' => $salesOrderLine->measurement_id,
                ];
            }
        }
        if (count($transferLinesDataCreate)) {
            TransferLine::insertMany($transferLinesDataCreate, $transfer->id);
        }
        if (count($transferLinesDataUpdate)) {
            TransferLine::updateOrCreateMany($transferLinesDataUpdate, $transfer->id);
        }
        $transferLines = $transfer->transferLines;
        $this->createSalesOrderTransferLines($salesOrderLines, $transferLines);
    }

    private function createSalesOrderTransferLines($salesOrderLines, $transferLines)
    {
        foreach ($salesOrderLines as $salesOrderLine) {
            foreach ($transferLines as $transferLine) {
                if ($salesOrderLine->product_id !== $transferLine->product_id) {
                    continue;
                }
                if ($salesOrderLine->description !== $transferLine->description) {
                    continue;
                }
                if ($salesOrderLine->quantity !== $transferLine->demand) {
                    continue;
                }
                if ($salesOrderLine->measurement_id !== $transferLine->measurement_id) {
                    continue;
                }
                $salesOrderTransferLine = new SalesOrderTransferLine();
                $salesOrderTransferLine->sales_order_id = $salesOrderLine->sales_order_id;
                $salesOrderTransferLine->transfer_id = $transferLine->transfer_id;
                $salesOrderTransferLine->sales_order_line_id = $salesOrderLine->id;
                $salesOrderTransferLine->transfer_line_id = $transferLine->id;
                $salesOrderTransferLine->save();
            }
        }
    }
}
