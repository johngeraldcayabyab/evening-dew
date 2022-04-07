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
        $operationType = $this->getOperationType();
        if ($operationType) {
            if (!$salesOrder->salesOrderTransfer()->exists()) {
                $transfer = $this->createTransferAndLines($operationType, $salesOrder);
                $salesOrderTransfer = $this->createSalesOrderTransfer($salesOrder, $transfer);
                return;
            }

            $salesOrderLines = $salesOrder->salesOrderLines;
//            $salesOrderTransferLineData = [];
            $transferLinesData = [];

//            foreach ($salesOrderLines as $salesOrderLine) {
//
//                if($salesOrderLine->salesOrderTransferLine()->){
//
//                }
//
//
//
//            }


//            $transferLineData = [];
//
////            $existingSalesOrderLines = [];
////            $newSalesOrderLines = [];
//            $salesOrderTransferLinesData = [];

//
//            foreach ($salesOrderLines as $salesOrderLine) {
//                if ($salesOrderLine->salesOrderTransferLine()->exists()) {
//                    // Since you exists, you dont need to create a new transfer line, you just need to update the transfer line
////                    $salesOrderTransferLine = $salesOrderLine->salesOrderTransferLine;
////                    $salesOrderTransferData[] = [
////                        'id' => $salesOrderTransferLine->id,
////                        'sales_order_id' => $salesOrderTransferLine->sales_order_id,
////                        'transfer_id' => $salesOrderTransferLine['transfer_id'],
////                        'sales_order_line_id' => $datum['sales_order_line_id'],
////                        'transfer_line_id' => $datum['transfer_line_id'],
////                    ];
//                } else {
//                    // Since you DONT exists, you need to create a new transfer line
//                    // Create a line first before creating sales order transfer line
//
//
////                    $salesOrderTransferLineData[] = [
////                        'sales_order_id' => $salesOrderLine->sales_order_id,
////                        'transfer_id' => $salesOrderLine['transfer_id'],
////                        'sales_order_line_id' => $datum['sales_order_line_id'],
////                        'transfer_line_id' => $datum['transfer_line_id'],
////                    ];
//                }
//            }


//            $transfer = $this->createTransferAndLines($salesOrder, $operationType);
//            $salesOrderTransfer = SalesOrderTransfer::where('sales_order_id', $salesOrder->id)->where('transfer_id', $transfer->id)->first();
//            if (!$salesOrderTransfer) {
//                $salesOrderTransfer = SalesOrderTransfer::create([
//                    'sales_order_id' => $salesOrder->id,
//                    'transfer_id' => $transfer->id
//                ]);
//            }
//            $this->createSalesOrderTransferLines($salesOrderTransfer, $salesOrder->salesOrderLines, $transfer->transferLines);
        }
    }

    private function getOperationType()
    {
        $inventoryDefaultWarehouse = GlobalSetting::latestFirst()->inventoryDefaultWarehouse;
        if (!$inventoryDefaultWarehouse) {
            return false;
        }
        $operationType = OperationType::where('warehouse_id', $inventoryDefaultWarehouse->id)->where('type', OperationType::DELIVERY)->first(); //By default, it gets the latest operation type created
        if (!$operationType) {
            return false;
        }
        return $operationType;
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
            ];
        }
        if (count($transferLinesDataCreate)) {
            TransferLine::insertMany($transferLinesDataCreate, $transfer->id);
        }
    }

    private function createSalesOrderTransferLines($salesOrderTransfer, $salesOrderLines, $transferLines)
    {
        $lines = [];
        foreach ($salesOrderLines as $salesOrderLine) {

        }
    }

//    private function createSalesOrderTransferLines($salesOrderTransfer, $salesOrderLines, $transferLines)
//    {
//        $lines = [];
//        foreach ($salesOrderLines as $salesOrderLine) {
//
//        }
//
////        foreach ($salesOrderLines as $salesOrderLine) {
////            foreach ($transferLines as $transferLine) {
////                if ($salesOrderLine->product_id !== $transferLine->product_id) {
////                    continue;
////                }
////                if ($salesOrderLine->description !== $transferLine->description) {
////                    continue;
////                }
////                if ($salesOrderLine->quantity !== $transferLine->demand) {
////                    continue;
////                }
////                if ($salesOrderLine->measurement_id !== $transferLine->measurement_id) {
////                    continue;
////                }
////                $salesOrderTransferLine = new SalesOrderTransferLine();
////                $salesOrderTransferLine->sales_order_id = $salesOrderLine->sales_order_id;
////                $salesOrderTransferLine->transfer_id = $transferLine->transfer_id;
////                $salesOrderTransferLine->sales_order_line_id = $salesOrderLine->id;
////                $salesOrderTransferLine->transfer_line_id = $transferLine->id;
////                $salesOrderTransferLine->save();
////            }
////        }
//    }
}
