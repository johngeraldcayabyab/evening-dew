<?php

namespace App\Http\Controllers;


use App\Data\SystemSetting;
use App\Http\Requests\MassDestroy\MenuMassDestroyRequest;
use App\Http\Requests\Store\MenuStoreRequest;
use App\Http\Requests\Update\MenuUpdateRequest;
use App\Http\Resources\Collection\MenuCollection;
use App\Http\Resources\Resource\MenuResource;
use App\Http\Resources\Slug\MenuSlugResource;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return new MenuCollection($model);
    }

    public function show(Menu $menu): JsonResponse
    {
        return response()->json(new MenuResource($menu));
    }

    public function store(MenuStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(Menu::create($request->validated())));
    }

    public function update(MenuUpdateRequest $request, Menu $menu): JsonResponse
    {
        $menu->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Menu $menu): JsonResponse
    {
        $menu->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(MenuMassDestroyRequest $request): JsonResponse
    {
        Menu::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Menu $menu): JsonResponse
    {
        return response()->json(new MenuSlugResource($menu));
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new Menu(), $request);
        return response()->json(MenuSlugResource::collection($model));
    }
}
