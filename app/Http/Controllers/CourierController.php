<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourierRequest;
use App\Http\Resources\CourierResource;
use App\Models\Courier;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CourierController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Courier();
        $model = $model->filterAndOrder($request);
        return CourierResource::collection($model);
    }

    public function show(Courier $courier): JsonResponse
    {
        return response()->json(new CourierResource($courier));
    }

    public function store(CourierRequest $request): JsonResponse
    {
        return $this->responseCreate(Courier::create($request->validated()));
    }

    public function update(CourierRequest $request, Courier $courier): JsonResponse
    {
        $courier->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Courier $courier): JsonResponse
    {
        $courier->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Courier(), $request);
        return $this->responseDelete();
    }
}
