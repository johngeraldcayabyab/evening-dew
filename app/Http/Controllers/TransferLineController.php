<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\TransferLineMassDestroyRequest;
use App\Models\TransferLine;
use Illuminate\Http\JsonResponse;

class TransferLineController
{
    public function mass_destroy(TransferLineMassDestroyRequest $request): JsonResponse
    {
        TransferLine::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }
}
