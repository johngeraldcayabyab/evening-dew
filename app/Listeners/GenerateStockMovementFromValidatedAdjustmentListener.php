<?php

namespace App\Listeners;

use App\Events\AdjustmentValidated;
use App\Events\ProductHasMaterial;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedAdjustmentListener implements ShouldQueue
{
    public function handle(AdjustmentValidated $event)
    {
        $adjustment = $event->adjustment;
        $adjustmentLines = $adjustment->adjustmentLines;
        $warehouse = $adjustment->warehouse;
        $operationType = $warehouse->adjustmentOperationType;
        $stockMovementData = [];
        foreach ($adjustmentLines as $adjustmentLine) {
            $product = $adjustmentLine->product;
            $quantityDone = $adjustmentLine->quantity_on_hand;
            $sourceLocationId = null;
            $destinationLocationId = null;
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
            if (Product::isStorable($product->product_type)) {
                $stockMovementData[] = [
                    'reference' => $adjustment->number,
                    'source' => $adjustment->number,
                    'product_id' => $adjustmentLine->product_id,
                    'source_location_id' => $sourceLocationId,
                    'destination_location_id' => $destinationLocationId,
                    'quantity_done' => $quantityDone,
                ];
            }
            if ($product->material()->exists()) {
                ProductHasMaterial::dispatch(
                    $adjustment->number,
                    $adjustment->number,
                    $sourceLocationId,
                    $destinationLocationId,
                    $product->material,
                    $quantityDone,
                );
            }
        }
        if (count($stockMovementData)) {
            StockMovement::massUpsert($stockMovementData);
        }
    }
}
