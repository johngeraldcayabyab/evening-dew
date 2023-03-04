<?php

namespace App\Http\Controllers;

use App\Http\Resources\SourceResource;
use App\Models\Location;
use App\Models\Product;
use App\Models\Source;
use App\Models\StockMovement;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StockLocationQuantityController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request)
    {
        $internalLocationIds = Location::where('type', Location::INTERNAL)->pluck('id');
        $destinationRaw = 'select COALESCE(sum(stock_destination.quantity_done), 0) from stock_movements as stock_destination where stock_destination.product_id = products.id and stock_destination.destination_location_id = locations.id';
        $sourceRaw = 'select COALESCE(sum(stock_source.quantity_done), 0) from stock_movements as stock_source where stock_source.product_id = products.id and stock_source.source_location_id = locations.id';
        $rawQuery = "(($destinationRaw) - ($sourceRaw)) as quantity";
        return StockMovement::selectRaw("COUNT(stock_movements.product_id) as product_aggregate, COUNT(stock_movements.destination_location_id) as location_aggregate, products.name as product_name, locations.name as location_name, $rawQuery")
            ->leftJoin('products', 'products.id', '=', 'stock_movements.product_id')
            ->leftJoin('locations', 'locations.id', '=', 'stock_movements.destination_location_id')
            ->whereIn('destination_location_id', $internalLocationIds)
            ->groupBy('stock_movements.product_id', 'stock_movements.destination_location_id')
            ->paginate();
    }
}
