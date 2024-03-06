<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseSettingRequest;
use App\Http\Resources\PurchaseSettingResource;
use App\Models\PurchaseSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PurchaseSettingController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new PurchaseSetting();
        $model = $model->filterAndOrder($request);
        return PurchaseSettingResource::collection($model);
    }

    public function show(PurchaseSetting $purchaseSetting): JsonResponse
    {
        return response()->json(new PurchaseSettingResource($purchaseSetting));
    }

    public function store(PurchaseSettingRequest $request): JsonResponse
    {
        return $this->responseCreate(PurchaseSetting::create($request->validated()));
    }

    public function update(PurchaseSettingRequest $request, PurchaseSetting $purchaseSetting): JsonResponse
    {
        $purchaseSetting->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(PurchaseSetting $purchaseSetting): JsonResponse
    {
        $purchaseSetting->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new PurchaseSetting(), $request);
        return $this->responseDelete();
    }
}
