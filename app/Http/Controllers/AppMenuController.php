<?php

namespace App\Http\Controllers;

use App\Data\SystemSetting;
use App\Http\Requests\AppMenuRequest;
use App\Http\Resources\AppMenuResource;
use App\Models\AppMenu;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AppMenuController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new AppMenu();
        $model = $model->filterAndOrder($request);
        return AppMenuResource::collection($model);
    }

    public function show(AppMenu $appMenu): JsonResponse
    {
        return response()->json(new AppMenuResource($appMenu));
    }

    public function store(AppMenuRequest $request): JsonResponse
    {
        return response()->json([], SystemSetting::STATUS_CREATE, $this->locationHeader(AppMenu::create($request->validated())));
    }

    public function update(AppMenuRequest $request, AppMenu $appMenu): JsonResponse
    {
        $appMenu->update($request->validated());
        return response()->json([], SystemSetting::STATUS_UPDATE);
    }

    public function destroy(AppMenu $appMenu): JsonResponse
    {
        $appMenu->delete();
        return response()->json([], SystemSetting::STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new AppMenu(), $request);
        return response()->json([], SystemSetting::STATUS_DELETE);
    }

    public function initial_values(): array
    {
        return [];
    }
}
