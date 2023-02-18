<?php

namespace App\Listeners;

use App\Events\ProductHasMaterial;
use App\Events\TransferValidated;
use App\Models\Product;
use App\Models\StockMovement;
use App\Models\TransferLineStockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;

class GenerateStockMovementFromValidatedTransfer implements ShouldQueue
{
    public function handle(TransferValidated $event)
    {
        $transfer = $event->transfer;
        $transferLines = $transfer->transferLines;
        $stockMovementData = [];
        if (!$transfer->isDone($transfer->status)) {
            return;
        }
        foreach ($transferLines as $transferLine) {
            $stockMovement = $this->storableProductGenerateMovement($transfer, $transferLine);
            if ($stockMovement) {
                $stockMovementData[] = $stockMovement;
            }
            $this->hasMaterialGenerateMovement($transfer, $transferLine);
        }
        if (!count($stockMovementData)) {
            return;
        }
        StockMovement::massUpsert($stockMovementData);

        /**
         * This block of code is important for the stock movement
         * because it keeps the stock movement pure from
         * any dependencies.
         */
        $transferLineStockMovementLines = [];
        foreach ($transferLines as $transferLine) {
            $stockMovement = StockMovement::where('product_id', $transferLine->product_id)
                ->where('created_at', $transferLine->created_at)
                ->first();
            $transferLineStockMovementLines[] = [
                'transfer_id' => $transfer->id,
                'transfer_line_id' => $transferLine->id,
                'stock_movement_id' => $stockMovement->id,
            ];
        }
        if (count($transferLineStockMovementLines)) {
            TransferLineStockMovement::massUpsert($transferLineStockMovementLines);
        }
    }

    private function storableProductGenerateMovement($transfer, $transferLine)
    {
        $product = $transferLine->product;
        if (!Product::isStorable($product->product_type)) {
            return false;
        }
        $stockMovement = [
            'reference' => $transfer->reference,
            'source' => $transfer->reference,
            'product_id' => $transferLine->product_id,
            'source_location_id' => $transfer->source_location_id,
            'destination_location_id' => $transfer->destination_location_id,
            'quantity_done' => $transferLine->demand,
            'created_at' => $transferLine->created_at,
        ];
        if ($transferLine->transferLineStockMovement()->exists()) {
            $stockMovement = $transferLine->transferLineStockMovement->stockMovement;
            $stockMovement->quantity_done = $transferLine->demand;
            $stockMovement = $stockMovement->toArray();
            unset($stockMovement['updated_at']);
        }
        return $stockMovement;
    }

    private function hasMaterialGenerateMovement($transfer, $transferLine)
    {
        $product = $transferLine->product;
        if (!$product->material()->exists()) {
            return;
        }
        ProductHasMaterial::dispatch(
            $transfer->reference,
            $transfer->reference,
            $transfer->source_location_id,
            $transfer->destination_location_id,
            $product->material,
            $transferLine->demand
        );
    }
}
