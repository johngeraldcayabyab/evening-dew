<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessRightRequest;
use App\Http\Resources\AccessRightResource;
use App\Models\AccessRight;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AccessRightController extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new AccessRight();
        $model = $model->filterAndOrder($request);
        return AccessRightResource::collection($model);
    }

    public function show(AccessRight $accessRight): JsonResponse
    {
        return response()->json(new AccessRightResource($accessRight));
    }

    public function store(AccessRightRequest $request): JsonResponse
    {
        return $this->responseCreate(AccessRight::create($request->validated()));
    }

    public function update(AccessRightRequest $request, AccessRight $accessRight): JsonResponse
    {
        $accessRight->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(AccessRight $accessRight): JsonResponse
    {
        $accessRight->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new AccessRight(), $request);
        return $this->responseDelete();
    }
}
