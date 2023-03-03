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
        return Location::where('type', Location::INTERNAL)
            ->get()
            ->map(function ($internalLocation) {
                $stockMovementSourceLocationSum = $internalLocation->stockMovementSources()
                    ->where('source_location_id', $internalLocation->id)
                    ->pluck('quantity_done')
                    ->sum();
                $stockMovementDestinationLocationSum = $internalLocation->stockMovementDestinations()
                    ->where('destination_location_id', $internalLocation->id)
                    ->pluck('quantity_done')
                    ->sum();
                return $stockMovementDestinationLocationSum - $stockMovementSourceLocationSum;
            });
    }
}
