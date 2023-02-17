<?php

namespace App\Events;

use App\Models\SalesOrder;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SalesOrderValidated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $salesOrder;

    public function __construct(SalesOrder $salesOrder)
    {
        $this->salesOrder = $salesOrder;
    }
}
