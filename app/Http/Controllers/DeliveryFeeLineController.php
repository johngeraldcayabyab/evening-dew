<?php

namespace App\Http\Controllers;

use App\Models\DeliveryFeeLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DeliveryFeeLineController extends Controller
{
    use ControllerHelperTrait;

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new DeliveryFeeLine(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
