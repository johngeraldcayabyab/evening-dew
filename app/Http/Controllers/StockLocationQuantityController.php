<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockLocationQuantityResource;
use App\Models\Location;
use App\Models\StockMovement;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StockLocationQuantityController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $internalLocationIds = Location::where('type', Location::INTERNAL)->pluck('id');
        $destinationRaw = StockMovement::from('stock_movements as stock_destination')
            ->selectRaw('COALESCE(sum(stock_destination.quantity_done), 0)')
            ->where('stock_destination.product_id', 'products.id')
            ->where('stock_destination.destination_location_id', 'locations.id')
            ->sqlRaw();
        $sourceRaw = StockMovement::from('stock_movements as stock_source')
            ->selectRaw('COALESCE(sum(stock_source.quantity_done), 0)')
            ->where('stock_source.product_id', 'products.id')
            ->where('stock_source.source_location_id', 'locations.id')
            ->sqlRaw();
        $rawQuery = "(($destinationRaw) - ($sourceRaw)) as quantity";
        $stockLocationQuantity = StockMovement::from('stock_movements as stock_movement_quantity')
            ->selectRaw("
                COUNT(stock_movement_quantity.product_id) as product_aggregate,
                COUNT(stock_movement_quantity.destination_location_id) as location_aggregate,
                products.name as product_name,
                locations.name as location_name,
                $rawQuery"
            )
            ->leftJoin('products', 'products.id', '=', 'stock_movement_quantity.product_id')
            ->leftJoin('locations', 'locations.id', '=', 'stock_movement_quantity.destination_location_id')
            ->whereIn('destination_location_id', $internalLocationIds)
            ->groupBy('stock_movements.product_id', 'stock_movements.destination_location_id')
            ->paginate();
        return StockLocationQuantityResource::collection($stockLocationQuantity);
    }
}
