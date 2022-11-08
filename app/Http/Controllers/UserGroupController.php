<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserGroupRequest;
use App\Http\Resources\UserGroupResource;
use App\Models\UserGroup;
use App\Traits\ControllerHelperTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserGroupController  extends Controller
{
    use ControllerHelperTrait;

    public function index(Request $request): ResourceCollection
    {
        $model = new UserGroup();
        $model = $model->filterAndOrder($request);
        return UserGroupResource::collection($model);
    }

    public function show(UserGroup $userGroup): JsonResponse
    {
        return response()->json(new UserGroupResource($userGroup));
    }

    public function store(UserGroupRequest $request): JsonResponse
    {
        return $this->responseCreate(UserGroup::create($request->validated()));
    }

    public function update(UserGroupRequest $request, UserGroup $userGroup): JsonResponse
    {
        $userGroup->update($request->validated());
        return $this->responseUpdate();
    }

    public function destroy(UserGroup $userGroup): JsonResponse
    {
        $userGroup->delete();
        return $this->responseDelete();
    }

    public function mass_destroy(Request $request): JsonResponse
    {
        $this->massDelete(new UserGroup(), $request);
        return $this->responseDelete();
    }
}
