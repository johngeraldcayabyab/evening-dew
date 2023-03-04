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
        /**
         * select
         *      COUNT(stock.product_id),
         *      COUNT(stock.destination_location_id),
         *      prod.name,
         *      loc.name,
         *      ((select COALESCE(sum(stock_destination.quantity_done), 0)
         * from stock_movements as stock_destination
         *  where stock_destination.product_id = prod.id
         *  and stock_destination.destination_location_id = loc.id) -
         *  hnu865u(select COALESCE(sum(stock_source.quantity_done), 0)
         *  from stock_movements as stock_source
         *  where stock_source.product_id = prod.id
         *  and stock_source.source_location_id = loc.id)) as quantity
         *  from stock_movements as stock
         *  left join products as prod on prod.id = stock.product_id
         *  left join locations as loc on loc.id = stock.destination_location_id
         * where stock.destination_location_id in (select id from locations where type = 'internal')
         * group by stock.product_id, stock.destination_location_id;
         */
        return [];
//        return Location::where('type', Location::INTERNAL)
//            ->get()
//            ->map(function ($internalLocation) {
//                $stockMovementSourceLocationSum = $internalLocation->stockMovementSources()
//                    ->where('source_location_id', $internalLocation->id)
//                    ->pluck('quantity_done')
//                    ->sum();
//                $stockMovementDestinationLocationSum = $internalLocation->stockMovementDestinations()
//                    ->where('destination_location_id', $internalLocation->id)
//                    ->pluck('quantity_done')
//                    ->sum();
//                return $stockMovementDestinationLocationSum - $stockMovementSourceLocationSum;
//            });
    }
}
