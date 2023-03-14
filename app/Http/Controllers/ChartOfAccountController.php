<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChartOfAccountRequest;
use App\Http\Resources\ChartOfAccountResource;
use App\Models\ChartOfAccount;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ChartOfAccountController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new ChartOfAccount();
        $model = $model->filterAndOrder($request);
        return ChartOfAccountResource::collection($model);
    }

    public function show(ChartOfAccount $chartOfAccount): JsonResponse
    {
        return response()->json(new ChartOfAccountResource($chartOfAccount));
    }

    public function store(ChartOfAccountRequest $request): JsonResponse
    {
        return $this->responseCreate(ChartOfAccount::create($request->validated()));
    }

    public function update(ChartOfAccountRequest $request, ChartOfAccount $chartOfAccount): JsonResponse
    {
        $chartOfAccount->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(ChartOfAccount $chartOfAccount): JsonResponse
    {
        $chartOfAccount->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new ChartOfAccount(), $request);
        return $this->responseDelete();
    }
}
