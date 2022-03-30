<?php

namespace App\Http\Controllers;

use App\Models\TransferLine;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransferLineController
{
    use ControllerHelperTrait;

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new TransferLine(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
