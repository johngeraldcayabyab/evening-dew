<?php

namespace App\Http\Controllers;

use App\Http\Requests\OptionRequest;
use App\Http\Resources\OptionResource;
use App\Models\Option;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OptionController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Option();
        $model = $model->filterAndOrder($request);
        return OptionResource::collection($model);
    }

    public function show(Option $menu): JsonResponse
    {
        return response()->json(new OptionResource($menu));
    }

    public function store(OptionRequest $request): JsonResponse
    {
        return $this->responseCreate(Option::create($request->validated()));
    }

    public function update(OptionRequest $request, Option $menu): JsonResponse
    {
        $menu->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Option $menu): JsonResponse
    {
        $menu->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Option(), $request);
        return $this->responseDelete();
    }
}
