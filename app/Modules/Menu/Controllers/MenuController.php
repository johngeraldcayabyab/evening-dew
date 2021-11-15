<?php

namespace App\Modules\Menu\Controllers;


use App\Modules\Menu\Models\Menu;
use App\Modules\Menu\Requests\MenuStoreRequest;
use App\Modules\Menu\Requests\MenuUpdateRequest;
use App\Modules\Menu\Resources\MenuResource;
use App\Modules\Menu\Resources\MenuSlugResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class MenuController
{
    public function index(): JsonResponse
    {
        return response()->json(MenuResource::collection(Menu::orderBy('created_at', 'desc')->get()));
    }

    public function show(Menu $Menu): JsonResponse
    {
        return response()->json(new MenuResource($Menu));
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

    public function slug(Menu $menu): JsonResponse
    {
        return response()->json(new MenuSlugResource($menu));
    }

    public function appMenu()
    {
        $cache = Cache::rememberForever('menus.all', function () {
            return Menu::orderBy('created_at', 'desc')->get();
        });
    }
}
