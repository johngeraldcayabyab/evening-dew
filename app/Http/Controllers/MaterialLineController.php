<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\MaterialLineMassDestroyRequest;
use App\Models\MaterialLine;
use Illuminate\Http\JsonResponse;

class MaterialLineController
{
    public function mass_destroy(MaterialLineMassDestroyRequest $request): JsonResponse
    {
        MaterialLine::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }
}
