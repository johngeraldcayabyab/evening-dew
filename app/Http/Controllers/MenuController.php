<?php

namespace App\Http\Controllers;


use App\Data\SystemSetting;
use App\Http\Query\MenuQuery;
use App\Http\Requests\MassDestroy\MenuMassDestroyRequest;
use App\Http\Requests\Store\MenuStoreRequest;
use App\Http\Requests\Update\MenuUpdateRequest;
use App\Http\Resources\Collection\MenuCollection;
use App\Http\Resources\Resource\MenuResource;
use App\Http\Resources\Slug\MenuSlugResource;
use App\Models\Menu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MenuController
{
    public function index(Request $request): ResourceCollection
    {
        $model = new Menu();
        $requestQuery = new MenuQuery();
        $model = $requestQuery->search($model, $request);
        $model = $requestQuery->sort($model, $request);
        return new MenuCollection($model->paginate(SystemSetting::PAGE_SIZE));
    }

    public function show(Menu $menu): JsonResponse
    {
        return response()->json(new MenuResource($menu));
    }

    public function store(MenuStoreRequest $request): JsonResponse
    {
        $headers = ['Location' => route('menus.show', Menu::create($request->validated()))];
        return response()->json([], STATUS_CREATE, $headers);
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
        $menu = new Menu();
        if ($request->search) {
            $menu = $menu->where('label', 'like', "%$request->search%");
        }
        $menu = $menu->limit(SystemSetting::OPTION_LIMIT)->get(['id', 'name']);
        return response()->json(MenuSlugResource::collection($menu));
    }
}
