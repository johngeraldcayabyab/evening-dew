<?php

namespace App\Listeners;

use App\Events\ProductHasMaterialEvent;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementForMaterialLinesListener implements ShouldQueue
{
    public function handle(ProductHasMaterialEvent $event)
    {
        $material = $event->material;
    }
}
