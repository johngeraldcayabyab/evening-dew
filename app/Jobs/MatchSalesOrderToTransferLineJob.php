<?php

namespace App\Jobs;

use App\Models\SalesOrder;
use App\Models\SalesOrderTransferLine;
use App\Models\TransferLine;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MatchSalesOrderToTransferLineJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $salesOrder;

    public function __construct(SalesOrder $salesOrder)
    {
        $this->salesOrder = $salesOrder;
    }

    public function handle()
    {
        $salesOrder = $this->salesOrder;
        if ($salesOrder->salesOrderTransfer()->doesntExist()) {
            return;
        }
        $salesOrderLines = $salesOrder->salesOrderLines;
        $salesOrderTransfer = $salesOrder->salesOrderTransfer;
        $transferLinesData = [];
        $newSalesOrderLine = [];
        $transfer = null;
        foreach ($salesOrderLines as $salesOrderLine) {
            if ($salesOrderLine->salesOrderTransferLine()->exists()) {
                $transfer = $salesOrderLine->salesOrderTransferLine->transfer;
                $transferLine = $salesOrderLine->salesOrderTransferLine->transferLine;
                $transferLine->description = $salesOrderLine->description;

                $transferLine->demand = $salesOrderLine->quantity; // conversion
                $transferLine->measurement_id = $salesOrderLine->measurement_id; // conversion

                $transferLine = $transferLine->toArray();
                unset($transferLine['updated_at']);
                $transferLinesData[] = $transferLine;
            } else {
                $transferLinesData[] = [
                    'product_id' => $salesOrderLine->product_id,
                    'description' => $salesOrderLine->description,

                    'demand' => $salesOrderLine->quantity, // conversion
                    'measurement_id' => $salesOrderLine->measurement_id, // conversion

                    'created_at' => $salesOrderLine->created_at,
                ];
                $newSalesOrderLine[] = $salesOrderLine;
            }
        }
        if (count($transferLinesData)) {
            TransferLine::massUpsert($transferLinesData, $transfer);
            SalesOrderTransferLine::matchSalesOrderOrTransferLines(
                $salesOrderTransfer,
                $salesOrder,
                $transfer,
                $newSalesOrderLine,
                new TransferLine(),
                'transfer_id'
            );
        }
        $trashedSalesOrderLines = $salesOrder->salesOrderLines()->onlyTrashed()->get();
        foreach ($trashedSalesOrderLines as $trashedSalesOrderLine) {
            $salesOrderTransferLine = $trashedSalesOrderLine->salesOrderTransferLine;
            if (!$salesOrderTransferLine) {
                continue;
            }
            $transferLine = $salesOrderTransferLine->transferLine;
            if (!$transferLine) {
                continue;
            }
            $salesOrderTransferLine->delete();
            $transferLine->delete();
        }
    }
}
