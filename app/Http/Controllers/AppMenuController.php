<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppMenuRequest;
use App\Http\Resources\AppMenuResource;
use App\Models\AppMenu;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AppMenuController extends Controller
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
        return $this->responseCreate(AppMenu::create($request->validated()));
    }

    public function update(AppMenuRequest $request, AppMenu $appMenu): JsonResponse
    {
        $appMenu->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(AppMenu $appMenu): JsonResponse
    {
        $appMenu->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new AppMenu(), $request);
        return $this->responseDelete();
    }

    public function initial_values(): array
    {
        return [];
    }
}
