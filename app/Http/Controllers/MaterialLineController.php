<?php

namespace App\Http\Controllers;

use App\Models\MaterialLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MaterialLineController
{
    use ControllerHelperTrait;

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new MaterialLine(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
