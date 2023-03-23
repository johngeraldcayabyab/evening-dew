<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MenuController extends Controller
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
        return $this->responseCreate(Menu::create($request->validated()));
    }

    public function update(MenuRequest $request, Menu $menu): JsonResponse
    {
        $menu->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Menu $menu): JsonResponse
    {
        $menu->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Menu(), $request);
        return $this->responseDelete();
    }
}
