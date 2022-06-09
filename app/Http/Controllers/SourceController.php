<?php

namespace App\Http\Controllers;

use App\Http\Requests\SourceRequest;
use App\Http\Resources\SourceResource;
use App\Models\Source;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SourceController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Source();
        $model = $model->filterAndOrder($request);
        return SourceResource::collection($model);
    }

    public function show(Source $source): JsonResponse
    {
        return response()->json(new SourceResource($source));
    }

    public function store(SourceRequest $request): JsonResponse
    {
        return $this->responseCreate(Source::create($request->validated()));
    }

    public function update(SourceRequest $request, Source $source): JsonResponse
    {
        $source->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Source $source): JsonResponse
    {
        $source->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Source(), $request);
        return $this->responseDelete();
    }
}
