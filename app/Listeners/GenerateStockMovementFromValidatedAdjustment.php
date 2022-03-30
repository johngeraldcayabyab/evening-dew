<?php

namespace App\Listeners;

use App\Events\AdjustmentValidatedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedAdjustment implements ShouldQueue
{
    public function handle(AdjustmentValidatedEvent $event)
    {
        $adjustment = $event->adjustment;
    }
}
