<?php

namespace App\Jobs;

use App\Models\SalesOrder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FixSalesOrderStepsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $salesOrders;

    public function __construct($salesOrders)
    {
        $this->salesOrders = $salesOrders;
    }

    public function handle()
    {
        $salesOrders = $this->salesOrders;
        foreach ($salesOrders as $salesOrder) {
            $salesOrder->steps = strtolower($salesOrder->status);
            $salesOrder->save();
        }
    }
}
