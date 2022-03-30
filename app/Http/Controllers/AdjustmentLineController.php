<?php

namespace App\Http\Controllers;

use App\Models\AdjustmentLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdjustmentLineController
{
    use ControllerHelperTrait;

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new AdjustmentLine(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
