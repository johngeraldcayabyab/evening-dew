<?php

namespace App\Observers;

use App\Models\StockMovement;

class StockMovementObserver
{
    public function updated(StockMovement $stockMovement)
    {
        if ($stockMovement->transferLineStockMovement()->exists()) {
            $transferLine = $stockMovement->transferLineStockMovement->transferLine;
            $transferLine->demand = $stockMovement->quantity_done;
            $transferLine->save();
        }
    }
}
