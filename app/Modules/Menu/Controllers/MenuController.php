<?php

namespace App\Modules\Menu\Controllers;


use App\Data\SystemSetting;
use App\Modules\Menu\Models\Menu;
use App\Modules\Menu\Requests\MenuMassDestroyRequest;
use App\Modules\Menu\Requests\MenuStoreRequest;
use App\Modules\Menu\Requests\MenuUpdateRequest;
use App\Modules\Menu\Resources\MenuResource;
use App\Modules\Menu\Resources\MenuSlugResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class MenuController
{
    public function index(): JsonResponse
    {
        return response()->json(MenuResource::collection(Menu::orderBy('created_at', 'desc')->get()));
    }

    public function show(Menu $model): JsonResponse
    {
        return response()->json(new MenuResource($model));
    }

    public function store(MenuStoreRequest $request): JsonResponse
    {
        $headers = ['Location' => route('menus.show', Menu::create($request->validated()))];
        return response()->json([], STATUS_CREATE, $headers);
    }

    public function update(MenuUpdateRequest $request, Menu $model): JsonResponse
    {
        $model->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(Menu $model): JsonResponse
    {
        $model->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(MenuMassDestroyRequest $request): JsonResponse
    {
        Menu::whereIn('id', $request->validated()['ids'])->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function slug(Menu $model): JsonResponse
    {
        return response()->json(new MenuSlugResource($model));
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

    public function appMenu()
    {
        $cache = Cache::rememberForever('menus.all', function () {
            return Menu::orderBy('created_at', 'desc')->get();
        });
    }
}
