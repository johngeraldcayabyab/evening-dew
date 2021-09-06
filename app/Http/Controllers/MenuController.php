<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Http\Resources\MenuResource;
use App\Http\Resources\MenuSlugResource;
use App\Models\Menu;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class MenuController extends Controller
{
    public function index(): JsonResponse
    {
        $cache = Cache::rememberForever('menus.all', function () {
            return Menu::orderBy('created_at', 'desc')->get();
        });
        return $this->responseRead(MenuResource::collection($cache));
    }

    public function show(Menu $Menu): JsonResponse
    {
        return $this->responseRead(new MenuResource($Menu));
    }

    public function store(MenuRequest $request): JsonResponse
    {
        $model = $this->persistCreate($request, new Menu());
        return $this->responseCreate($model);
    }

    public function update(MenuRequest $request, Menu $menu): JsonResponse
    {
        $this->persistUpdate($request, $menu);
        return $this->responseUpdate();
    }

    public function destroy(Menu $menu): JsonResponse
    {
        $menu->delete();
        return $this->responseDelete();
    }

    public function slug(Menu $menu): JsonResponse
    {
        return $this->responseRead(new MenuSlugResource($menu));
    }

    public function tree()
    {

    }
}
