<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaxRequest;
use App\Http\Resources\TaxResource;
use App\Models\Tax;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TaxController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new Tax();
        $model = $model->filterAndOrder($request);
        return TaxResource::collection($model);
    }

    public function show(Tax $tax): JsonResponse
    {
        return response()->json(new TaxResource($tax));
    }

    public function store(TaxRequest $request): JsonResponse
    {
        return $this->responseCreate(Tax::create($request->validated()));
    }

    public function update(TaxRequest $request, Tax $tax): JsonResponse
    {
        $tax->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(Tax $tax): JsonResponse
    {
        $tax->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new Tax(), $request);
        return $this->responseDelete();
    }
}
