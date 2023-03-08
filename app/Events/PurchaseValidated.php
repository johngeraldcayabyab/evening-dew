<?php

namespace App\Events;

use App\Models\Purchase;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PurchaseValidated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $purchase;

    public function __construct(Purchase $purchase)
    {
        $this->purchase = $purchase;
    }
}
