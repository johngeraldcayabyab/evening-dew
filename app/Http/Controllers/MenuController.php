<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MenuController
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Menu();
        $model = $model->filterAndOrder($request);
        return MenuResource::collection($model);
    }

    public function show(Menu $menu): JsonResponse
    {
        return response()->json(new MenuResource($menu));
    }

    public function store(MenuRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Menu::create($request->validated())));
    }

    public function update(MenuRequest $request, Menu $menu): JsonResponse
    {
        $menu->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Menu $menu): JsonResponse
    {
        $menu->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Menu(), $request);
        return response()->json([], STATUS_DELETE);
    }
}
