<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesSettingRequest;
use App\Http\Resources\SalesSettingResource;
use App\Models\SalesSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SalesSettingController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new SalesSetting();
        $model = $model->filterAndOrder($request);
        return SalesSettingResource::collection($model);
    }

    public function show(SalesSetting $salesSetting): JsonResponse
    {
        return response()->json(new SalesSettingResource($salesSetting));
    }

    public function store(SalesSettingRequest $request): JsonResponse
    {
        return $this->responseCreate(SalesSetting::create($request->validated()));
    }

    public function update(SalesSettingRequest $request, SalesSetting $salesSetting): JsonResponse
    {
        $salesSetting->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(SalesSetting $salesSetting): JsonResponse
    {
        $salesSetting->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new SalesSetting(), $request);
        return $this->responseDelete();
    }
}
