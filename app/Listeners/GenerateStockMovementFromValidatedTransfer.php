<?php


namespace App\Listeners;

use App\Events\ProductHasMaterial;
use App\Events\TransferValidated;
use App\Jobs\ComputeProductQuantity;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Arr;

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
        $productIds = Arr::pluck($stockMovementData, 'product_id');
        ComputeProductQuantity::dispatch($productIds);
    }

    private function storableProductGenerateMovement($transfer, $transferLine)
    {
        $product = $transferLine->product;
        if (!Product::isStorable($product->product_type)) {
            return false;
        }
        return [
            'reference' => $transfer->reference,
            'source' => $transfer->source_document,
            'product_id' => $transferLine->product_id,
            'source_location_id' => $transfer->source_location_id,
            'destination_location_id' => $transfer->destination_location_id,
            'quantity_done' => $transferLine->demand,
        ];
    }

    private function hasMaterialGenerateMovement($transfer, $transferLine)
    {
        $product = $transferLine->product;
        if (!$product->material()->exists()) {
            return;
        }
        ProductHasMaterial::dispatch(
            $transfer->reference,
            $transfer->source_document,
            $transfer->source_location_id,
            $transfer->destination_location_id,
            $product->material,
            $transferLine->demand
        );
    }
}
