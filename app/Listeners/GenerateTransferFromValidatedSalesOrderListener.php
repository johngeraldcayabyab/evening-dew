<?php

namespace App\Listeners;

use App\Data\SystemSetting;
use App\Events\SalesOrderValidatedEvent;
use App\Models\GlobalSetting;
use App\Models\OperationType;
use App\Models\SalesOrderTransfer;
use App\Models\Transfer;
use App\Models\TransferLine;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class GenerateTransferFromValidatedSalesOrderListener implements ShouldQueue
{
    public function handle(SalesOrderValidatedEvent $event)
    {
        $salesOrder = $event->salesOrder;
        $transfer = new Transfer();
        $transfer->contact_id = $salesOrder->customer_id;
        $inventoryDefaultWarehouse = GlobalSetting::latestFirst()->inventoryDefaultWarehouse;
        if ($inventoryDefaultWarehouse) {
            $operationType = OperationType::whereWarehouseId($inventoryDefaultWarehouse->id)->whereType(OperationType::DELIVERY)->first(); //By default, it gets the latest operation type created
            if ($operationType) {
                $transfer->operation_type_id = $operationType->id;
                $transfer->source_location_id = $operationType->default_source_location_id;
                $transfer->scheduled_date = now()->format(SystemSetting::DATE_TIME_FORMAT);
                $transfer->source_document = $salesOrder->number;
                $transfer->status = Transfer::DRAFT;
                $transfer->save();

                $transferLinesData = [];
                $salesOrderLines = $salesOrder->salesOrderLines;
                foreach ($salesOrderLines as $salesOrderLine) {
                    $transferLinesData[] = [
                        'product_id' => $salesOrderLine->product_id,
                        'description' => $salesOrderLine->description,
                        'demand' => $salesOrderLine->quantity,
                        'measurement_id' => $salesOrderLine->measurement_id,
                    ];
                }
                if (count($transferLinesData)) {
                    TransferLine::insertMany($transferLinesData, $transfer->id);
                }

                SalesOrderTransfer::create([
                    'sales_order_id' => $salesOrder->id,
                    'transfer_id' => $transfer->id
                ]);
            }
        }
    }
}
