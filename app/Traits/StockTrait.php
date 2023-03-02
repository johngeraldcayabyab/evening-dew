<?php

namespace App\Traits;

use App\Events\ProductHasMaterial;
use App\Jobs\ComputeProductQuantity;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Support\Arr;

trait StockTrait
{
    public function storableProductGenerateMovement(array $data)
    {
        if (!Product::isStorable($data['product_type'])) {
            return false;
        }
        return [
            'reference' => $data['reference'],
            'source' => $data['source'],
            'product_id' => $data['product_id'],
            'source_location_id' => $data['source_location_id'],
            'destination_location_id' => $data['destination_location_id'],
            'quantity_done' => $data['quantity_done']
        ];
    }

    public function hasMaterialGenerateMovement(array $data)
    {
        $product = $data['product'];
        if (!$product->material()->exists()) {
            return;
        }
        ProductHasMaterial::dispatch(
            $data['reference'],
            $data['source_document'],
            $data['source_location_id'],
            $data['destination_location_id'],
            $product->material,
            $data['demand'],
        );
    }

    public function computeStockMovementData($stockMovementData)
    {
        if (!count($stockMovementData)) {
            return;
        }
        StockMovement::massUpsert($stockMovementData);
        $productIds = Arr::pluck($stockMovementData, 'product_id');
        ComputeProductQuantity::dispatch($productIds);
    }
}
