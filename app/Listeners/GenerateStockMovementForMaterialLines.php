<?php

namespace App\Listeners;

use App\Events\ProductHasMaterialEvent;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementForMaterialLines implements ShouldQueue
{
    public function handle(ProductHasMaterialEvent $event)
    {
        $reference = $event->reference;
        $source = $event->source;
        $sourceLocationId = $event->sourceLocationId;
        $destinationLocationId = $event->destinationLocationId;
        $material = $event->material;
        $materialLines = $material->materialLines;
        $stockMovementData = [];
        foreach ($materialLines as $materialLine) {
            $materialLineProduct = $materialLine->product;
            if (Product::isStorable($materialLineProduct->product_type)) {
                $stockMovementData[] = [
                    'reference' => $reference,
                    'source' => $source,
                    'product_id' => $materialLine->product_id,
                    'source_location_id' => $sourceLocationId,
                    'destination_location_id' => $destinationLocationId,
                    'quantity_done' => $materialLine->quantity * $event->demand,
                ];
            }
            if ($materialLineProduct->material()->exists()) {
                ProductHasMaterialEvent::dispatch(
                    $reference,
                    $source,
                    $sourceLocationId,
                    $destinationLocationId,
                    $materialLineProduct->material,
                    $materialLine->quantity
                );
            }
        }
        if (count($stockMovementData)) {
            StockMovement::insertMany($stockMovementData);
        }
    }
}
