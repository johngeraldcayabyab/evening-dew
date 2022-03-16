<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\GlobalSettingStoreRequest;
use App\Http\Resources\GlobalSettingResource;
use App\Models\GlobalSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

class GlobalSettingController
{
    public function show(): JsonResponse
    {
        return response()->json(new GlobalSettingResource(GlobalSetting::latestFirst()));
    }

    public function store(GlobalSettingStoreRequest $request): JsonResponse
    {
        $previousGlobalSetting = Arr::except(GlobalSetting::latestFirst()->toArray(), ['id', 'deleted_at', 'created_at', 'updated_at']);
        $previousGlobalSettingWithNewData = array_replace($previousGlobalSetting, $request->validated());
        GlobalSetting::create($previousGlobalSettingWithNewData);
        $headers = ['Location' => route('global_settings.show')];
        return response()->json([], STATUS_CREATE, $headers);
    }

    public function initial_values(): JsonResponse
    {
        return response()->json(new GlobalSettingResource(GlobalSetting::latestFirst()));
    }
}
