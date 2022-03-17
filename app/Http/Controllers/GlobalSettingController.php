<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\GlobalSettingStoreRequest;
use App\Http\Resources\GlobalSettingResource;
use App\Models\GlobalSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

class GlobalSettingController
{
    use ControllerHelperTrait;

    public function show(GlobalSetting $globalSetting): JsonResponse
    {
        return response()->json(new GlobalSettingResource($globalSetting));
    }

    public function store(GlobalSettingStoreRequest $request): JsonResponse
    {
        $previousGlobalSetting = Arr::except(GlobalSetting::latestFirst()->toArray(), ['id', 'deleted_at', 'created_at', 'updated_at']);
        $previousGlobalSettingWithNewData = array_replace($previousGlobalSetting, $request->validated());
        return response()->json([], STATUS_CREATE, $this->locationHeader(GlobalSetting::create($previousGlobalSettingWithNewData)));
    }

    public function initial_values(): JsonResponse
    {
        return response()->json(new GlobalSettingResource(GlobalSetting::latestFirst()));
    }
}
