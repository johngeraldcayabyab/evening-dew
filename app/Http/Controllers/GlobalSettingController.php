<?php

namespace App\Http\Controllers;

use App\Http\Requests\Store\GlobalSettingStoreRequest;
use App\Http\Resources\Resource\GlobalSettingResource;
use App\Models\GlobalSetting;
use Illuminate\Http\JsonResponse;

class GlobalSettingController
{
    public function show(): JsonResponse
    {
        return response()->json(new GlobalSettingResource(GlobalSetting::latestFirst()));
    }

    public function store(GlobalSettingStoreRequest $request): JsonResponse
    {
        GlobalSetting::create($request->validated());
        $headers = ['Location' => route('global_settings.show')];
        return response()->json([], STATUS_CREATE, $headers);
    }

    public function initial_values(): JsonResponse
    {
        return response()->json(new GlobalSettingResource(GlobalSetting::latestFirst()));
    }
}
