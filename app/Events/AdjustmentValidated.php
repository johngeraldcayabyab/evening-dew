<?php

namespace App\Events;

use App\Models\Adjustment;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AdjustmentValidated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $adjustment;

    public function __construct(Adjustment $adjustment)
    {
        $this->adjustment = $adjustment;
    }
}
