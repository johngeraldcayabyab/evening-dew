<?php

namespace App\Jobs;

use App\Models\SalesOrder;
use App\Models\SalesOrderLine;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AddShippingDateToSalesOrderLineJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $salesOrderLines;

    public function __construct($salesOrderLines)
    {
        $this->salesOrderLines = $salesOrderLines;
    }

    public function handle()
    {
        $salesOrderLines = $this->salesOrderLines;
        foreach ($salesOrderLines as $salesOrderLine) {
            $salesOrderLine = SalesOrderLine::find($salesOrderLine->id);
            if ($salesOrderLine && $salesOrderLine->salesOrder) {
                $salesOrderLine->shipping_date = $salesOrderLine->salesOrder->shipping_date;
                $salesOrderLine->save();
            }
        }
    }
}
