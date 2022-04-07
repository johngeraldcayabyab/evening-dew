<?php

namespace App\Observers;

use App\Data\SystemSetting;
use App\Models\GlobalSetting;
use App\Models\OperationType;
use App\Models\SalesOrderLine;
use App\Models\SalesOrderTransferLine;
use App\Models\Sequence;
use App\Models\Transfer;
use App\Models\TransferLine;
use Carbon\Carbon;

class TransferObserver
{
    public function creating(Transfer $transfer)
    {
        $transfer->scheduled_date = Carbon::parse($transfer->scheduled_date)->format(SystemSetting::DATE_TIME_FORMAT);
        if (!$transfer->shipping_policy) {
            $transfer->shipping_policy = Transfer::AS_SOON_AS_POSSIBLE;
        }
        if (!$transfer->responsible_id) {
            if (auth()->user()) {
                $transfer->responsible_id = auth()->user()->id;
            }
        }
        $operationType = OperationType::find($transfer->operation_type_id);
        $transferSequence = $operationType->referenceSequence;
        if ($transferSequence) {
            $transfer->reference = Sequence::generateSequence($transferSequence->id);
            $transferSequence->next_number = $transferSequence->next_number + $transferSequence->step;
            $transferSequence->save();
        }
        if ($operationType->type === OperationType::RECEIPT) {
            if (!$transfer->source_location_id) {
                if ($operationType->default_source_location_id) {
                    $transfer->source_location_id = $operationType->default_source_location_id;
                } else {
                    $transfer->source_location_id = GlobalSetting::latestFirst()->inventoryDefaultVendorLocation->id;
                }
            }
        } elseif ($operationType->type === OperationType::DELIVERY) {
            if (!$transfer->destination_location_id) {
                if ($operationType->default_destination_location_id) {
                    $transfer->destination_location_id = $operationType->default_destination_location_id;
                } else {
                    $transfer->destination_location_id = GlobalSetting::latestFirst()->inventoryDefaultCustomerLocation->id;
                }
            }
        }
    }

    public function updating(Transfer $transfer)
    {
        $transfer->scheduled_date = Carbon::parse($transfer->scheduled_date)->format(SystemSetting::DATE_TIME_FORMAT);
        if (!$transfer->shipping_policy) {
            $transfer->shipping_policy = Transfer::AS_SOON_AS_POSSIBLE;
        }
        if (!$transfer->responsible_id) {
            if (auth()->user()) {
                $transfer->responsible_id = auth()->user()->id;
            }
        }
    }

    public function updated(Transfer $transfer)
    {
        if ($transfer->salesOrderTransfer()->exists()) {
            $transferLines = $transfer->transferLines;
            $salesOrderTransfer = $transfer->salesOrderTransfer;
            $salesOrderLineData = [];
            $newTransferLines = [];
            $salesOrder = null;
            foreach ($transferLines as $transferLine) {
                if ($transferLine->salesOrderTransferLine()->exists()) {
                    $salesOrder = $transferLine->salesOrderTransferLine->salesOrder;
                    $salesOrderLine = $transferLine->salesOrderTransferLine->salesOrderLine;
                    $salesOrderLine->description = $transferLine->description;
                    $salesOrderLine->quantity = $transferLine->demand;
                    $salesOrderLine->measurement_id = $transferLine->measurement_id;
                    $salesOrderLine = $salesOrderLine->toArray();
                    unset($salesOrderLine['updated_at']);
                    $salesOrderLineData[] = $salesOrderLine;
                } else {
                    $salesOrderLineData[] = [
                        'product_id' => $transferLine->product_id,
                        'description' => $transferLine->description,
                        'quantity' => $transferLine->demand,
                        'measurement_id' => $transferLine->measurement_id,
                        'created_at' => $transferLine->created_at,
                    ];
                    $newTransferLines[] = $transferLine;
                }
            }
            if (count($salesOrderLineData)) {
                SalesOrderLine::updateOrCreateMany($salesOrderLineData, $salesOrder->id);
                $this->createSalesOrderTransferLines($salesOrderTransfer, $salesOrder, $transfer, $newTransferLines);
            }
        }
    }

    private function createSalesOrderTransferLines
    (
        $salesOrderTransfer,
        $salesOrder,
        $transfer,
        $transferLines
    )
    {
        $lines = [];
        foreach ($transferLines as $salesOrderLine) {
            $salesOrderLine = SalesOrderLine::where('sales_order_id', $salesOrder->id)
                ->where('product_id', $salesOrderLine->product_id)
                ->where('measurement_id', $salesOrderLine->measurement_id)
                ->where('created_at', $salesOrderLine->created_at)
                ->first();
            $lines[] = [
                'sales_order_id' => $salesOrder->id,
                'transfer_id' => $transfer->id,
                'sales_order_line_id' => $salesOrderLine->id,
                'transfer_line_id' => $salesOrderLine->id,
                'sales_order_transfer_id' => $salesOrderTransfer->id,
            ];
        }
        if (count($lines)) {
            SalesOrderTransferLine::updateOrCreateMany($lines, $salesOrderTransfer->id);
        }
    }
}
