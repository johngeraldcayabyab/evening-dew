<?php

namespace App\Listeners;

use App\Events\ProductHasMaterial;
use App\Traits\StockTrait;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementForMaterialLines implements ShouldQueue
{
    use StockTrait;

    public function handle(ProductHasMaterial $event)
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
            $stockMovement = $this->storableProductGenerateMovement([
                'reference' => $reference,
                'source' => $source,
                'product_id' => $materialLine->product_id,
                'source_location_id' => $sourceLocationId,
                'destination_location_id' => $destinationLocationId,
                'quantity_done' => $materialLine->quantity * $event->demand,
                'product_type' => $materialLineProduct->product_type
            ]);
            if ($stockMovement) {
                $stockMovementData[] = $stockMovement;
            }
            $this->hasMaterialGenerateMovement([
                'product' => $materialLineProduct,
                'reference' => $reference,
                'source_document' => $source,
                'source_location_id' => $sourceLocationId,
                'destination_location_id' => $destinationLocationId,
                'demand' => $materialLine->quantity,
            ]);
        }
        $this->computeStockMovementData($stockMovementData);
    }
}
