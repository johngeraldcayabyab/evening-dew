<?php

namespace App\Events;

use App\Models\StockMovement;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MatchStockMovementToTransferLine implements ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(StockMovement $stockMovement)
    {
        if ($stockMovement->transferLineStockMovement()->exists()) {
            $transferLine = $stockMovement->transferLineStockMovement->transferLine;
            $transferLine->demand = $stockMovement->quantity_done;
            $transferLine->save();
        }
    }
}
