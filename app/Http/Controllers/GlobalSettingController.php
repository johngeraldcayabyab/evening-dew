<?php

namespace App\Http\Controllers;

use App\Http\Requests\GlobalSettingRequest;
use App\Http\Resources\GlobalSettingResource;
use App\Models\GlobalSetting;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

class GlobalSettingController extends Controller
{
    use ControllerHelperTrait;

    public function show(GlobalSetting $globalSetting): JsonResponse
    {
        return response()->json(new GlobalSettingResource($globalSetting));
    }

    public function store(GlobalSettingRequest $request): JsonResponse
    {
        $previousGlobalSetting = Arr::except(GlobalSetting::latestFirst()->toArray(), ['id', 'deleted_at', 'created_at', 'updated_at']);
        $previousGlobalSettingWithNewData = array_replace($previousGlobalSetting, $request->validated());
        GlobalSetting::create($previousGlobalSettingWithNewData);
        return $this->responseCreate();
    }

    public function initial_values(): JsonResponse
    {
        return response()->json(new GlobalSettingResource(GlobalSetting::latestFirst()));
    }
}
