<?php

namespace App\Events;

use App\Models\SalesOrderLine;
use App\Models\SalesOrderTransferLine;
use App\Models\Transfer;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MatchTransferToSalesOrderLine implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(Transfer $transfer)
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
            $trashedTransferLines = $transfer->transferLines()->onlyTrashed()->get();
            foreach ($trashedTransferLines as $trashedTransferLine) {
                $salesOrderTransferLine = $trashedTransferLine->salesOrderTransferLine;
                if (!$salesOrderTransferLine) {
                    continue;
                }
                $salesOrderLine = $salesOrderTransferLine->salesOrderLine;
                if (!$salesOrderLine) {
                    continue;
                }
                $salesOrderTransferLine->delete();
                $salesOrderLine->delete();
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
