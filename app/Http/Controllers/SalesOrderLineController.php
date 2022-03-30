<?php

namespace App\Http\Controllers;

use App\Models\SalesOrderLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SalesOrderLineController
{
    use ControllerHelperTrait;

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new SalesOrderLine(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
