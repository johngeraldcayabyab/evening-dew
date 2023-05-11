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
            ->withTrashed()
            ->whereNull("stock_destination.deleted_at")
            ->sqlRaw();
        $sourceRaw = StockMovement::from('stock_movements as stock_source')
            ->selectRaw('COALESCE(sum(stock_source.quantity_done), 0)')
            ->where('stock_source.product_id', 'products.id')
            ->where('stock_source.source_location_id', 'locations.id')
            ->withTrashed()
            ->whereNull("stock_source.deleted_at")
            ->sqlRaw();
        $rawQuery = "(($destinationRaw) - ($sourceRaw)) as quantity";

        /*
         * TODO - performance issue
         *      - null parent location id check
         * */
        $locationName = Location::from('locations as l')
            ->selectRaw('name')
            ->where('l.id', 'locations.parent_location_id')
            ->withTrashed()
            ->whereNull("l.deleted_at")
            ->sqlRaw();

        $stockLocationQuantity = StockMovement::from('stock_movements as stock_movement_quantity')
            ->selectRaw("
                COUNT(stock_movement_quantity.product_id) as product_aggregate,
                COUNT(stock_movement_quantity.destination_location_id) as location_aggregate,
                product_id,
                stock_movement_quantity.destination_location_id as location_id,
                products.name as product_name,
                CONCAT(COALESCE(($locationName),''),' / ' ,locations.name) as location_name,
                $rawQuery"
            )
            ->leftJoin('products', 'products.id', '=', 'stock_movement_quantity.product_id')
            ->leftJoin('locations', 'locations.id', '=', 'stock_movement_quantity.destination_location_id');
        if ($request->product_id) {
            $stockLocationQuantity = $stockLocationQuantity
                ->where('stock_movement_quantity.product_id', $request->product_id);
        }
        $stockLocationQuantity = $stockLocationQuantity
            ->whereIn('destination_location_id', $internalLocationIds)
            ->withTrashed()
            ->whereNull("stock_movement_quantity.deleted_at")
            ->groupBy('stock_movement_quantity.product_id', 'stock_movement_quantity.destination_location_id')
            ->paginate();
        return StockLocationQuantityResource::collection($stockLocationQuantity);
    }
}
