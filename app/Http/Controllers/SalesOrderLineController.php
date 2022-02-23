<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\SalesOrderLinesMassDestroyRequest;
use App\Models\SalesOrderLine;
use Illuminate\Http\JsonResponse;

class SalesOrderLineController
{
    public function mass_destroy(SalesOrderLinesMassDestroyRequest $request): JsonResponse
    {
        SalesOrderLine::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }
}
