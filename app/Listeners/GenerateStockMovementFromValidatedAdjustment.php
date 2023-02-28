<?php

namespace App\Listeners;

use App\Events\AdjustmentValidated;
use App\Traits\StockTrait;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedAdjustment implements ShouldQueue
{
    use StockTrait;

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
            if ($this->onHandGreaterThanCounted($adjustmentLine)) {
                $sourceLocationId = $warehouse->stock_location_id;
                $destinationLocationId = $warehouse->adjustment_location_id;
                $quantityDone = $adjustmentLine->quantity_on_hand - $adjustmentLine->quantity_counted;
            }
            if ($this->countedGreaterThanOnHand($adjustmentLine)) {
                $sourceLocationId = $warehouse->adjustment_location_id;
                $destinationLocationId = $warehouse->stock_location_id;
                $quantityDone = $adjustmentLine->quantity_counted - $adjustmentLine->quantity_on_hand;
            }
            $stockMovement = $this->storableProductGenerateMovement([
                'reference' => $adjustment->number,
                'source' => 'Product Quantity Updated',
                'product_id' => $adjustmentLine->product_id,
                'source_location_id' => $sourceLocationId,
                'destination_location_id' => $destinationLocationId,
                'quantity_done' => $quantityDone,
                'product_type' => $product->product_type,
            ]);
            if ($stockMovement) {
                $stockMovementData[] = $stockMovement;
            }
            $this->hasMaterialGenerateMovement([
                'product' => $product,
                'reference' => $adjustment->number,
                'source_document' => 'Product Quantity Updated',
                'source_location_id' => $sourceLocationId,
                'destination_location_id' => $destinationLocationId,
                'demand' => $quantityDone,
            ]);
        }
        $this->computeStockMovementData($stockMovementData);
    }

    private function onHandGreaterThanCounted($adjustmentLine)
    {
        if ($adjustmentLine->quantity_on_hand > $adjustmentLine->quantity_counted) {
            return true;
        }
        return false;
    }

    private function countedGreaterThanOnHand($adjustmentLine)
    {
        if ($adjustmentLine->quantity_on_hand < $adjustmentLine->quantity_counted) {
            return true;
        }
        return false;
    }
}
