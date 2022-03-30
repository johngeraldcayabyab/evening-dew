<?php

namespace App\Listeners;

use App\Events\AdjustmentValidatedEvent;
use App\Events\ProductHasMaterialEvent;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedAdjustment implements ShouldQueue
{
    public function handle(AdjustmentValidatedEvent $event)
    {
        $adjustment = $event->adjustment;
        $adjustmentLines = $adjustment->adjustmentLines;
        $warehouse = $adjustment->warehouse;
        $operationType = $warehouse->adjustmentOperationType;
        $stockMovementData = [];
        foreach ($adjustmentLines as $adjustmentLine) {
            $adjustmentLineProduct = $adjustmentLine->product;
            if (Product::isStorable($adjustmentLineProduct->product_type)) {
                $sourceLocationId = null;
                $destinationLocationId = null;
                $quantityDone = $adjustmentLine->quantity_on_hand;
                if ($adjustmentLine->quantity_on_hand > $adjustmentLine->quantity_counted) {
                    $sourceLocationId = $warehouse->stock_location_id;
                    $destinationLocationId = $warehouse->adjustment_location_id;
                    $quantityDone = $adjustmentLine->quantity_on_hand - $adjustmentLine->quantity_counted;
                }
                if ($adjustmentLine->quantity_on_hand < $adjustmentLine->quantity_counted) {
                    $sourceLocationId = $warehouse->adjustment_location_id;
                    $destinationLocationId = $warehouse->stock_location_id;
                    $quantityDone = $adjustmentLine->quantity_counted - $adjustmentLine->quantity_on_hand;
                }
                $stockMovementData[] = [
                    'reference' => $adjustment->number,
                    'source' => $adjustment->number,
                    'product_id' => $adjustmentLine->product_id,
                    'source_location_id' => $sourceLocationId,
                    'destination_location_id' => $destinationLocationId,
                    'quantity_done' => $quantityDone,
                ];
            }
            if ($adjustmentLineProduct->material()->exists()) {

            }
        }
        if (count($stockMovementData)) {
            StockMovement::insertMany($stockMovementData);
        }
    }
}
