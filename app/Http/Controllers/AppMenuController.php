<?php

namespace App\Http\Controllers;

use App\Http\Requests\MassDestroy\AppMenuMassDestroyRequest;
use App\Http\Requests\Store\AppMenuStoreRequest;
use App\Http\Requests\Update\AppMenuUpdateRequest;
use App\Http\Resources\Collection\AppMenuCollection;
use App\Http\Resources\OptionResource;
use App\Http\Resources\Resource\AppMenuResource;
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
        $model = $this->searchSortThenPaginate($model, $request);
        return new AppMenuCollection($model);
    }

    public function show(AppMenu $appMenu): JsonResponse
    {
        return response()->json(new AppMenuResource($appMenu));
    }

    public function store(AppMenuStoreRequest $request): JsonResponse
    {
        return response()->json([], STATUS_CREATE, $this->locationHeader(AppMenu::create($request->validated())));
    }

    public function update(AppMenuUpdateRequest $request, AppMenu $appMenu): JsonResponse
    {
        $appMenu->update($request->validated());
        return response()->json([], STATUS_UPDATE);
    }

    public function destroy(AppMenu $appMenu): JsonResponse
    {
        $appMenu->delete();
        return response()->json([], STATUS_DELETE);
    }

    public function mass_destroy(AppMenuMassDestroyRequest $request): JsonResponse
    {
        AppMenu::massDelete($request->validated()['ids']);
        return response()->json([], STATUS_DELETE);
    }

    public function option(Request $request): JsonResponse
    {
        $model = $this->searchOption(new AppMenu(), $request);
        return response()->json(OptionResource::collection($model));
    }

    public function initial_values(): array
    {
        return [];
    }
}
